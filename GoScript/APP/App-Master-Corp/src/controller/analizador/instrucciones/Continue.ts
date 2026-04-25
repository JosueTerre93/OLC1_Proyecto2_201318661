import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Continue extends Instruccion {
    public readonly isContinue = true;
    constructor(linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        return this;
    }

    getNodo(): NodoAST {
        return new NodoAST("CONTINUE");
    }
}
