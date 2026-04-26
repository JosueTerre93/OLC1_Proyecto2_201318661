# Manual de Usuario - GoScript IDE

¡Bienvenido a **GoScript IDE**! Esta aplicación es un entorno de desarrollo integrado diseñado para escribir, compilar y ejecutar código escrito en el lenguaje GoScript. 

Este manual te guiará paso a paso para que aprendas a utilizar todas las herramientas que te ofrece la interfaz.

---

## 1. Interfaz Principal

Al abrir la aplicación en tu navegador, te encontrarás con una interfaz moderna inspirada en la temática "Matrix". La pantalla está dividida en tres áreas principales:

1. **Barra Superior (Header):** Contiene el título de la aplicación y los botones de acción principales.
2. **Editor de Código (Panel Izquierdo):** El área de texto principal donde escribirás tu código.
3. **Panel de Reportes (Panel Derecho):** Un sistema de pestañas para ver los resultados de tu ejecución (Consola, Símbolos, Errores y AST).

---

## 2. Escribir y Cargar Código

Tienes dos formas de ingresar código al sistema:

### Opción A: Escribir directamente
Simplemente haz clic en el **Editor de Código** (el cuadro oscuro en el panel izquierdo) y comienza a teclear tu programa en GoScript. Verás que los números de línea se ajustan automáticamente a medida que agregas más código.

### Opción B: Cargar un archivo existente
Si ya tienes un archivo con código (usualmente con extensión `.gst`), puedes cargarlo directamente:
1. Ve a la esquina superior derecha y haz clic en el botón negro **"Abrir .gst"** (ícono de subida).
2. Se abrirá el explorador de archivos de tu computadora.
3. Selecciona tu archivo.
4. ¡Listo! El contenido del archivo aparecerá automáticamente en el editor.

---

## 3. Ejecutar el Código

Una vez que tengas tu código listo en el editor, compilarlo y ejecutarlo es muy sencillo:

1. Ve a la esquina superior derecha de la pantalla.
2. Haz clic en el botón verde **"Run"** (ícono de *Play*).
3. El sistema procesará tu código de inmediato. Si todo sale bien, verás los resultados. Si hay algún problema con tu código, no te preocupes, el sistema no se colapsará, sino que te reportará qué sucedió.

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
Si cometiste algún error tipográfico, olvidaste un punto y coma, o trataste de sumar un número con una palabra, el sistema lo capturará aquí. La tabla de errores te indicará exactamente:
- El tipo de error (Léxico, Sintáctico o Semántico).
- La descripción del problema.
- La línea y columna exacta donde ocurrió, para que puedas ir al editor y corregirlo rápidamente.

### 🌳 Árbol AST
(Árbol de Sintaxis Abstracta). Aquí podrás ver una representación gráfica de cómo la computadora entiende tu código. El sistema dibuja un diagrama jerárquico conectando todas las instrucciones de tu programa (asignaciones, ciclos, impresiones) para que entiendas la estructura interna de tu archivo.

---

## 5. Recomendaciones Visuales
- La aplicación cuenta con un diseño de *Scroll* dinámico. Si tienes mucho texto en la consola o en el editor, simplemente usa la rueda del ratón o la barra de desplazamiento lateral; el diseño está hecho para nunca perder de vista tu código.
- Disfruta del fondo animado de Matrix mientras programas. 😎
