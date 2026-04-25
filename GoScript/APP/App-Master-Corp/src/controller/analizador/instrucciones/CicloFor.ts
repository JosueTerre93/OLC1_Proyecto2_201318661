import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class CicloFor extends Instruccion {
    private condicion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(condicion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;

        if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
            return new Errores("Semantico", "La condicion del for debe ser booleana", this.linea, this.columna);
        }

        while (this.condicion.interpretar(arbol, tabla)) {
            let tablaLocal = new TablaSimbolo(tabla);
            for (let i of this.instrucciones) {
                if (i instanceof Instruccion) {
                    let res = i.interpretar(arbol, tablaLocal);
                    if (res instanceof Errores) return res;
                    if (res instanceof Break) return null;
                    if (res instanceof Continue) break;
                    if (res != null && res.constructor.name === "Return") return res;
                }
            }
        }
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("CICLO_FOR_WHILE");
        nodo.agregarHijo(this.condicion.getNodo());
        let body = new NodoAST("BLOQUE");
        for (let i of this.instrucciones) {
            body.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(body);
        return nodo;
    }
}
