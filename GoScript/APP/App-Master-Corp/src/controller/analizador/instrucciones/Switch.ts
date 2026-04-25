import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import SwitchCase from "./SwitchCase";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class Switch extends Instruccion {
    private expresion: Instruccion;
    private casos: SwitchCase[];
    private instruccionesDefault: Instruccion[] | undefined;

    constructor(
        expresion: Instruccion, 
        casos: SwitchCase[], 
        instruccionesDefault: Instruccion[] | undefined, 
        linea: number, 
        columna: number
    ) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.instruccionesDefault = instruccionesDefault;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (!this.expresion) return null;
        let valorSwitch = this.expresion.interpretar(arbol, tabla);
        if (valorSwitch && valorSwitch.isError) return valorSwitch;

        let ejecutado = false;

        for (let caso of this.casos) {
            let valorCaso = caso.expresion.interpretar(arbol, tabla);
            if (valorCaso && valorCaso.isError) return valorCaso;

            // En GoScript los tipos deben ser iguales para comparar (estricto)
            if (this.expresion.tipoDato.getTipo() !== caso.expresion.tipoDato.getTipo()) {
                return new Errores("Semantico", "El tipo de dato del caso no coincide con el tipo del switch", caso.linea, caso.columna);
            }

            if (valorSwitch === valorCaso) {
                ejecutado = true;
                let tablaLocal = new TablaSimbolo(tabla);
                
                for (let instruccion of caso.instrucciones) {
                    if (!instruccion) continue;
                    let res = instruccion.interpretar(arbol, tablaLocal);
                    if (res && res.isError) return res;
                    // En GoScript hay un break implicito al final de cada case
                    if (res && res.isBreak) return null;
                    if (res && res.isContinue) return res; 
                    if (res && res.isReturn) return res;
                }
                break; // Break implicito de GoScript
            }
        }

        if (!ejecutado && this.instruccionesDefault !== undefined) {
            let tablaLocal = new TablaSimbolo(tabla);
            for (let instruccion of this.instruccionesDefault) {
                if (!instruccion) continue;
                let res = instruccion.interpretar(arbol, tablaLocal);
                if (res && res.isError) return res;
                if (res && res.isBreak) return null;
                if (res && res.isContinue) return res;
                if (res && res.isReturn) return res;
            }
        }

        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("SWITCH");
        nodo.agregarHijo(this.expresion.getNodo());
        for (let caso of this.casos) {
            nodo.agregarHijo(caso.getNodo());
        }
        if (this.instruccionesDefault !== undefined) {
            let defaultNode = new NodoAST("DEFAULT");
            for (let instruccion of this.instruccionesDefault) {
                if (instruccion) defaultNode.agregarHijo(instruccion.getNodo());
            }
            nodo.agregarHijo(defaultNode);
        }
        return nodo;
    }
}
