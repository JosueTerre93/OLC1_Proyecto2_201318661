"use strict";
exports.__esModule = true;
// Set up globals that jison might need
global.Arbol = require('./src/controller/analizador/simbolo/Arbol')["default"];
global.TablaSimbolo = require('./src/controller/analizador/simbolo/TablaSimbolo')["default"];
global.Tipo = require('./src/controller/analizador/simbolo/Tipo')["default"];
var analizador = require('./src/controller/analizador/analizador.js');
var LlamadaClass = require('./src/controller/analizador/instrucciones/Llamada')["default"];
var input = "\nstruct Chip {\nstring serie;\nfloat64 frecuencia;\nbool activo;\n}\n\nstruct Computadora {\nstring nombre;\nint nucleos;\nChip chip;\n}\n\nstruct Laboratorio {\nstring edificio;\nstring encargado;\nint salon;\nbool disponible;\nComputadora equipo;\n}\n\nfunc main() {\nfmt.Println(\"==============================================================\")\nfmt.Println(\"PRUEBA ALTERNA - EVALUACION AUTOMATICA DE STRUCTS\")\nfmt.Println(\"Seccion evaluada: Structs (20 puntos)\")\nfmt.Println(\"Nivel maximo de anidamiento usado: 3\")\nfmt.Println(\"==============================================================\")\n\npuntajeDeclaracion := 0\npuntajeInstanciacion := 0\npuntajeAsignacionPrimitivos := 0\npuntajeAccesoPrimitivos := 0\npuntajeAsignacionAnidados := 0\npuntajeAccesoAnidados := 0\ntotal := 0\n\nfmt.Println(\"\")\nfmt.Println(\">>> Evaluando: Declaracion (4 puntos)\")\nChip chipBase = { serie: \"CH-101\", frecuencia: 3.2, activo: true }\nComputadora pcBase = { nombre: \"Atlas\", nucleos: 8, chip: chipBase }\nLaboratorio labBase = { edificio: \"Torre Norte\", encargado: \"Marcos\", salon: 305, disponible: false, equipo: pcBase }\n\nfmt.Println(\"Chip base:\", chipBase)\n}\n";
try {
    var result = analizador.parse(input);
    var ast = new global.Arbol(result);
    var tabla = new global.TablaSimbolo();
    ast.setTablaGlobal(tabla);
    ast.setConsola("");
    console.log("Parsing successful.");
    // Globales
    for (var _i = 0, _a = ast.getInstrucciones(); _i < _a.length; _i++) {
        var i = _a[_i];
        if (i.isDefinicionStruct || i.isFuncion) {
            var res = i.interpretar(ast, tabla);
            if (res && res.isError) {
                console.error("Error in Globales:", res);
            }
        }
    }
    var mainFunc = ast.getFuncion("main");
    if (mainFunc) {
        var req = new LlamadaClass("main", [], 0, 0);
        var res = req.interpretar(ast, tabla);
        if (res && res.isError) {
            console.error("Semantic Error returned by main:", res);
        }
    }
    else {
        console.log("No main found.");
    }
    console.log("Console Output:");
    console.log(ast.getConsola());
}
catch (e) {
    console.error("CRITICAL ERROR:", e.message);
}
