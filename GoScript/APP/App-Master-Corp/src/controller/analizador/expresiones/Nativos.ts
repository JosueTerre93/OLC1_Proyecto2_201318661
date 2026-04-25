import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, {tipoDato} from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";


export default class Nativo extends Instruccion {

    valor:any

    constructor (tipo:Tipo, valor:any, linea:number, columna:number){
        super(tipo,linea,columna)
        if (tipo.getTipo() === tipoDato.ENTERO) {
            this.valor = parseInt(valor);
        } else if (tipo.getTipo() === tipoDato.DECIMAL) {
            this.valor = parseFloat(valor);
        } else {
            this.valor=valor;
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("NATIVO");
        nodo.agregarHijo(new NodoAST(this.valor == null ? "nil" : this.valor.toString()));
        return nodo;
    }
}
