const fs = require('fs');
const path = require('path');

const modules = [
    'src/controller/analizador/simbolo/Tipo',
    'src/controller/analizador/instrucciones/Bloque',
    'src/controller/analizador/simbolo/NodoAST',
    'src/controller/analizador/instrucciones/DeclaracionCorta',
    'src/controller/analizador/excepciones/Errores',
    'src/controller/analizador/simbolo/Arbol',
    'src/controller/analizador/simbolo/Simbolo',
    'src/controller/analizador/simbolo/tablaSimbolo',
    'src/controller/analizador/expresiones/Logicas',
    'src/controller/analizador/expresiones/Nativos',
    'src/controller/analizador/expresiones/Aritmeticas',
    'src/controller/analizador/expresiones/Relacionales',
    'src/controller/analizador/instrucciones/Declaracion',
    'src/controller/analizador/expresiones/AccesoVar',
    'src/controller/analizador/instrucciones/AsignacionVar',
    'src/controller/analizador/instrucciones/Imprimir',
    'src/controller/analizador/instrucciones/CondicionalIf',
    'src/controller/analizador/instrucciones/SumaAsignacion',
    'src/controller/analizador/instrucciones/CicloFor',
    'src/controller/analizador/instrucciones/CicloForCompleto',
    'src/controller/analizador/instrucciones/Break',
    'src/controller/analizador/instrucciones/Switch',
    'src/controller/analizador/instrucciones/SwitchCase',
    'src/controller/analizador/instrucciones/Continue',
    'src/controller/analizador/instrucciones/Funcion',
    'src/controller/analizador/instrucciones/Llamada',
    'src/controller/analizador/instrucciones/Return'
];

for (let m of modules) {
    const dir = path.dirname(m);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = m + '.js';
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "module.exports = { default: function() { return {}; }, tipoDato: {}, OperadoresAritmeticos: {}, Op_relacionales: {}, operadoresLogicos: {} };");
    }
}
console.log("Dummy files created.");
