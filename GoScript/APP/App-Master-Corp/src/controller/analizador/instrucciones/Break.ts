import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Break extends Instruccion {

    public readonly isBreak = true;
    constructor(linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        return this;
    }

    getNodo(): NodoAST {
        return new NodoAST("BREAK");
    }
}
