import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Declaracion extends Instruccion {
    private id: string;
    private valor: Instruccion| null

    constructor(tipo:Tipo,linea: number, columna: number, id: string, valor: Instruccion) {
        super(tipo, linea, columna);
        this.id = id;
        this.valor = valor;
    }
    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        if (tabla.getAnterior() == null) {
            if (arbol.getFuncion(this.id)) {
                return new Errores("Semantico", `Ya existe una funcion con el nombre '${this.id}'`, this.linea, this.columna);
            }
            if (arbol.getStruct(this.id)) {
                return new Errores("Semantico", `Ya existe un struct con el nombre '${this.id}'`, this.linea, this.columna);
            }
        }

        if(this.valor == null){
            let defaultVal = this.tipoDato.getDefaultValue();
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.id, defaultVal))) {
                return new Errores('Semantico', `Error: variable '${this.id}' ya existe en este entorno`, this.linea, this.columna);
            }
            arbol.addSimboloReporte(this.id, "Variable", tipoDato[this.tipoDato.getTipo()], tabla.getAnterior() == null ? "Global" : "Local", this.linea, this.columna);
            return null;
        }
        let resValor = this.valor.interpretar(arbol, tabla);
        if (resValor instanceof Errores) return resValor;
        

        if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo()) {
            if (this.tipoDato.getTipo() === tipoDato.DECIMAL && this.valor.tipoDato.getTipo() === tipoDato.ENTERO) {
                resValor = parseFloat(resValor);
            } else if (this.valor.tipoDato.getTipo() === tipoDato.NULO && (this.tipoDato.getTipo() === tipoDato.SLICE || this.tipoDato.getTipo() === tipoDato.STRUCT)) {
                // Permitir inicializar nil a slices y structs
            } else {
                return new Errores("Semantico", `Error de tipo en la declaracion de la variable ${this.id}, esperado ${tipoDato[this.tipoDato.getTipo()]} pero obtenido ${tipoDato[this.valor.tipoDato.getTipo()]}`, this.linea, this.columna);
            }
        }

        if (this.tipoDato.getTipo() === tipoDato.STRUCT) {
            let idStruct = this.tipoDato.getIdStruct();
            let def = arbol.getStruct(idStruct!);
            if (!def) return new Errores("Semantico", `Definicion de struct '${idStruct}' no encontrada`, this.linea, this.columna);
            for (let attr of def) {
                if (!(attr.id in resValor)) {
                    return new Errores("Semantico", `Falta el atributo '${attr.id}' para el struct '${idStruct}'`, this.linea, this.columna);
                }
            }
        }

        if(!tabla.setVariable(new Simbolo(this.tipoDato,this.id,resValor))) {
            return new Errores("Semantico", "Error de variable ya existe en el entorno", this.linea, this.columna);
        }
        let tipoStr = this.tipoDato ? this.tipoDato.toString() : "Indefinido";
        arbol.addSimboloReporte(this.id, "Variable", tipoStr, tabla.getNombreDato() || "Global", this.linea, this.columna);
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("DECLARACION", this.linea);
        nodo.agregarHijo(new NodoAST(this.id));
        if (this.valor != null) {
            nodo.agregarHijo(new NodoAST("="));
            nodo.agregarHijo(this.valor.getNodo());
        }
        return nodo;
    }
}