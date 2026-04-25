import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class SwitchCase extends Instruccion {
    public expresion: Instruccion;
    public instrucciones: Instruccion[];

    constructor(expresion: Instruccion, instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        // La ejecución real de las instrucciones del case es delegada al Switch
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("CASE");
        nodo.agregarHijo(this.expresion.getNodo());
        let bloque = new NodoAST("BLOQUE");
        for (let i of this.instrucciones) {
            bloque.agregarHijo(i.getNodo());
        }
        nodo.agregarHijo(bloque);
        return nodo;
    }
}
