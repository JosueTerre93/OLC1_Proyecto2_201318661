import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class CondicionalIf extends Instruccion {
    private condicion: Instruccion;
    private instruccionesIf: Instruccion[];
    private instruccionesElse: Instruccion[] | undefined;

    constructor(
        condicion: Instruccion, 
        instruccionesIf: Instruccion[], 
        instruccionesElse: Instruccion[] | undefined, 
        linea: number, 
        columna: number
    ) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instruccionesIf = instruccionesIf;
        this.instruccionesElse = instruccionesElse;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (!this.condicion) return null;
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond && cond.isError) return cond;

        if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
            return new Errores("Semantico", "La condicion del if debe ser booleana", this.linea, this.columna);
        }

        if (cond) {
            let nuevaTabla = new TablaSimbolo(tabla);
            for (let i of this.instruccionesIf) {
                if (i) {
                    let res = i.interpretar(arbol, nuevaTabla);
                    if (res && res.isError) return res;
                    if (res && res.isBreak) return res;
                    if (res && res.isContinue) return res;
                    if (res && res.isReturn) return res;
                }
            }
        } else {
            if (this.instruccionesElse != undefined) {
                let nuevaTabla = new TablaSimbolo(tabla);
                for (let i of this.instruccionesElse) {
                    if (i) {
                        let res = i.interpretar(arbol, nuevaTabla);
                        if (res && res.isError) return res;
                        if (res && res.isBreak) return res;
                        if (res && res.isContinue) return res;
                        if (res && res.isReturn) return res;
                    }
                }
            }
        }
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("CONDICIONAL_IF");
        nodo.agregarHijo(this.condicion.getNodo());
        let bloqueIf = new NodoAST("BLOQUE_VERDADERO");
        for (let i of this.instruccionesIf) {
            if (i) bloqueIf.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(bloqueIf);
        
        if (this.instruccionesElse != undefined) {
            let bloqueElse = new NodoAST("BLOQUE_FALSO");
            for (let i of this.instruccionesElse) {
                if (i) bloqueElse.agregarHijo(i.getNodo());
            }
            nodo.agregarHijo(bloqueElse);
        }
        return nodo;
    }
}
