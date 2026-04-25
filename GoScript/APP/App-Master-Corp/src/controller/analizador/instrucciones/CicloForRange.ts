import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class CicloForRange extends Instruccion {
    private id1: string;
    private id2: string;
    private expresion: Instruccion;
    private instrucciones: Instruccion[];

    constructor(id1: string, id2: string, expresion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id1 = id1;
        this.id2 = id2;
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let resExp = this.expresion.interpretar(arbol, tabla);
        if (resExp instanceof Errores) return resExp;

        if (this.expresion.tipoDato.getTipo() !== tipoDato.SLICE && this.expresion.tipoDato.getTipo() !== tipoDato.CADENA) {
            return new Errores("Semantico", "For range solo es valido para slices o strings", this.linea, this.columna);
        }

        let data = resExp;
        let tipoElemento: Tipo;

        if (this.expresion.tipoDato.getTipo() === tipoDato.CADENA) {
            tipoElemento = new Tipo(tipoDato.RUNE);
        } else {
            tipoElemento = this.expresion.tipoDato.getTipoElemento()!;
        }

        for (let i = 0; i < data.length; i++) {
            let tablaLocal = new TablaSimbolo(tabla);
            
            // Declarar i (índice)
            if (!tablaLocal.setVariable(new Simbolo(new Tipo(tipoDato.ENTERO), this.id1, i))) {
                return new Errores("Semantico", `Error: variable '${this.id1}' ya existe`, this.linea, this.columna);
            }
            arbol.addSimboloReporte(this.id1, "Variable", "int", "Local", this.linea, this.columna);

            // Declarar v (valor)
            let val = data[i];
            if (this.expresion.tipoDato.getTipo() === tipoDato.CADENA) {
                val = val.charCodeAt(0);
            }
            if (!tablaLocal.setVariable(new Simbolo(tipoElemento, this.id2, val))) {
                return new Errores("Semantico", `Error: variable '${this.id2}' ya existe`, this.linea, this.columna);
            }
            arbol.addSimboloReporte(this.id2, "Variable", tipoElemento.toString(), "Local", this.linea, this.columna);

            for (let instr of this.instrucciones) {
                if (instr instanceof Instruccion) {
                    let res = instr.interpretar(arbol, tablaLocal);
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
        let nodo = new NodoAST("CICLO_FOR_RANGE");
        nodo.agregarHijo(new NodoAST(this.id1));
        nodo.agregarHijo(new NodoAST(this.id2));
        nodo.agregarHijo(this.expresion.getNodo());
        let body = new NodoAST("BLOQUE");
        for (let i of this.instrucciones) {
            body.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(body);
        return nodo;
    }
}
