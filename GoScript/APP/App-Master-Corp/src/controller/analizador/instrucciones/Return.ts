import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Return extends Instruccion {
    public expresion: Instruccion | null;

    public readonly isReturn = true;

    constructor(expresion: Instruccion | null, linea: number, columna: number) {
        // El tipo se ajustará en ejecución
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // Simplemente burbujea a sí mismo
        return this;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("RETURN");
        if (this.expresion) {
            nodo.agregarHijo(this.expresion.getNodo());
        }
        return nodo;
    }
}
