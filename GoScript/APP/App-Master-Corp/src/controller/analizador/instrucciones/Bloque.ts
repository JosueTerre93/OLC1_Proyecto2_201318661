import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class Bloque extends Instruccion {
    private instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let nuevaTabla = new TablaSimbolo(tabla);
        for (let i of this.instrucciones) {
            if (i) {
                let res = i.interpretar(arbol, nuevaTabla);
                if (res && res.isError) return res;
                if (res && res.isBreak) return res; 
                if (res && res.isContinue) return res; 
                if (res && res.isReturn) return res; 
            }
        }
        return null;
    }
    
    getNodo(): NodoAST {
        let nodo = new NodoAST("BLOQUE");
        for (let instr of this.instrucciones) {
            if (instr) nodo.agregarHijo(instr.getNodo());
        }
        return nodo;
    }
}
