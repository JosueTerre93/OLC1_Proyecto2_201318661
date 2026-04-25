import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class CicloForCompleto extends Instruccion {
    private inicializacion: Instruccion;
    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(
        inicializacion: Instruccion, 
        condicion: Instruccion, 
        actualizacion: Instruccion, 
        instrucciones: Instruccion[], 
        linea: number, 
        columna: number
    ) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (!this.inicializacion || !this.condicion || !this.actualizacion) return null;
        
        let tablaFor = new TablaSimbolo(tabla);
        let init = this.inicializacion.interpretar(arbol, tablaFor);
        if (init instanceof Errores) return init;

        while (true) {
            let cond = this.condicion.interpretar(arbol, tablaFor);
            if (cond instanceof Errores) return cond;

            if (this.condicion.tipoDato.getTipo() !== tipoDato.BOOLEAN) {
                return new Errores("Semantico", "La condicion del for debe ser booleana", this.linea, this.columna);
            }

            if (!cond) break;

            let tablaLocal = new TablaSimbolo(tablaFor);
            for (let i of this.instrucciones) {
                if (i instanceof Instruccion) {
                    if (!i) continue;
                    let res = i.interpretar(arbol, tablaLocal);
                    if (res instanceof Errores) return res;
                    if (res instanceof Break) return null;
                    if (res instanceof Continue) break;
                    if (res != null && res.constructor.name === "Return") return res;
                }
            }

            let update = this.actualizacion.interpretar(arbol, tablaFor);
            if (update instanceof Errores) return update;
        }
        
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("CICLO_FOR_COMPLETO");
        nodo.agregarHijo(this.inicializacion.getNodo());
        nodo.agregarHijo(this.condicion.getNodo());
        nodo.agregarHijo(this.actualizacion.getNodo());
        let body = new NodoAST("BLOQUE");
        for (let i of this.instrucciones) {
            if (i) body.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(body);
        return nodo;
    }
}
