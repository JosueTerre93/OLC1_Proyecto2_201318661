const fs = require('fs');
const content = fs.readFileSync('./src/controller/analizador/analizador.js', 'utf8');
const lexerRegex = /var lexer = \(function\(\)\{\s*([\s\S]*?)\s*return lexer;\s*\}\)\(\);/m;
const match = lexerRegex.exec(content);
if (match) {
    let lexerCode = "var lexer = (function(){\n" + match[1] + "\nreturn lexer;\n})(); module.exports = lexer;";
    fs.writeFileSync('./lexermain.js', lexerCode);
}
