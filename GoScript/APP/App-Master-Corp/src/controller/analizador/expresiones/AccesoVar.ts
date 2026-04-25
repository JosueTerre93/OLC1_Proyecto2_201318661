import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import  Tipo, {tipoDato}  from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class AccesoVar extends Instruccion{
    public id:string;
    public readonly isAccesoVar = true;

    constructor(id:string,linea:number,columna:number){

        super(new Tipo(tipoDato.VOID),linea,columna)
        this.id=id
    }
        

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let valor=tabla.getVariable(this.id)

        if(valor==null){
            return new Errores("Semantico","No se puede acceder al valor de esta variable",this.linea,this.columna)
        }

        this.tipoDato=valor.getTipo()

        return valor.getValor()
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("ACCESO_VAR");
        nodo.agregarHijo(new NodoAST(this.id.toString()));
        return nodo;
    }

}