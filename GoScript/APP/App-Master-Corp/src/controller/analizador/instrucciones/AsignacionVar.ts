import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, {tipoDato} from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";


export default class AsignacionVar extends Instruccion{
    private id:string
    private expresion:Instruccion

    constructor(id:string,expresion:Instruccion, linea:number, columna:number ){
        super(new Tipo(tipoDato.VOID),linea,columna)
        this.id=id
        this.expresion=expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let varibale= tabla.getVariable(this.id)
        if (varibale == null){
            return new Errores("Semantico", "La variable no existe", this.linea, this.columna)
        }

        let newValor=this.expresion.interpretar(arbol,tabla)
        if (newValor && newValor.isError) return newValor

        if(this.expresion.tipoDato.getTipo() != varibale.getTipo().getTipo()){
            if (varibale.getTipo().getTipo() === tipoDato.DECIMAL && this.expresion.tipoDato.getTipo() === tipoDato.ENTERO) {
                newValor = parseFloat(newValor);
            } else if (this.expresion.tipoDato.getTipo() === tipoDato.NULO && (varibale.getTipo().getTipo() === tipoDato.SLICE || varibale.getTipo().getTipo() === tipoDato.STRUCT)) {
                // Permitir asignar nil a slices y structs
            } else {
                return new Errores("Semantico", `Los tipos deben ser iguales. Variable es ${tipoDato[varibale.getTipo().getTipo()]} pero se asigna ${tipoDato[this.expresion.tipoDato.getTipo()]}`, this.linea, this.columna)
            }
        }

        if (varibale.getTipo().getTipo() === tipoDato.STRUCT) {
            let idStruct = varibale.getTipo().getIdStruct();
            let def = arbol.getStruct(idStruct!);
            if (!def) return new Errores("Semantico", `Definicion de struct '${idStruct}' no encontrada`, this.linea, this.columna);
            if (typeof newValor === 'object' && newValor !== null && !Array.isArray(newValor)) {
                for (let attr of def) {
                    if (!(attr.id in newValor)) {
                        return new Errores("Semantico", `Falta el atributo '${attr.id}' para el struct '${idStruct}'`, this.linea, this.columna);
                    }
                }
            }
        }

        this.tipoDato=varibale.getTipo()
        varibale.setValor(newValor)
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("ASIGNACION");
        nodo.agregarHijo(new NodoAST(this.id));
        nodo.agregarHijo(new NodoAST("="));
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }

}