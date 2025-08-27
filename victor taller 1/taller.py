import os

TASA_COP_A_USD = 0.00025
TASA_USD_A_JPY = 157.50
TASA_JPY_A_COP = 25.50

while True:
    os.system('cls' if os.name == 'nt' else 'clear')
    
    print("--- CONVERSOR DE MONEDA GLOBAL ---")
    print("1. Convertir Pesos Colombianos (COP) a Dólares (USD)")
    print("2. Convertir Dólares (USD) a Yenes Japoneses (JPY)")
    print("3. Convertir Yenes Japoneses (JPY) a Pesos Colombianos (COP)")
    print("4. Salir")
    print("-" * 60) 

    opcion = input("Seleccione una opción (1-4): ")

    if opcion == '4':
        print("Gracias por usar el conversor. ¡Hasta luego!")
        break

    if opcion in ['1', '2', '3']:
        try:
            cantidad = float(input("\nIngrese la cantidad de dinero a convertir: "))
            
            if opcion == '1':
                resultado = cantidad * TASA_COP_A_USD
                print(f"\n{cantidad:,.2f} COP equivalen a ${resultado:,.2f} USD")
            elif opcion == '2':
                resultado = cantidad * TASA_USD_A_JPY
                print(f"\n${cantidad:,.2f} USD equivalen a ¥{resultado:,.2f} JPY")
            elif opcion == '3':
                resultado = cantidad * TASA_JPY_A_COP
                print(f"\n¥{cantidad:,.2f} JPY equivalen a ${resultado:,.2f} COP")
        except ValueError:
            print("\nError: Por favor, ingrese un valor numérico válido.")
    else:
        print("\nError: Opción no válida. Por favor, elija un número del 1 al 4.")

    input("\nPresione Enter para continuar...")