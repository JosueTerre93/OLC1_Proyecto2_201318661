import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class DeclaracionCorta extends Instruccion {
    private id: string;
    private valor: Instruccion;

    constructor(id: string, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores) return resValor;

        this.tipoDato = this.valor.tipoDato;

        if(!tabla.setVariable(new Simbolo(this.tipoDato, this.id, resValor))) {
            return new Errores("Semantico", `Error: variable '${this.id}' ya existe en este entorno`, this.linea, this.columna);
        }
        let tipoStr = this.tipoDato ? this.tipoDato.toString() : "Indefinido";
        arbol.addSimboloReporte(this.id, "Variable", tipoStr, tabla.getNombreDato() || "Global", this.linea, this.columna);
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("DECLARACION_CORTA");
        nodo.agregarHijo(new NodoAST(this.id));
        nodo.agregarHijo(new NodoAST(":="));
        nodo.agregarHijo(this.valor.getNodo());
        return nodo;
    }
}
