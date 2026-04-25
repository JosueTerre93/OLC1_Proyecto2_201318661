import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class Atoi extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.ENTERO), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let val = this.expresion.interpretar(arbol, tabla);
        if (val instanceof Errores) return val;

        if (this.expresion.tipoDato.getTipo() !== tipoDato.CADENA) {
            return new Errores("Semantico", "strconv.Atoi requiere una cadena como argumento", this.linea, this.columna);
        }

        let strVal = String(val);
        
        if (!/^-?\d+$/.test(strVal)) {
            return new Errores("Semantico", `No se pudo convertir la cadena '${strVal}' a entero (formato invalido o decimal)`, this.linea, this.columna);
        }

        let num = parseInt(strVal);
        if (isNaN(num)) {
            return new Errores("Semantico", `Error al convertir '${strVal}' a entero`, this.linea, this.columna);
        }

        return num;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("STRCONV_ATOI");
        nodo.agregarHijo(new NodoAST("strconv.Atoi"));
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }
}
