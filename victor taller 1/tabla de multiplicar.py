import os

while True:
    os.system('cls' if os.name == 'nt' else 'clear')
    
    print("--- GENERADOR DE TABLAS DE MULTIPLICAR ---")
    print("Puedes calcular la tabla de cualquier número.")
    print("Escribe 'salir' para terminar el programa.")
    print("-" * 60)

    entrada_usuario = input("¿Qué tabla de multiplicar deseas ver? (o escribe 'salir'): ")

    if entrada_usuario.lower() == 'salir':
        print("\nGracias por usar el generador. ¡Hasta la próxima!")
        break

    try:
        numero_tabla = int(entrada_usuario)
        
        print("-" * 60)
        print(f"       TABLA DE MULTIPLICAR DEL {numero_tabla}")
        print("-" * 60)

        for multiplicador in range(1, 11):
            resultado = numero_tabla * multiplicador
            print(f"      {numero_tabla} x {multiplicador:2} = {resultado}")
        
        print("-" * 30)

    except ValueError:
        print("\nError: Entrada no válida. Por favor, ingrese un número o la palabra 'salir'.")

    input("\nPresione Enter para continuar...")
