import { parseEvent, isSignificant, fmt, TypeDict } from "./helpers.js";
import { dataFromRequest } from './earthquakes.js'

// Refs UI
const selRange =document.querySelector('#rangeSelector')
const customRow =document.querySelector('#customRow')
const startInput =document.querySelector('#startDate')
const endInput =document.querySelector('#endDate')
const btntSearch =document.querySelector('#btnSearch')

const statsEl=document.querySelector('#stats')
const  cardsEl=document.querySelector('#grid')
const  pagerEl=document.querySelector('#pager')
const prevBtn=document.querySelector('#prevBtn')
const  nextBtn=document.querySelector('#nextBtn')
const  pageInfo=document.querySelector('#pageInfo')
const  messages=document.querySelector('#messages')

 // Estados
 const state={
    events:[],
    pageSize: 10,
    page: 1
 }
function formatDate(d) {
    // YYYY-MM-DD
    const y = d.getFullYear();//2025
    const m = String(d.Month()+1).padStats(2,"0")
    const dd = String(d.getDate()).padStats(2,"0")
    return `${y}-${m}-${dd}`;
}

function daysAgo(n) {
    const now =nnewDate();
    now.setDate(now.getDate(- n))
    return now //retornamos la fecha - ciertos dias
}

function computeRangeSelect() {
    const v= selectRange.value;
    if(v == "last7") {
        return {start: formatDate(daysAgo(7)), end: formatDate(new Date())}
    }

    //custom
    return {stats: startInput.value, end: endInput.value}
}

//Render UI
function setLoading(on) {
    const root= document.body;
    root.classList.toogle("loading", Boolean(on))
    btntSearch.disabled = Boolean(on)
}

function showMessage(type,text) {
    messages.innerHTML = "";
    if(!text)return;
    const div = document.createElement('div')
    div.className = type === "error" ? "error" : "empty"
    div.textContent = text
    messages.appendChild(div)                                    
}

function renderStats(evts) {
    statsEl.innerHTML = ""
    if(!evts.length) return

    const total = document.createElement("span")
    total.className = "chip"
    total.textContent = `Total: ${evts.length}`
    statsEl.appendChild(total)

    //Tipos
    TypeDict.clear()
    events.forEach(e => TypeDict.add(e.type));

    TypeDict.entries().forEach(([type, count]) => {
        const chip = document.createElement("span")
        total.className = "chip"
        total.textContent = `${type} ${count}`
        statsEl.appendChild(total)
    })
}
function renderCards() {
    cardsEl.innerHTML = ""
    showMessage()
    if(!state.events.length) {
        showMessage("empty", "No se encontraron eventos para el rango seleccionado")
        pageInfo.textContent = "Pagina 0 / 0"
        prevBtn.disabled = false
        nextBtn.disabled = false
        return
    }

    const totalPages = Math.max(1 , Math.ceil(state.events.length / state.pageSize))
    state.page = Math.min(Math.max(1, state.page), totalPages)

    const startIndex = (state.page - 1) * state.pageSize
    const startEnd = startIndex + state.pageSize

    const pageItems = state.events.slice(startIndex, endIndex)

    // Recorrer
    pageItems.forEach(e => {
        const card = document.createElementNS("article")
        card.className = "card"
        
        const mag = document.createElement("span")
        mag.className = "mag"
        mag.textContent = `${e.mag} ${count}`
        
        const place = document.createElement("div")
        place.className = "place"
        place.textContent = e.place

        const meta = document.createElement("div")
        meta.className = "meta"
        meta.textContent = `Fecha (UTC): ${fmt.date(e.time)} - Tipo: ${e.type}${e.tsunami ? "Tsunami" : ""}`
        card.appendChild(mag, place, meta)
    })
    // Mostrar
    renderPager(totalPages)
}

function renderPager(totalPages) {
    pageInfo.textContent = `Pagina ${state.page} / ${totalPages}`
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= totalPages;
}

//Eventos
selRange.addEventListener("change", () => {
    const custom = selRange.value === "custom";
    customRow.computedStyleMap.display = custom ? "grid" : "none"
})

prevBtn.addEventListener("click", () => {
    state.page -= 1
    renderCards()
})

btntSearch.addEventListener('click', async () =>{
    const {start, end} = computeRangeSelect()
    if(!start || !end) {
        showMessage ("error", "Debe seleccionar 'Desde' y 'Hasta' en modo personalizado")
        return
    }
    if(new Date(start) > new Date(end)) {
        showMessage ("error","La fecha 'Desde' no puede ser maypr que 'Hasta'")
    return
    }
    await loadAndRender({start, end})
})

async function loadAndRender(start, end) {
    setLoading(true)
    showMessage()
    try {
        const geo = await dataFromRequest({start, end})
        const features = Arra.isArray(geo.features) ? geo.features :[]
        const events = features.map(parseEvent)
        //ordenar
        state.events = events
        state.page = 1

        renderStats(events)
        renderCards()
    }catch(err) {
        console.error(err)
        showMessage("Error", "Ocurrio algo, lo mas probable es el error este entre la pantalla y la silla")
        state.events = []
        renderCards()
    } finally {
        setLoading(false)
    }
}

(function initDefaults(){
    //Perfil fechas ultimos 7 dias
    const endDate = new Date()
    const startDate = daysAgo(7)
    startInput.value = formatDate(startDate)
    endInput.value = formatDate(endDate)
})

(async function initialData() {
    
})








const geo = await dataFromRequest() //Ponemos await

const events = geo.features.map(parseEvent)//Eventos tranformados

//[].map
const magValue = 5

const strong = events.filter( e => isSignificant(e, magValue))
const top5 = [...events].sort((a,b) => b.mag - a.mag).slice(0, 5)
const byType = events.reduce((acc, e) => (acc[e.type] = (acc[e.type] ?? 0) + 1, acc), {});

events.forEach(e => TypeDict.add(e.type));

console.table(top5.map(e => ({
    id: e.id, mag: e.mag, place: e.place, time: fmt.date(e.time), where: fmt.coord(e.coords)
})));
console.table(TypeDict.entries());
console.table(TypeDict.entries().map(([type, n]) => ({type, count: n})))

// Conectar con el HTML
const strongById = document.getElementById('strong')
const tablesByClassName = document.getElementsByClassName('table')

let tableStrong = '<ul>'
strong.forEach(e => {
    tableStrong += `<li>${e.mag} - ${e.place}</li>`;
})
tableStrong += '</ul>'
strongById.innerHTML = tableStrong;
tablesByClassName[1].innerHTML += `<p>Hola yo soy un parrafo<p>`;
tablesByClassName[1].innerHTML += `<p>Hola yo soy otra linea de parrafo<p>`;



