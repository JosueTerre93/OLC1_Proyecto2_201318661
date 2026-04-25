const p = require('./src/controller/analizador/analizador.js');
const txt = `variable globali := 10\ncz := 0\n// Imprim`;
try {
  let res = p.parse(txt);
  console.log("Success", res);
} catch (e) {
  console.log("ERROR", e.message);
}
