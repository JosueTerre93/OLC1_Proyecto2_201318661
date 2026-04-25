import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class DefinicionStruct extends Instruccion {
    private id: string;
    private atributos: { id: string, tipo: Tipo }[];
    public readonly isDefinicionStruct = true;

    constructor(id: string, atributos: { id: string, tipo: Tipo }[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.atributos = atributos;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Validar que la declaración sea en el ámbito GLOBAL
        if (tabla.getAnterior() != null) {
            return new Errores("Semantico", "Los structs solo pueden ser declarados en el ámbito global", this.linea, this.columna);
        }

        // 2. Validar que no esté vacío
        if (this.atributos.length === 0) {
            return new Errores("Semantico", "Cada struct debe tener al menos un atributo", this.linea, this.columna);
        }

        // Verificar que no exista ya como struct, funcion o variable global
        if (arbol.getStruct(this.id)) {
            return new Errores("Semantico", `El struct '${this.id}' ya ha sido definido`, this.linea, this.columna);
        }
        if (arbol.getFuncion(this.id)) {
            return new Errores("Semantico", `Ya existe una funcion con el nombre '${this.id}'`, this.linea, this.columna);
        }
        if (arbol.getTablaGlobal().getVariable(this.id)) {
            return new Errores("Semantico", `Ya existe una variable con el nombre '${this.id}'`, this.linea, this.columna);
        }

        // Registrar en el árbol
        arbol.addStruct(this.id, this.atributos);
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("DEFINICION_STRUCT");
        nodo.agregarHijo(new NodoAST(this.id));
        let nodoAtributos = new NodoAST("ATRIBUTOS");
        for (let attr of this.atributos) {
            let nAttr = new NodoAST("ATRIBUTO");
            nAttr.agregarHijo(new NodoAST(attr.id));
            nAttr.agregarHijo(new NodoAST(attr.tipo.getTipo().toString()));
            nodoAtributos.agregarHijo(nAttr);
        }
        nodo.agregarHijo(nodoAtributos);
        return nodo;
    }
}
