import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class ParseFloat extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.DECIMAL), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let val = this.expresion.interpretar(arbol, tabla);
        if (val instanceof Errores) return val;

        if (this.expresion.tipoDato.getTipo() !== tipoDato.CADENA) {
            return new Errores("Semantico", "strconv.ParseFloat requiere una cadena como argumento", this.linea, this.columna);
        }

        let strVal = String(val);
        
        // Validar formato de número (entero o decimal)
        if (!/^-?\d+(\.\d+)?$/.test(strVal)) {
            return new Errores("Semantico", `No se pudo convertir la cadena '${strVal}' a float64 (formato invalido)`, this.linea, this.columna);
        }

        let num = parseFloat(strVal);

        if (isNaN(num)) {
            return new Errores("Semantico", `Error al procesar la conversion de '${strVal}' a float64`, this.linea, this.columna);
        }

        return num;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("STRCONV_PARSEFLOAT");
        nodo.agregarHijo(new NodoAST("strconv.ParseFloat"));
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }
}
