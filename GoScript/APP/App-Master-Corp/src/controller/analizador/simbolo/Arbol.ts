import TablaSimbolo from "./TablaSimbolo";
import {Instruccion} from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import NodoAST from "./NodoAST";

export default class Arbol {
    private instrucciones: Array<Instruccion>;
    private consola:string 
    private tablaGlobal: TablaSimbolo;
    private errores: Array<Errores>;
    private funciones: Map<string, Instruccion>;
    private structs: Map<string, any>;
    private reporteTablaSimbolos: any[];

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new TablaSimbolo();
        this.errores = new Array<Errores>();
        this.funciones = new Map<string, Instruccion>();
        this.structs = new Map<string, any>();
        this.reporteTablaSimbolos = [];
    }
    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones;
    }
    public getConsola(): string {
        return this.consola;
    }   
    public getTablaGlobal(): TablaSimbolo {
        return this.tablaGlobal;
    }
    public getErrores(): Array<Errores> {
        return this.errores;
    }
    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones;
    }
    public setConsola(consola: string): void {
        this.consola = consola;
    }
    public setTablaGlobal(tablaGlobal: TablaSimbolo): void {
        this.tablaGlobal = tablaGlobal;
    }
    public setErrores(errores: Array<Errores>): void {
        this.errores = errores;
    }
    public Print(entrada: any) {
        this.consola = `${this.consola}${entrada}\n`
    }

    public addFuncion(id: string, funcion: Instruccion) {
        this.funciones.set(id, funcion);
    }

    public getFuncion(id: string): Instruccion | undefined {
        return this.funciones.get(id);
    }

    public addStruct(id: string, struct: any) {
        this.structs.set(id, struct);
    }

    public getStruct(id: string): any | undefined {
        return this.structs.get(id);
    }
    
    public getReporteTablaSimbolos(): any[] {
        return this.reporteTablaSimbolos;
    }

    public addSimboloReporte(id: string, tipoEntidad: string, tipoDato: string, entorno: string, linea: number, columna: number) {
        this.reporteTablaSimbolos.push({ id, tipoEntidad, tipoDato, entorno, linea, columna });
    }

    public getASTGrafo(): string {
        let dot = "digraph AST {\n";
        dot += "node [shape=box, style=filled, color=lightblue, fontname=\"Helvetica,Arial,sans-serif\"];\n";
        dot += "edge [color=\"#4b6272\"];\n";
        
        let raiz = new NodoAST("INICIO");
        for (let i of this.instrucciones) {
            if (i) raiz.agregarHijo(i.getNodo());
        }

        let idCounter = 0;

        function traverse(nodo: NodoAST): number {
            let currentId = idCounter++;
            let label = nodo.getValor().replace(/\"/g, "\\\"").replace(/\n/g, "\\n");
            if (nodo.getLinea() !== null) {
                label += ":" + nodo.getLinea();
            }
            dot += `node${currentId} [label="${label}"];\n`;
            for (let child of nodo.getHijos()) {
                let childId = traverse(child);
                dot += `node${currentId} -> node${childId};\n`;
            }
            return currentId;
        }

        traverse(raiz);
        dot += "}";
        return dot;
    }

}