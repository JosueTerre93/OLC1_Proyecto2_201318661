%{

    var Tipo = require('./simbolo/Tipo')
    var NodoAST = require('./simbolo/NodoAST')
    var Nativos= require('./expresiones/Nativos')
    var Aritmeticas= require('./expresiones/Aritmeticas')
    var Relacionales= require('./expresiones/Relacionales')


    var Declaracion= require('./instrucciones/Declaracion')
    var AccesoVar=require('./expresiones/AccesoVar')
    var AsignacionVar= require('./instrucciones/AsignacionVar')
    var Imprimir= require('./instrucciones/Imprimir')
    var CondicionalIf = require('./instrucciones/CondicionalIf');
    var SumaAsignacion = require('./instrucciones/SumaAsignacion');
    var RestaAsignacion = require('./instrucciones/RestaAsignacion');
    var DeclaracionCorta = require('./instrucciones/DeclaracionCorta');
    var CicloFor = require('./instrucciones/CicloFor');
    var CicloForCompleto = require('./instrucciones/CicloForCompleto');
    var Break = require('./instrucciones/Break');
    var Bloque = require('./instrucciones/Bloque');
    var Switch = require('./instrucciones/Switch');
    var SwitchCase = require('./instrucciones/SwitchCase');
    var Continue = require('./instrucciones/Continue');
    var Funcion = require('./instrucciones/Funcion');
    var Llamada = require('./instrucciones/Llamada');
    var Return = require('./instrucciones/Return');
    var CicloForRange = require('./instrucciones/CicloForRange');
    var Logicas = require('./expresiones/Logicas');
    var Incremento = require('./instrucciones/Incremento');
    var Decremento = require('./instrucciones/Decremento');
    var LiteralSlice = require('./expresiones/LiteralSlice');
    var AccesoSlice = require('./expresiones/AccesoSlice');
    var ModificarSlice = require('./instrucciones/ModificarSlice');
    var Append = require('./expresiones/Append');
    var LiteralMultidimensional = require('./expresiones/LiteralMultidimensional');
    var DefinicionStruct = require('./instrucciones/DefinicionStruct');
    var InstanciaStruct = require('./expresiones/InstanciaStruct');
    var AccesoAtributo = require('./expresiones/AccesoAtributo');
    var ModificarAtributo = require('./instrucciones/ModificarAtributo');
    var Atoi = require('./expresiones/Atoi');
    var ParseFloat = require('./expresiones/ParseFloat');
    var TypeOf = require('./expresiones/TypeOf');

    var Errores = require('./excepciones/Errores');
%}

%lex
%%

//comentarios
\/\/.*            {}; /* Ignorar comentarios de linea */
\/\*[\s\S]*?\*\/  {}; /* Ignorar comentarios multilinea */

//palabras reservadas
"var"       return 'VAR';
"int"       return 'INT';
"float64"   return 'T_FLOAT64';
"string"    return 'T_STRING';
"bool"      return 'T_BOOL';
"rune"      return 'T_RUNE';
"nil"       return 'NIL';
"struct"    return 'STRUCT';
[fF][mM][tT]\.[pP][rR][iI][nN][tT][lL][nN] return 'IMPRIMIR';
"if"        return 'IF';
"else"      return 'ELSE';
"true"      return 'RTRUE';
"false"     return 'RFALSE';
"for"       return 'FOR';
"break"     return 'RBREAK';
"continue"  return 'CONTINUE';
"switch"    return 'SWITCH';
"case"      return 'CASE';
"default"   return 'DEFAULT';
"func"      return 'FUNC';
"return"    return 'RETURN';
"range"     return 'RANGE';
"len"       return 'LEN';
"append"    return 'APPEND';
[sS][lL][iI][cC][eE][sS]\.[iI][nN][dD][eE][xX] return 'SLICE_INDEX';
[sS][tT][rR][iI][nN][gG][sS]\.[jJ][oO][iI][nN] return 'STRINGS_JOIN';
[sS][tT][rR][cC][oO][nN][vV]\.[aA][tT][oO][iI] return 'STRCONV_ATOI';
[sS][tT][rR][cC][oO][nN][vV]\.[pP][aA][rR][sS][eE][fF][lL][oO][aA][tT] return 'STRCONV_PARSEFLOAT';
"reflect"   return 'REFLECT';
"TypeOf"    return 'TYPEOF';



"+="        return 'MAS_IGUAL';
"-="        return 'MENOS_IGUAL';
"++"        return 'MAS_MAS';
"--"        return 'MENOS_MENOS';
"+"         return 'MAS';
"-"         return 'MENOS';
";"         return 'PUNTO_COMA';
"("         return 'PAR_ABRE';
")"         return 'PAR_CIERRA';
"{"         return 'LLAVE_ABRE';
"}"         return 'LLAVE_CIERRA';
"["         return 'CORCHETE_ABRE';
"]"         return 'CORCHETE_CIERRA';
"<="        return 'MENOR_IGUAL';
"<"         return 'MENOR';
">="        return 'MAYOR_IGUAL';
">"         return 'MAYOR';
"=="        return 'IGUAL_IGUAL';
"!="        return 'DIFERENTE';
":="        return 'DOS_PUNTOS_IGUAL';
":"         return 'DOS_PUNTOS';
"."         return 'PUNTO';
"="         return 'IGUAL';
","         return 'COMA';
"*"         return 'POR';
"/"         return 'DIVIDIDO';
"%"         return 'MODULO';
"&&"        return 'AND';
"||"        return 'OR';
"!"         return 'NOT';



[0-9]+"."[0-9]+\b  return 'DECIMAL';
[0-9]+\b             return 'ENTERO';
\"([^\"\\]|\\.)*\"	{
    let str = yytext.substr(1,yytext.length-2);
    str = str.replace(/\\n/g, '\n')
             .replace(/\\r/g, '\r')
             .replace(/\\t/g, '\t')
             .replace(/\\\\/g, '\\')
             .replace(/\\\"/g, '\"');
    yytext = str;
    return 'CADENA';
}
\'([^\'\\]|\\.)\' { 
    let strRune = yytext.substr(1,yytext.length-2);
    if (strRune.startsWith('\\')) {
        if (strRune === '\\n') yytext = 10;
        else if (strRune === '\\r') yytext = 13;
        else if (strRune === '\\t') yytext = 9;
        else if (strRune === '\\\\') yytext = 92;
        else if (strRune === "\\'") yytext = 39;
        else if (strRune === '\\\"') yytext = 34;
        else yytext = strRune.charCodeAt(1);
    } else {
        yytext = strRune.charCodeAt(0);
    }
    return 'L_RUNE'; 
}
[a-zA-Z_][a-zA-Z0-9_]*         return 'ID'


[\ \t\n\r]+     {}; /* Ignorar espacios en blanco */
[\ \n]        {};

[#$°]           {}; /* Ignorar caracteres decorativos */
. { 
    if (!yy.listaErrores) yy.listaErrores = [];
    yy.listaErrores.push(new Errores.default('Léxico', 'Carácter no válido ' + yytext, yylloc.first_line, yylloc.first_column)); 
}


<<EOF>>     return 'EOF';

/lex

%left 'OR'
%left 'AND'
%left 'IGUAL_IGUAL' 'DIFERENTE'
%left 'MENOR' 'MENOR_IGUAL' 'MAYOR' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVIDIDO' 'MODULO'
%right 'UMENOS' 'NOT'

%start INICIO

%%

INICIO : INSTRUCCIONES EOF { 
        var errs = yy.listaErrores || []; 
        yy.listaErrores = []; 
        return { ast: $1, errores: errs }; 
    }
    | EOF { 
        var errs = yy.listaErrores || []; 
        yy.listaErrores = [];
        return { ast: [], errores: errs }; 
    }
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION    { if ($2) $1.push($2); $$=$1; }
              | INSTRUCCIONES PUNTO_COMA     { $$ = $1; }
              | INSTRUCCION                  { $$= $1 ? [$1] : []; }
              | PUNTO_COMA                   { $$ = []; }
              | error { 
                  if (!yy.listaErrores) yy.listaErrores = [];
                  yy.listaErrores.push(new Errores.default('Sintáctico', 'Error de sintaxis cerca de ' + yytext, this._$.first_line, this._$.first_column)); 
                  $$ = null; 
              }
;

INSTRUCCION : INS_IMPRIMIR {$$ = $1;}
            |ASIGNAR    {$$ = $1;}
            |DECLARACION    {$$ = $1;}
            |INS_IF {$$ = $1;}
            |ASIGNACION_COMPUESTA {$$ = $1;}
            |DEC_CORTA {$$ = $1;}
            |INS_FOR {$$ = $1;}
            |INS_BREAK {$$ = $1;}
            |INS_CONTINUE {$$ = $1;}
            |INS_SWITCH {$$ = $1;}
            |INS_FUNCION {$$ = $1;}
            |INS_RETURN {$$ = $1;}
            |INS_LLAMADA_INST {$$ = $1;}
            |INS_INCREMENTO {$$ = $1;}
            |INS_DECREMENTO {$$ = $1;}
            |STRUCT_DEF {$$=$1;}
            |LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new Bloque.default($2, @1.first_line, @1.first_column); }
            |error { 
                if (!yy.listaErrores) yy.listaErrores = [];
                yy.listaErrores.push(new Errores.default('Sintáctico', 'Error de sintaxis cerca de ' + yytext, this._$.first_line, this._$.first_column)); 
                $$ = null; 
            }
;

DECLARACION: VAR ID TIPO { if($3) $$= new Declaracion.default($3,@1.first_line, @1.first_column,$2,null); else $$=null; }
           | VAR ID TIPO IGUAL EXPRESION { if($3 && $5) $$= new Declaracion.default($3,@1.first_line, @1.first_column,$2,$5); else $$=null; }
           | TIPO_BASE ID IGUAL EXPRESION { if($1 && $4) $$= new Declaracion.default($1,@1.first_line, @1.first_column,$2,$4); else $$=null; }
           | TIPO_BASE ID { if($1) $$= new Declaracion.default($1,@1.first_line, @1.first_column,$2,null); else $$=null; }
           | ID ID IGUAL EXPRESION { $$ = new Declaracion.default(new Tipo.default(Tipo.tipoDato.STRUCT, undefined, $1), @1.first_line, @1.first_column, $2, $4); }
           | ID ID { $$ = new Declaracion.default(new Tipo.default(Tipo.tipoDato.STRUCT, undefined, $1), @1.first_line, @1.first_column, $2, null); }
           | CORCHETE_ABRE CORCHETE_CIERRA TIPO ID IGUAL EXPRESION { $$ = new Declaracion.default(new Tipo.default(Tipo.tipoDato.SLICE, $3), @1.first_line, @1.first_column, $4, $6); }
           | CORCHETE_ABRE CORCHETE_CIERRA TIPO ID { $$ = new Declaracion.default(new Tipo.default(Tipo.tipoDato.SLICE, $3), @1.first_line, @1.first_column, $4, null); }
;

DEC_CORTA: ID DOS_PUNTOS_IGUAL EXPRESION { if($3) $$= new DeclaracionCorta.default($1, $3, @1.first_line, @1.first_column); else $$=null; }
;

ASIGNAR: EXPRESION IGUAL EXPRESION {
           if (!$1 || !$3) {
               $$ = null;
           } else if ($1.isAccesoVar) {
               $$ = new AsignacionVar.default($1.id, $3, @1.first_line, @1.first_column);
           } else if ($1.isAccesoSlice) {
               $$ = new ModificarSlice.default($1.slice, $1.index, $3, @1.first_line, @1.first_column);
           } else if ($1.isAccesoAtributo) {
               $$ = new ModificarAtributo.default($1.target, $1.idAtributo, $3, @1.first_line, @1.first_column);
           } else {
               if (!yy.listaErrores) yy.listaErrores = [];
               yy.listaErrores.push(new Errores.default('Semantico', 'L-Value no valido para asignacion', @1.first_line, @1.first_column));
               $$ = null;
           }
       }
;

EXPRESION_ACCESO_SLICE: EXPRESION CORCHETE_ABRE EXPRESION CORCHETE_CIERRA {
                          // Retornamos un objeto temporal para que ModificarSlice sepa qué modificar.
                          // En realidad, ModificarSlice ahora toma (target, index, valor).
                          // Así que esta regla debe retornar (target, index).
                          $$ = { target: $1, index: $3 };
                       }
;

ASIGNACION_COMPUESTA: ID MAS_IGUAL EXPRESION {$$= new SumaAsignacion.default($1, $3, @1.first_line, @1.first_column);}
                    | ID MENOS_IGUAL EXPRESION {$$= new RestaAsignacion.default($1, $3, @1.first_line, @1.first_column);}
;

STRUCT_DEF: STRUCT ID LLAVE_ABRE ATRIBUTOS_DEF LLAVE_CIERRA { $$ = new DefinicionStruct.default($2, $4, @1.first_line, @1.first_column); }
;

ATRIBUTOS_DEF: ATRIBUTO_DEF { $$ = [$1]; }
             | ATRIBUTOS_DEF ATRIBUTO_DEF { $1.push($2); $$ = $1; }
;

ATRIBUTO_DEF: TIPO ID PUNTO_COMA { $$ = { id: $2, tipo: $1 }; }
            | TIPO ID { $$ = { id: $2, tipo: $1 }; }
;

INS_IMPRIMIR : IMPRIMIR PAR_ABRE ARGUMENTOS PAR_CIERRA {$$= new Imprimir.default($3,@1.first_line, @1.first_column);}
;

INS_IF : IF EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CondicionalIf.default($2, $4, undefined, @1.first_line, @1.first_column); }
       | IF EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA ELSE LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CondicionalIf.default($2, $4, $8, @1.first_line, @1.first_column); }
       | IF EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA ELSE INS_IF { $$ = new CondicionalIf.default($2, $4, [$7], @1.first_line, @1.first_column); }
;

INS_FOR : FOR EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CicloFor.default($2, $4, @1.first_line, @1.first_column); }
        | FOR INSTRUCCION PUNTO_COMA EXPRESION PUNTO_COMA INSTRUCCION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CicloForCompleto.default($2, $4, $6, $8, @1.first_line, @1.first_column); }
        | FOR ID COMA ID DOS_PUNTOS_IGUAL RANGE EXPRESION LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new CicloForRange.default($2, $4, $7, $9, @1.first_line, @1.first_column); }
;


INS_BREAK : RBREAK { $$ = new Break.default(@1.first_line, @1.first_column); }
;

INS_FUNCION: FUNC ID PAR_ABRE PARAMETROS PAR_CIERRA TIPO_RETORNO LLAVE_ABRE INSTRUCCIONES LLAVE_CIERRA { $$ = new Funcion.default($2, $4, $6, $8, @1.first_line, @1.first_column); }
;

PARAMETROS: PARAMETROS COMA PARAMETRO { $1.push($3); $$ = $1; }
          | PARAMETRO { $$ = [$1]; }
          | /* empty */ { $$ = []; }
;

PARAMETRO: ID TIPO { $$ = {id: $1, tipo: $2}; }
;

TIPO_RETORNO: TIPO { $$ = $1; }
            | /* empty */ { $$ = new Tipo.default(Tipo.tipoDato.VOID); }
;

INS_RETURN: RETURN EXPRESION { $$ = new Return.default($2, @1.first_line, @1.first_column); }
          | RETURN { $$ = new Return.default(null, @1.first_line, @1.first_column); }
;

INS_LLAMADA_INST: LLAMADA_EXPR { $$ = $1; }
;

LLAMADA_EXPR: ID PAR_ABRE ARGUMENTOS PAR_CIERRA { $$ = new Llamada.default($1, $3, @1.first_line, @1.first_column); }
;

ARGUMENTOS: ARGUMENTOS_LISTA { $$ = $1; }
          | ARGUMENTOS_LISTA COMA { $$ = $1; }
          | /* empty */ { $$ = []; }
;

ARGUMENTOS_LISTA: ARGUMENTOS_LISTA COMA EXPRESION { $1.push($3); $$ = $1; }
                | EXPRESION { $$ = [$1]; }
;

INS_CONTINUE: CONTINUE {$$= new Continue.default(@1.first_line, @1.first_column);}
;

INS_INCREMENTO: ID MAS_MAS { $$ = new Incremento.default($1, @1.first_line, @1.first_column); }
;

INS_DECREMENTO: ID MENOS_MENOS { $$ = new Decremento.default($1, @1.first_line, @1.first_column); }
;

INS_SWITCH: SWITCH EXPRESION LLAVE_ABRE CASOS LLAVE_CIERRA { $$ = new Switch.default($2, $4, undefined, @1.first_line, @1.first_column); }
          | SWITCH EXPRESION LLAVE_ABRE CASOS DEF_BLOCK LLAVE_CIERRA { $$ = new Switch.default($2, $4, $5, @1.first_line, @1.first_column); }
          | SWITCH EXPRESION LLAVE_ABRE DEF_BLOCK LLAVE_CIERRA { $$ = new Switch.default($2, [], $4, @1.first_line, @1.first_column); }
;

CASOS: CASOS CASO { $1.push($2); $$ = $1; }
     | CASO       { $$ = [$1]; }
;

CASO: CASE EXPRESION DOS_PUNTOS INSTRUCCIONES { $$ = new SwitchCase.default($2, $4, @1.first_line, @1.first_column); }
    | CASE EXPRESION DOS_PUNTOS { $$ = new SwitchCase.default($2, [], @1.first_line, @1.first_column); }
;

DEF_BLOCK: DEFAULT DOS_PUNTOS INSTRUCCIONES { $$ = $3; }
         | DEFAULT DOS_PUNTOS { $$ = []; }
;

EXPRESION : EXPRESION MAS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.SUMA, @1.first_line, @1.first_column, $1,$3 ); }
    |EXPRESION MENOS EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.RESTA, @1.first_line, @1.first_column, $1,$3); }
    |EXPRESION POR EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.MULT, @1.first_line, @1.first_column, $1,$3); }
    |EXPRESION DIVIDIDO EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.DIV, @1.first_line, @1.first_column, $1,$3); }
    |EXPRESION MODULO EXPRESION  { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.MOD, @1.first_line, @1.first_column, $1,$3); }
    |MENOS EXPRESION %prec UMENOS { $$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.NEG, @1.first_line, @1.first_column, $2); }
    |ENTERO             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1, @1.first_line, @1.first_column ); }
    |DECIMAL           {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1, @1.first_line, @1.first_column ); }
    |CADENA            {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.CADENA), $1, @1.first_line, @1.first_column ); }
    |L_RUNE            {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.RUNE), parseInt($1), @1.first_line, @1.first_column ); }
    |NIL               {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.NULO), null, @1.first_line, @1.first_column ); }
    |RTRUE             {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), true, @1.first_line, @1.first_column ); }
    |RFALSE            {$$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), false, @1.first_line, @1.first_column ); }
    |EXPRESION IGUAL_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.IGUALDAD,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION DIFERENTE EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.DIFERENCIA,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MENOR EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MENOR,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MENOR_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MENOR_IGUAL,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MAYOR EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MAYOR,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION MAYOR_IGUAL EXPRESION {$$= new Relacionales.default(Relacionales.Op_relacionales.MAYOR_IGUAL,@1.first_line, @1.first_column, $1,$3);}
    |EXPRESION AND EXPRESION {$$= new Logicas.default(Logicas.operadoresLogicos.AND, @1.first_line, @1.first_column, $1, $3);}
    |EXPRESION OR EXPRESION {$$= new Logicas.default(Logicas.operadoresLogicos.OR, @1.first_line, @1.first_column, $1, $3);}
    |NOT EXPRESION {$$= new Logicas.default(Logicas.operadoresLogicos.NOT,@1.first_line, @1.first_column, $2);}

    |LLAMADA_EXPR { $$ = $1; }
    |ID         {$$= new AccesoVar.default($1,@1.first_line, @1.first_column);}
    |PAR_ABRE EXPRESION PAR_CIERRA { $$ = $2; }
    |CORCHETE_ABRE CORCHETE_CIERRA TIPO LLAVE_ABRE ARGUMENTOS LLAVE_CIERRA { $$ = new LiteralSlice.default($3, $5, @1.first_line, @1.first_column); }
    |LLAVE_ABRE VALORES_STRUCT LLAVE_CIERRA { $$ = new InstanciaStruct.default($2, @1.first_line, @1.first_column); }
    |LLAVE_ABRE ARGUMENTOS LLAVE_CIERRA { $$ = new LiteralMultidimensional.default($2, @1.first_line, @1.first_column); }
    |EXPRESION CORCHETE_ABRE EXPRESION CORCHETE_CIERRA { $$ = new AccesoSlice.default($1, $3, @1.first_line, @1.first_column); }
    |EXPRESION PUNTO ATTR_ID { $$ = new AccesoAtributo.default($1, $3, @1.first_line, @1.first_column); }
    |APPEND PAR_ABRE EXPRESION COMA ARGUMENTOS PAR_CIERRA { $$ = new Append.default($3, $5, @1.first_line, @1.first_column); }
    |STRCONV_ATOI PAR_ABRE EXPRESION PAR_CIERRA { $$ = new Atoi.default($3, @1.first_line, @1.first_column); }
    |STRCONV_PARSEFLOAT PAR_ABRE EXPRESION PAR_CIERRA { $$ = new ParseFloat.default($3, @1.first_line, @1.first_column); }
    |REFLECT PUNTO TYPEOF PAR_ABRE EXPRESION PAR_CIERRA { $$ = new TypeOf.default($5, @1.first_line, @1.first_column); }
    |LEN PAR_ABRE EXPRESION PAR_CIERRA {
        function LenExpr(exp, l, c) {
            this.exp = exp;
            this.linea = l;
            this.columna = c;
            this.tipoDato = new Tipo.default(Tipo.tipoDato.ENTERO);
        }
        LenExpr.prototype.interpretar = function(arbol, tabla) {
            let res = this.exp.interpretar(arbol, tabla);
            if (res && res.isError) return res;
            if (Array.isArray(res) || typeof res === 'string') return res.length;
            return new (require('./excepciones/Errores').default)("Semantico", "len() solo es valido para slices o cadenas", this.linea, this.columna);
        }
        LenExpr.prototype.getNodo = function() {
            let nodo = new NodoAST.default("LEN");
            nodo.agregarHijo(this.exp.getNodo());
            return nodo;
        }
        $$ = new LenExpr($3, @1.first_line, @1.first_column);
    }
    |SLICE_INDEX PAR_ABRE EXPRESION COMA EXPRESION PAR_CIERRA {
        function IndexExpr(s, v, l, c) { this.s=s; this.v=v; this.linea=l; this.columna=c; this.tipoDato=new Tipo.default(Tipo.tipoDato.ENTERO); }
        IndexExpr.prototype.interpretar = function(arbol, tabla) {
            let slice = this.s.interpretar(arbol, tabla);
            if (slice && slice.isError) return slice;
            let val = this.v.interpretar(arbol, tabla);
            if (val && val.isError) return val;
            if (!Array.isArray(slice)) return new (require('./excepciones/Errores').default)("Semantico", "Primer argumento de slices.Index debe ser un slice", this.linea, this.columna);
            return slice.indexOf(val);
        }
        IndexExpr.prototype.getNodo = function() {
            let nodo = new (require('./simbolo/NodoAST').default)("SLICE_INDEX");
            nodo.agregarHijo(this.s.getNodo());
            nodo.agregarHijo(this.v.getNodo());
            return nodo;
        }
        $$ = new IndexExpr($3, $5, @1.first_line, @1.first_column);
    }
    |STRINGS_JOIN PAR_ABRE EXPRESION COMA EXPRESION PAR_CIERRA {
        function JoinExpr(s, sep, l, c) { this.s=s; this.sep=sep; this.linea=l; this.columna=c; this.tipoDato=new Tipo.default(Tipo.tipoDato.CADENA); }
        JoinExpr.prototype.interpretar = function(arbol, tabla) {
            let slice = this.s.interpretar(arbol, tabla);
            if (slice && slice.isError) return slice;
            let sep = this.sep.interpretar(arbol, tabla);
            if (sep && sep.isError) return sep;
            if (!Array.isArray(slice)) return new (require('./excepciones/Errores').default)("Semantico", "Primer argumento de strings.Join debe ser un slice", this.linea, this.columna);
            if (this.s.tipoDato.getTipoElemento().getTipo() !== Tipo.tipoDato.CADENA) return new (require('./excepciones/Errores').default)("Semantico", "strings.Join solo es valido para slices de strings", this.linea, this.columna);
            return slice.join(sep);
        }
        JoinExpr.prototype.getNodo = function() {
            let nodo = new (require('./simbolo/NodoAST').default)("STRINGS_JOIN");
            nodo.agregarHijo(this.s.getNodo());
            nodo.agregarHijo(this.sep.getNodo());
            return nodo;
        }
        $$ = new JoinExpr($3, $5, @1.first_line, @1.first_column);
    }

;

VALORES_STRUCT: VALORES_STRUCT_LIST { $$ = $1; }
              | VALORES_STRUCT_LIST COMA { $$ = $1; }
              | /* empty */ { $$ = []; }
;

VALORES_STRUCT_LIST: VALOR_STRUCT { $$ = [$1]; }
                   | VALORES_STRUCT_LIST COMA VALOR_STRUCT { $1.push($3); $$ = $1; }
;

VALOR_STRUCT: ID DOS_PUNTOS EXPRESION { $$ = { id: $1, exp: $3 }; }
;

TIPO_BASE: INT {$$= new Tipo.default(Tipo.tipoDato.ENTERO);}
         | T_FLOAT64 {$$= new Tipo.default(Tipo.tipoDato.DECIMAL);}
         | T_STRING  {$$= new Tipo.default(Tipo.tipoDato.CADENA);}
         | T_BOOL    {$$= new Tipo.default(Tipo.tipoDato.BOOLEAN);}
         | T_RUNE    {$$= new Tipo.default(Tipo.tipoDato.RUNE);}
;

TIPO: TIPO_BASE { $$ = $1; }
    | ID        {$$= new Tipo.default(Tipo.tipoDato.STRUCT, undefined, $1);}
    | CORCHETE_ABRE CORCHETE_CIERRA TIPO { $$ = new Tipo.default(Tipo.tipoDato.SLICE, $3); }
;

ATTR_ID: ID { $$ = $1; }
       | T_STRING { $$ = "string"; }
       | INT { $$ = "int"; }
       | T_FLOAT64 { $$ = "float64"; }
       | T_BOOL { $$ = "bool"; }
       | T_RUNE { $$ = "rune"; }
;
