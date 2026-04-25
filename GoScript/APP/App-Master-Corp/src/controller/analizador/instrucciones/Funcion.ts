import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Funcion extends Instruccion {
    public id: string;
    public parametros: {id: string, tipo: Tipo}[];
    public instrucciones: Instruccion[];
    public readonly isFuncion = true;

    constructor(
        id: string, 
        parametros: {id: string, tipo: Tipo}[], 
        tipo: Tipo, 
        instrucciones: Instruccion[], 
        linea: number, 
        columna: number
    ) {
        super(tipo, linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // 1. Las funciones pueden declararse solamente en el ámbito global.
        if (tabla.getAnterior() != null) {
            return new Errores("Semantico", "Las funciones solo pueden declararse en el ámbito global", this.linea, this.columna);
        }

        // 2. No pueden existir parámetros con el mismo nombre.
        let idsParams = new Set<string>();
        for (let p of this.parametros) {
            if (idsParams.has(p.id)) {
                return new Errores("Semantico", `El parametro '${p.id}' ya ha sido declarado en la funcion '${this.id}'`, this.linea, this.columna);
            }
            idsParams.add(p.id);
        }

        // Verificar colisión con variables globales o structs
        if (arbol.getTablaGlobal().getVariable(this.id)) {
            return new Errores("Semantico", `Ya existe una variable con el nombre '${this.id}'`, this.linea, this.columna);
        }
        if (arbol.getStruct(this.id)) {
             return new Errores("Semantico", `Ya existe un struct con el nombre '${this.id}'`, this.linea, this.columna);
        }
        if (arbol.getFuncion(this.id)) {
             return new Errores("Semantico", `Ya existe una funcion con el nombre '${this.id}'`, this.linea, this.columna);
        }

        // La declaracion se auto-registra en la pasada inicial en ide.component.ts
        arbol.addFuncion(this.id, this);
        
        arbol.addSimboloReporte(this.id, "Funcion", this.tipoDato.toString(), tabla.getNombreDato() || "Global", this.linea, this.columna);
        for (let p of this.parametros) {
            arbol.addSimboloReporte(p.id, "Parametro", p.tipo.toString(), this.id, this.linea, this.columna);
        }

        return null; 
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("FUNCION_DECL", this.linea);
        nodo.agregarHijo(new NodoAST(this.id));
        
        let paramsNodo = new NodoAST("PARAMETROS");
        for (let p of this.parametros) {
            paramsNodo.agregarHijo(new NodoAST(p.id));
        }
        nodo.agregarHijo(paramsNodo);

        let bloque = new NodoAST("BLOQUE");
        for (let i of this.instrucciones) {
            bloque.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(bloque);
        
        return nodo;
    }
}
