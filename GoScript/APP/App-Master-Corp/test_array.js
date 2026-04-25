const parser = require('./src/controller/analizador/analizador.js');
const TablaSimbolo = require('./src/controller/analizador/simbolo/TablaSimbolo').default;
const Arbol = require('./src/controller/analizador/simbolo/Arbol').default;

const input = `
func main() {
    tablero := [][]int{
        {5, 10, 15},
        {2, 4, 6, 8},
        {100, 200},
        {7, 14, 21, 28, 35},
    }
    tablero[0][1] = 500
    extraidos := []int{}
    extraidos = append(extraidos, tablero[0][1])
    fmt.Println("Tablero[0][1]:", tablero[0][1])
    fmt.Println("Extraidos:", extraidos)
}
`;

try {
    const ast = parser.parse(input);
    const tabla = new TablaSimbolo();
    let mainFunc = ast.getFuncion("main");
    if (mainFunc) {
        let LlamadaClass = require('./src/controller/analizador/instrucciones/Llamada').default;
        let req = new LlamadaClass("main", [], 0, 0);
        req.interpretar(ast, tabla);
    }
    console.log("Console output:\n" + ast.getConsola());
    console.log("Errores:\n", ast.getErrores());
} catch(e) {
    console.log("Exception:", e);
}
