import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Imprimir extends Instruccion{

    private expresiones:Instruccion[]

    constructor( expresiones:Instruccion[],linea:number, columna:number){
        super(new Tipo(tipoDato.VOID),linea, columna)
        this.expresiones=expresiones
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let salidaStr = "";
        let primero = true;
        
        for (let base of this.expresiones) {
            let resValor = base.interpretar(arbol, tabla);
            if (resValor && resValor.isError) return resValor;
            if (!primero) salidaStr += " ";
            
            salidaStr += this.formatear(arbol, resValor, base.tipoDato);
            primero = false;
        }

        arbol.Print(salidaStr);
    }

    private formatear(arbol: Arbol, val: any, tipo: Tipo): string {
        if (val === null) return "nil";
        
        if (tipo.getTipo() === tipoDato.RUNE) {
            return String.fromCharCode(val);
        } else if (tipo.getTipo() === tipoDato.SLICE) {
            let items = [];
            if (Array.isArray(val)) {
                for (let i = 0; i < val.length; i++) {
                    items.push(this.formatear(arbol, val[i], tipo.getTipoElemento()!));
                }
            }
            return "[" + items.join(" ") + "]";
        } else if (tipo.getTipo() === tipoDato.STRUCT) {
            let idStruct = tipo.getIdStruct();
            let res = (idStruct || "Struct") + "{";
            let def = arbol.getStruct(idStruct!);
            let attrs = [];
            if (def && typeof val === 'object') {
                for (let attr of def) {
                    attrs.push(`${attr.id}: ${this.formatear(arbol, val[attr.id], attr.tipo)}`);
                }
            } else {
                // Fallback para cuando no tenemos la definición a mano
                for (let key in val) {
                    attrs.push(`${key}: ${val[key]}`);
                }
            }
            res += attrs.join(", ") + "}";
            return res;
        } else if (tipo.getTipo() === tipoDato.BOOLEAN) {
            return val ? "true" : "false";
        }
        
        return String(val);
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("IMPRIMIR");
        for (let base of this.expresiones) {
            nodo.agregarHijo(base.getNodo());
        }
        return nodo;
    }

}