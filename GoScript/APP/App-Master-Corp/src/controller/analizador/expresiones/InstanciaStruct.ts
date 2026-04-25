import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class InstanciaStruct extends Instruccion {
    private valores: { id: string, exp: Instruccion }[];

    constructor(valores: { id: string, exp: Instruccion }[], linea: number, columna: number) {
        super(new Tipo(tipoDato.STRUCT), linea, columna);
        this.valores = valores;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {

        let structObj: any = {};
        for (let item of this.valores) {
            let val = item.exp.interpretar(arbol, tabla);
            if (val instanceof Errores) return val;
            structObj[item.id] = val;
        }

        return structObj;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("INSTANCIA_STRUCT");
        for (let item of this.valores) {
            let nItem = new NodoAST("CAMPO");
            nItem.agregarHijo(new NodoAST(item.id));
            nItem.agregarHijo(item.exp.getNodo());
            nodo.agregarHijo(nItem);
        }
        return nodo;
    }
}
