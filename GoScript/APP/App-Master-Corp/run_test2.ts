import Arbol from './src/controller/analizador/simbolo/Arbol';
import TablaSimbolo from './src/controller/analizador/simbolo/TablaSimbolo';
import LlamadaClass from './src/controller/analizador/instrucciones/Llamada';
const analizador = require('./src/controller/analizador/analizador.js');

const input = `
func main() {
fmt.Println(">> Evaluando for tipo while con figura")
var filaWhile int = 1
var figuraWhile string = ""
var sumaCaracteresWhile int = 0

for filaWhile <= 4 {
    var columnaWhile int = 1
    for columnaWhile <= filaWhile {
        figuraWhile += "#"
        sumaCaracteresWhile += 1
        columnaWhile++
    }
    figuraWhile += "\\n"
    filaWhile++
}

var esperadaWhile string = "#\\n##\\n###\\n####\\n"
fmt.Println(figuraWhile)

if figuraWhile == esperadaWhile && sumaCaracteresWhile == 10 {
    var puntosForWhile int = 2
}
}
`;

try {
    let result = analizador.parse(input);
    let ast = new Arbol(result.ast);
    let tabla = new TablaSimbolo();
    ast.setTablaGlobal(tabla);
    ast.setConsola("");

    console.log("Parsing successful.");

    // Globales
    for (let i of ast.getInstrucciones()) {
        if ((i as any).isDefinicionStruct || (i as any).isFuncion) {
            let res = i.interpretar(ast, tabla);
            if (res && (res as any).isError) {
                console.error("Error in Globales:", res);
            }
        }
    }
    
    let mainFunc = ast.getFuncion("main");
    if (mainFunc) {
        let req = new LlamadaClass("main", [], 0, 0);
        let res = req.interpretar(ast, tabla);
        if (res && (res as any).isError) {
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
