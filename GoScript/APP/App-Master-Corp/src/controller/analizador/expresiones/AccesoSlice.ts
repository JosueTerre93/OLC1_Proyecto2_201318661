import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class AccesoSlice extends Instruccion {
    public slice: Instruccion;
    public index: Instruccion;
    public readonly isAccesoSlice = true;

    constructor(slice: Instruccion, index: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.slice = slice;
        this.index = index;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let resSlice = this.slice.interpretar(arbol, tabla);
        if (resSlice && resSlice.isError) return resSlice;

        if (this.slice.tipoDato.getTipo() !== tipoDato.SLICE) {
            return new Errores("Semantico", "La variable no es un slice", this.linea, this.columna);
        }

        let resIndex = this.index.interpretar(arbol, tabla);
        if (resIndex && resIndex.isError) return resIndex;

        if (this.index.tipoDato.getTipo() !== tipoDato.ENTERO) {
            return new Errores("Semantico", "El indice debe ser un entero", this.linea, this.columna);
        }

        let index = parseInt(resIndex);
        if (index < 0) {
            return new Errores("Semantico", "El indice no puede ser negativo", this.linea, this.columna);
        }

        if (index >= resSlice.length) {
            return new Errores("Semantico", `Indice fuera de rango: ${index}. Tamaño del slice: ${resSlice.length}`, this.linea, this.columna);
        }

        // Establecer el tipo de retorno basado en el tipo de elemento del slice
        let tipoElem = this.slice.tipoDato.getTipoElemento();
        if (tipoElem) {
            this.tipoDato = tipoElem;
        }

        return resSlice[index];
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("ACCESO_SLICE");
        nodo.agregarHijo(this.slice.getNodo());
        nodo.agregarHijo(this.index.getNodo());
        return nodo;
    }
}
