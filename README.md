# Manual Técnico - Intérprete de GoScript

## 1. Introducción y Objetivos

Este documento constituye el manual técnico del proyecto **Intérprete de GoScript**, desarrollado como parte del curso de Organización de Lenguajes y Compiladores 1. El objetivo principal de este proyecto es la construcción de un analizador léxico, sintáctico y semántico capaz de interpretar y ejecutar un subconjunto de instrucciones basadas en el lenguaje Go (denominado "GoScript").

### Objetivos Específicos:
- Implementar un **Frontend** robusto y amigable utilizando **Angular**, que permita la edición de código, visualización de consola, reportes de tabla de símbolos, tabla de errores y la visualización gráfica del Árbol de Sintaxis Abstracta (AST).
- Construir un analizador léxico y sintáctico mediante la herramienta **Jison**.
- Diseñar un **Árbol de Sintaxis Abstracta (AST)** mediante el patrón de diseño *Intérprete* para la ejecución recursiva del código fuente.
- Manejar de forma estricta los entornos dinámicos (Scopes) y la **Tabla de Símbolos** durante el tiempo de ejecución.
- Implementar validación de tipos fuertes y control exhaustivo de errores (Léxicos, Sintácticos y Semánticos).

---

## 2. Arquitectura del Sistema

El proyecto sigue una arquitectura fuertemente desacoplada Cliente-Servidor y Patrón MVC/Intérprete, dividiéndose principalmente en dos capas lógicas que conviven en el mismo entorno de ejecución web (TypeScript/JavaScript puro en el navegador):

### 2.1. Capa Frontend (Interfaz de Usuario)
Desarrollada en **Angular (TypeScript)**, se encarga de la interacción directa con el usuario.
- **Componente Principal (`ide.component.ts`)**: Controla la barra de herramientas, la carga de archivos (`.gst`), la ejecución del código y la distribución de los paneles.
- **Manejo de Estados**: El estado de la consola, los reportes (símbolos y errores) y la imagen del árbol AST se manejan localmente en memoria y se renderizan utilizando directivas estructurales (`*ngIf`, `*ngFor`) y binding de doble vía (`[(ngModel)]`).
- **Aspecto Visual**: Diseño estilizado con temática "Matrix", utilizando una grilla de CSS (Grid) y cajas flexibles (Flexbox) para mantener las áreas de trabajo organizadas dinámicamente.

### 2.2. Capa Backend (Intérprete y Core)
La lógica del compilador reside en las carpetas de análisis y abstracción (desarrolladas de forma pura en TypeScript/Jison):
- **Analizador**: Construido con Jison, toma la cadena de entrada del editor y la convierte en una estructura de datos abstracta.
- **Intérprete**: Recorre el árbol generado por el analizador ejecutando cada instrucción según sus reglas semánticas, inyectando los resultados o errores a una clase estática compartida (`Contexto` o retorno directo) que luego el Frontend lee para mostrarlos.

---

## 3. Análisis Léxico y Sintáctico

La fase de reconocimiento del lenguaje está delegada a **Jison** (un clon de Bison/Yacc para JavaScript).

### 3.1. Analizador Léxico (Scanner)
El lexer se encarga de tokenizar la cadena de entrada basándose en Expresiones Regulares. Reconoce:
- **Palabras reservadas**: `var`, `int`, `float64`, `string`, `boolean`, `if`, `else`, `switch`, `case`, `default`, `for`, `fmt.Println`, `func`, `return`, `struct`, entre otras.
- **Operadores**: Aritméticos (`+`, `-`, `*`, `/`, `%`), Relacionales (`==`, `!=`, `<`, `>`, `<=`, `>=`), Lógicos (`&&`, `||`, `!`).
- **Símbolos y puntuación**: Llaves `{}`, paréntesis `()`, comas `,`, dos puntos `:`, etc.
- Ignora de manera segura espacios en blanco, tabulaciones y saltos de línea (llevando el conteo de la línea y columna para el reporte de errores).

### 3.2. Analizador Sintáctico (Parser)
El parser utiliza una **Gramática Libre de Contexto (LALR(1))** para validar la estructura del programa.
Ejemplo de flujo de producciones principales:
- `INICIO -> INSTRUCCIONES EOF`
- `INSTRUCCIONES -> INSTRUCCIONES INSTRUCCION | INSTRUCCION`
- `INSTRUCCION -> DECLARACION | ASIGNACION | IF_STMT | FOR_STMT | IMPRESION`

El parser está configurado para tener precedencia y asociatividad izquierda en operadores matemáticos para resolver ambigüedades clásicas de las expresiones.

---

## 4. Diseño del Árbol de Sintaxis Abstracta (AST)

El núcleo del intérprete está modelado utilizando el patrón de diseño **Intérprete (o Patrón Comando/Visitor)**. Todo nodo derivado de la gramática implementa una interfaz genérica abstracta.

### 4.1. Interfaces Principales
- **Instrucción (`Instruccion.ts`)**: Define el comportamiento general de un nodo que ejecuta una acción (como imprimir en consola, o un ciclo `for`). Su método principal suele ser `ejecutar(entorno)`.
- **Expresión (`Expresion.ts`)**: Define el comportamiento de un nodo cuyo objetivo es reducirse a un valor calculable (un número, una variable, una operación aritmética). Su método principal suele ser `resolver(entorno)`.

### 4.2. Generación Gráfica del AST
El parser recolecta información de cada nodo generado. Para la visualización, el sistema aplica un recorrido recursivo por todos los nodos hijos del programa (usando el concepto de *Graphviz* / DOT) para concatenar las relaciones padre-hijo, y luego invoca un servicio externo (QuickChart) o librería nativa para transformar ese código DOT en una imagen renderizada en el Frontend.

---

## 5. Entornos y Tabla de Símbolos

### 5.1. Clase Entorno (`Entorno.ts`)
Para implementar las reglas de alcance (scope) inherentes al lenguaje (variables locales vs globales), se utiliza la estructura de "Entornos encadenados".
- Todo entorno tiene un puntero a su `Entorno Padre` (o `Anterior`).
- Cuando se busca una variable, primero se busca en el entorno local (ej. dentro de un `if` o una `funcion`). Si no se encuentra, se delega recursivamente la búsqueda al entorno padre, hasta llegar al entorno Global.

### 5.2. Símbolos (`Simbolo.ts`)
Cada vez que se declara una variable, arreglo, struct o función, se guarda una instancia en un Diccionario (`Map` de TypeScript) dentro del entorno local correspondiente. 
Un símbolo almacena:
- `ID` (Nombre del símbolo)
- `Tipo` (Primitivo, Struct, Arreglo, Func)
- `Valor`
- `Fila` y `Columna`
- `Ámbito` (Global o Local)

Esta tabla luego es exportada y aplanada para mostrarse en el reporte visual de "Tabla de Símbolos" del IDE.

---

## 6. Sistema de Tipos y Manejo de Errores

### 6.1. Validación de Tipos Estáticos
GoScript simula fuertemente un sistema de tipado. Durante las operaciones aritméticas (`Suma`, `Resta`, etc.) y relacionales, se interceptan los tipos base (`Int`, `Float64`, `String`, `Boolean`) de la expresión izquierda y derecha. Si los tipos no son operables según las reglas definidas en el documento del lenguaje, el sistema detiene la operación e inyecta un error semántico.

### 6.2. Conversiones Implícitas / Explícitas
Se ha implementado lógica específica en el AST para manejar las funciones de conversión provistas como "Nativas", como `strconv.Atoi()` (String a Int) y `strconv.ParseFloat()` (String a Float64), las cuales evalúan y modifican el enumerador de tipo del resultado retornado.

### 6.3. Reporte de Errores
Se gestiona mediante una clase Singleton (Tabla de Errores compartida):
1. **Léxicos:** Capturados directamente en Jison al no machear ningún patrón (ej. caracteres extraños).
2. **Sintácticos:** Capturados en Jison en el bloque `error`, utilizando funciones de recuperación para que el compilador no colapse al primer fallo (panic mode).
3. **Semánticos:** Capturados y lanzados durante la fase de recorrido del árbol (`ejecutar` o `resolver`) al romper reglas de tipado, uso de variables no declaradas, límites fuera de rango, etc.

Todos se almacenan estructuradamente y se despliegan en la tabla del Frontend con su línea, columna y descripción.

---

## 7. Flujo de Ejecución

1. **Entrada:** El usuario ingresa el código fuente en el área de texto del IDE.
2. **Activación:** Se hace clic en el botón "Run".
3. **Análisis:** El Frontend envía el string de texto al método `parse()` del analizador generado por Jison.
4. **Construcción AST:** Jison valida sintaxis y retorna la lista raíz de `Instrucciones` (el AST).
5. **Preparación de Entorno:** Se crea un `Entorno Global` y se limpia la salida de consola y las listas de errores previas.
6. **Ejecución Primera Pasada (Hoisting):** (Opcional según implementación) Se recorre el árbol para registrar previamente todas las funciones o variables globales en la tabla de símbolos.
7. **Ejecución de Instrucciones:** Se recorre cíclicamente la lista principal ejecutando cada instrucción (asignaciones, `fmt.Println`, llamadas).
8. **Resultados:** Cualquier salida generada (`fmt.Println`) se concatena en una variable global.
9. **Renderizado:** El Frontend recibe el string resultante de consola, la lista de Símbolos, Errores y la imagen DOT, mostrando todo instantáneamente en sus respectivos paneles con sus estilos dinámicos de Matrix.
