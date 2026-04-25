const lexer = require('./lexermain.js');
const input = `fmt.Println("hola") && || ! ID _id123 var INT float64`;
lexer.setInput(input);

let token;
do {
    token = lexer.lex();
    console.log(`Token: ${token}, Text: ${lexer.yytext}`);
} while (token !== 1); // 1 is EOF
