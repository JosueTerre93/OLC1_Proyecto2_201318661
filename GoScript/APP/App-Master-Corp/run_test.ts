import * as fs from 'fs';
import * as path from 'path';

// Set up globals that jison might need
(global as any).Arbol = require('./src/controller/analizador/simbolo/Arbol').default;
(global as any).TablaSimbolo = require('./src/controller/analizador/simbolo/TablaSimbolo').default;
(global as any).Tipo = require('./src/controller/analizador/simbolo/Tipo').default;

const analizador = require('./src/controller/analizador/analizador.js');
const LlamadaClass = require('./src/controller/analizador/instrucciones/Llamada').default;

const input = `
struct Chip {
string serie;
float64 frecuencia;
bool activo;
}

struct Computadora {
string nombre;
int nucleos;
Chip chip;
}

struct Laboratorio {
string edificio;
string encargado;
int salon;
bool disponible;
Computadora equipo;
}

func main() {
fmt.Println("==============================================================")
fmt.Println("PRUEBA ALTERNA - EVALUACION AUTOMATICA DE STRUCTS")
fmt.Println("Seccion evaluada: Structs (20 puntos)")
fmt.Println("Nivel maximo de anidamiento usado: 3")
fmt.Println("==============================================================")

puntajeDeclaracion := 0
puntajeInstanciacion := 0
puntajeAsignacionPrimitivos := 0
puntajeAccesoPrimitivos := 0
puntajeAsignacionAnidados := 0
puntajeAccesoAnidados := 0
total := 0

fmt.Println("")
fmt.Println(">>> Evaluando: Declaracion (4 puntos)")
Chip chipBase = { serie: "CH-101", frecuencia: 3.2, activo: true }
Computadora pcBase = { nombre: "Atlas", nucleos: 8, chip: chipBase }
Laboratorio labBase = { edificio: "Torre Norte", encargado: "Marcos", salon: 305, disponible: false, equipo: pcBase }

fmt.Println("Chip base:", chipBase)
}
`;

try {
    let result = analizador.parse(input);
    let ast = new (global as any).Arbol(result);
    let tabla = new (global as any).TablaSimbolo();
    ast.setTablaGlobal(tabla);
    ast.setConsola("");

    console.log("Parsing successful.");

    // Globales
    for (let i of ast.getInstrucciones()) {
        if (i.isDefinicionStruct || i.isFuncion) {
            let res = i.interpretar(ast, tabla);
            if (res && res.isError) {
                console.error("Error in Globales:", res);
            }
        }
    }
    
    let mainFunc = ast.getFuncion("main");
    if (mainFunc) {
        let req = new LlamadaClass("main", [], 0, 0);
        let res = req.interpretar(ast, tabla);
        if (res && res.isError) {
            console.error("Semantic Error returned by main:", res);
        }
    } else {
        console.log("No main found.");
    }
    
    console.log("Console Output:");
    console.log(ast.getConsola());
} catch (e: any) {
    console.error("CRITICAL ERROR:", e.message);
}
