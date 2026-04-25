const mock = function() { return new Proxy(this, { get: (t, p) => () => ({}) }); };
mock.default = mock;
mock.tipoDato = { VOID: 0, ENTERO: 1, DECIMAL: 2, BOOLEANO: 3, CARACTER: 4, CADENA: 5 };
mock.OperadoresAritmeticos = { SUMA: 0, RESTA: 1, NEG: 2 };
mock.Op_relacionales = { IGUALDAD: 0, MENOR: 1, MAYOR_IGUAL: 2 };
mock.operadoresLogicos = { AND: 0, OR: 1, NOT: 2 };
const path = require('path');
const cacheKeys = [
    './src/controller/analizador/simbolo/Tipo',
    './src/controller/analizador/instrucciones/Bloque',
    './src/controller/analizador/simbolo/NodoAST',
    './src/controller/analizador/instrucciones/DeclaracionCorta',
    './src/controller/analizador/excepciones/Errores',
    './src/controller/analizador/simbolo/Arbol',
    './src/controller/analizador/simbolo/Simbolo',
    './src/controller/analizador/simbolo/tablaSimbolo',
    './src/controller/analizador/expresiones/Logicas',
    './src/controller/analizador/expresiones/Nativos',
    './src/controller/analizador/expresiones/Aritmeticas',
    './src/controller/analizador/expresiones/Relacionales',
    './src/controller/analizador/instrucciones/Declaracion',
    './src/controller/analizador/expresiones/AccesoVar',
    './src/controller/analizador/instrucciones/AsignacionVar',
    './src/controller/analizador/instrucciones/Imprimir',
    './src/controller/analizador/instrucciones/CondicionalIf',
    './src/controller/analizador/instrucciones/SumaAsignacion',
    './src/controller/analizador/instrucciones/CicloFor',
    './src/controller/analizador/instrucciones/CicloForCompleto',
    './src/controller/analizador/instrucciones/Break',
    './src/controller/analizador/instrucciones/Switch',
    './src/controller/analizador/instrucciones/SwitchCase',
    './src/controller/analizador/instrucciones/Continue',
    './src/controller/analizador/instrucciones/Funcion',
    './src/controller/analizador/instrucciones/Llamada',
    './src/controller/analizador/instrucciones/Return'
];

for (let k of cacheKeys) {
    const absPath = path.resolve(k);
    const mockObj = { exports: mock };
    require.cache[absPath] = mockObj;
    require.cache[absPath + '.js'] = mockObj;
    require.cache[absPath + '.ts'] = mockObj;
}

const fs = require('fs');
let lexerCode = fs.readFileSync('./src/controller/analizador/analizador.js', 'utf8');
let match = /var analizador = \(function\(\)\{\s*([\s\S]*?)\s*return new Parser;\s*\}\)\(\);/m.exec(lexerCode);
fs.writeFileSync('./src/controller/analizador/parsermain.js', "var analizador = (function(){\n" + match[1] + "\nreturn new Parser;\n})(); module.exports = analizador;");

const p = require('./src/controller/analizador/parsermain.js');
const txt = `func main() { 
    i := 10 
    z := 0 
    FMT.println("x", i) 
    b := true && false || !true
    c := (10 + 5) * 2
    d := 10 % 3
    var x int
    var y float64 = 10
    x = 5
}
`;
try { 
    let r = p.parse(txt); 
    console.log("Parsed result:", JSON.stringify(r, null, 2)); 
} catch(e) { 
    console.log("Parse error:", e); 
}
