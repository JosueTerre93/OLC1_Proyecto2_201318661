# Manual de Usuario - GoScript IDE

¡Bienvenido a **GoScript IDE**! Esta aplicación es un entorno de desarrollo integrado diseñado para escribir, compilar y ejecutar código escrito en el lenguaje GoScript. 

Este manual te guiará paso a paso para que aprendas a utilizar todas las herramientas que te ofrece la interfaz.


## 1. Interfaz Principal

Al abrir la aplicación en tu navegador, te encontrarás con una interfaz moderna inspirada en la temática "Matrix". La pantalla está dividida en tres áreas principales:

1. **Barra Superior (Header):** Contiene el título de la aplicación y los botones de acción principales.
2. **Editor de Código (Panel Izquierdo):** El área de texto principal donde escribirás tu código.
3. **Panel de Reportes (Panel Derecho):** Un sistema de pestañas para ver los resultados de tu ejecución (Consola, Símbolos, Errores y AST).


## 2. Escribir y Cargar Código

### Opción A: Escribir directamente
Haz clic en el **Editor de Código** (cuadro oscuro en el panel izquierdo) y esciribe tu programa en GoScript. Los numeros de linea se crean automaticamente.

### Opción B: Cargar un archivo existente
Si ya tienes un archivo con código (con extensión `.gst`), puedes cargarlo directamente:
1. Ve a la esquina superior derecha y haz clic en el botón negro **"Abrir .gst"** (ícono de subida).
2. Se abrirá el explorador de archivos de tu computadora.
3. Selecciona tu archivo.
4. El contenido del archivo aparecerá automáticamente en el editor.


## 3. Ejecutar el Código

Una vez que tengas tu código listo en el editor, compilalo de de siguiente manera:

1. Ve a la esquina superior derecha de la pantalla.
2. Haz clic en el botón verde **"Run"**.
3. El sistema procesará tu código. De haber errores en el codigo, se mostraran en el apartado de errores en el panel derecho el cual se detalla mas adelante.

---

## 4. Analizando los Resultados (Pestañas)

Después de presionar "Run", el panel de la derecha se actualizará con toda la información de tu programa. Puedes navegar entre las diferentes pestañas haciendo clic en sus nombres:

### 🖥️ Consola
Aquí se muestra la salida final de tu programa. Cualquier instrucción como `fmt.Println("Hola")` imprimirá su resultado en esta pantalla. Si tu código no imprime nada, esta pantalla permanecerá limpia.

### 📊 Tabla de Símbolos
Esta pestaña te muestra una tabla interactiva con todas las variables, arreglos, structs y funciones que el sistema detectó y guardó en la memoria durante la ejecución. Por cada elemento podrás ver:
- Su ID (Nombre)
- Su Tipo (Entero, Cadena, Función, etc.)
- Su Entorno (Global o Local)
- La Línea y Columna donde fue declarado.

### 🐛 Errores
Si cometiste algún error, la tabla de errores te indicará exactamente:
- El tipo de error (Léxico, Sintáctico o Semántico).
- La descripción del problema.
- La línea y columna exacta donde ocurrió.

### 🌳 Árbol AST
(Árbol de Sintaxis Abstracta). Aquí podrás ver una representación gráfica de cómo la computadora entiende tu código. El sistema dibuja un diagrama jerárquico conectando todas las instrucciones de tu programa (asignaciones, ciclos, impresiones) para que entiendas la estructura interna de tu archivo.
