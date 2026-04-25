import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo from "../simbolo/Tipo";
import Arbol from "../simbolo/Arbol";
import NodoAST from "../simbolo/NodoAST";

export abstract class Instruccion {

    public tipoDato:Tipo
    public linea:number
    public columna:number

    constructor(tipo:Tipo, linea:number, columna:number) {
        this.tipoDato = tipo;
        this.linea = linea;
        this.columna = columna;
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolo): any;
    abstract getNodo(): NodoAST;
}