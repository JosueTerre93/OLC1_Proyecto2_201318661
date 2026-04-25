import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo,{tipoDato} from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";


export default class Relacionales extends Instruccion{

    private operador1:Instruccion
    private operador2:Instruccion
    private Operacion:Op_relacionales

    constructor(operacion:Op_relacionales,linea:number, columna:number,op1:Instruccion,op2:Instruccion){
        super(new Tipo(tipoDato.BOOLEAN), linea,columna)
        this.Operacion=operacion
        this.operador1=op1
        this.operador2=op2
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let opIzq = this.operador1.interpretar(arbol, tabla);
        if (opIzq && opIzq.isError) return opIzq;

        let opDer = this.operador2.interpretar(arbol, tabla);
        if (opDer && opDer.isError) return opDer;

        let tipo1 = this.operador1.tipoDato.getTipo();
        let tipo2 = this.operador2.tipoDato.getTipo();

        switch (this.Operacion) {
            case Op_relacionales.IGUALDAD:
                return this.comparar(opIzq, opDer, tipo1, tipo2, (a, b) => a == b);
            case Op_relacionales.DIFERENCIA:
                return this.comparar(opIzq, opDer, tipo1, tipo2, (a, b) => a != b);
            case Op_relacionales.MENOR:
                return this.compararOrden(opIzq, opDer, tipo1, tipo2, (a, b) => a < b);
            case Op_relacionales.MENOR_IGUAL:
                return this.compararOrden(opIzq, opDer, tipo1, tipo2, (a, b) => a <= b);
            case Op_relacionales.MAYOR:
                return this.compararOrden(opIzq, opDer, tipo1, tipo2, (a, b) => a > b);
            case Op_relacionales.MAYOR_IGUAL:
                return this.compararOrden(opIzq, opDer, tipo1, tipo2, (a, b) => a >= b);
            default:
                return new Errores("Semantico", "Operador relacional no reconocido", this.linea, this.columna);
        }
    }

    comparar(op1: any, op2: any, t1: tipoDato, t2: tipoDato, func: (a: any, b: any) => boolean) {
        if ((t1 === tipoDato.ENTERO || t1 === tipoDato.DECIMAL || t1 === tipoDato.RUNE) && 
            (t2 === tipoDato.ENTERO || t2 === tipoDato.DECIMAL || t2 === tipoDato.RUNE)) {
            return func(parseFloat(op1), parseFloat(op2));
        }
        
        // Manejo de comparacion con NIL
        if (t1 === tipoDato.NULO || t2 === tipoDato.NULO) {
            if (t1 === tipoDato.NULO && t2 === tipoDato.NULO) return func(null, null);
            if (t1 === tipoDato.NULO) {
                if (t2 === tipoDato.SLICE || t2 === tipoDato.STRUCT) return func(null, op2);
            } else {
                if (t1 === tipoDato.SLICE || t1 === tipoDato.STRUCT) return func(op1, null);
            }
        }

        if (t1 === t2) {
            if (t1 === tipoDato.BOOLEAN || t1 === tipoDato.CADENA || t1 === tipoDato.RUNE || t1 === tipoDato.SLICE || t1 === tipoDato.STRUCT) {
                return func(op1, op2);
            }
        }
        return new Errores("semantico", `No se pueden comparar los tipos ${tipoDato[t1]} y ${tipoDato[t2]}`, this.linea, this.columna);
    }

    compararOrden(op1: any, op2: any, t1: tipoDato, t2: tipoDato, func: (a: any, b: any) => boolean) {
        if ((t1 === tipoDato.ENTERO || t1 === tipoDato.DECIMAL || t1 === tipoDato.RUNE) && 
            (t2 === tipoDato.ENTERO || t2 === tipoDato.DECIMAL || t2 === tipoDato.RUNE)) {
            return func(parseFloat(op1), parseFloat(op2));
        }
        if (t1 === tipoDato.CADENA && t2 === tipoDato.CADENA) {
            return func(op1, op2);
        }
        return new Errores("semantico", `La comparacion de orden no es valida para los tipos ${tipoDato[t1]} y ${tipoDato[t2]}`, this.linea, this.columna);
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("RELACIONAL");
        nodo.agregarHijo(this.operador1.getNodo());
        nodo.agregarHijo(new NodoAST(Op_relacionales[this.Operacion]));
        nodo.agregarHijo(this.operador2.getNodo());
        return nodo;
    }
}

export enum Op_relacionales{
    IGUALDAD,
    DIFERENCIA,
    MENOR,
    MENOR_IGUAL,
    MAYOR,
    MAYOR_IGUAL
}