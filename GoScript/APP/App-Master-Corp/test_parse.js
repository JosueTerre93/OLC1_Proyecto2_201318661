const mock = function() { return new Proxy(this, { get: (t, p) => () => ({}) }); };
mock.default = mock;
mock.tipoDato = { VOID: 0, ENTERO: 1, DECIMAL: 2, BOOLEANO: 3, CARACTER: 4, CADENA: 5 };
mock.OperadoresAritmeticos = { SUMA: 0, RESTA: 1, NEG: 2 };
mock.Op_relacionales = { IGUALDAD: 0, MENOR: 1, MAYOR_IGUAL: 2 };
mock.operadoresLogicos = { AND: 0, OR: 1, NOT: 2 };
require.cache[require.resolve('./src/controller/analizador/simbolo/Tipo')] = {
    exports: mock
};
require.cache[require.resolve('./src/controller/analizador/instrucciones/Bloque')] = { exports: mock };
require.cache[require.resolve('./src/controller/analizador/simbolo/NodoAST')] = { exports: mock };
// We will just patch the prototype parse to intercept lexical error.
const p = require('./src/controller/analizador/analizador.js');
const txt = "var i int = 10\ncz := 0\n// Imprim";
try {
  let res = p.parse(txt);
  console.log("Success");
} catch (e) {
  console.log("ERROR IS:\n", e.message);
}
