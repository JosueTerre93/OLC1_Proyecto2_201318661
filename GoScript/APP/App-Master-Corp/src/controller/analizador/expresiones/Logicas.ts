import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Logicas extends Instruccion {
    private operando1: Instruccion | undefined;
    private operando2: Instruccion | undefined;
    private operador: operadoresLogicos;
    private operandoUnico: Instruccion | undefined;

    constructor(operador: operadoresLogicos, linea: number, columna: number, operando1: Instruccion, operando2?: Instruccion) {
        super(new Tipo(tipoDato.BOOLEAN), linea, columna);
        this.operador = operador;
        if (!operando2) {
            this.operandoUnico = operando1;
        } else {
            this.operando1 = operando1;
            this.operando2 = operando2;
        }
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let opIzq = null;
        let opDer = null;
        let opU = null;

        if (this.operandoUnico != null) {
            opU = this.operandoUnico.interpretar(arbol, tabla);
            if (opU instanceof Errores) return opU;
        } else {
            opIzq = this.operando1?.interpretar(arbol, tabla);
            if (opIzq instanceof Errores) return opIzq;
            opDer = this.operando2?.interpretar(arbol, tabla);
            if (opDer instanceof Errores) return opDer;
        }

        switch (this.operador) {
            case operadoresLogicos.AND:
                return this.and(opIzq, opDer);
            case operadoresLogicos.OR:
                return this.or(opIzq, opDer);
            case operadoresLogicos.NOT:
                return this.not(opU);
            default:
                return new Errores("Semantico", "Operador logico no reconocido", this.linea, this.columna);
        }
    }

    and(op1: any, op2: any) {
        if (this.operando1?.tipoDato.getTipo() === tipoDato.BOOLEAN && this.operando2?.tipoDato.getTipo() === tipoDato.BOOLEAN) {
            return op1 && op2;
        }
        return new Errores("Semantico", "Operacion AND solo valida entre booleanos", this.linea, this.columna);
    }

    or(op1: any, op2: any) {
        if (this.operando1?.tipoDato.getTipo() === tipoDato.BOOLEAN && this.operando2?.tipoDato.getTipo() === tipoDato.BOOLEAN) {
            return op1 || op2;
        }
        return new Errores("Semantico", "Operacion OR solo valida entre booleanos", this.linea, this.columna);
    }

    not(op: any) {
        if (this.operandoUnico?.tipoDato.getTipo() === tipoDato.BOOLEAN) {
            return !op;
        }
        return new Errores("Semantico", "Operacion NOT solo valida para booleanos", this.linea, this.columna);
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("LOGICA");
        if (this.operandoUnico != null) {
            nodo.agregarHijo(new NodoAST(operadoresLogicos[this.operador]));
            nodo.agregarHijo(this.operandoUnico.getNodo());
        } else {
            nodo.agregarHijo(this.operando1!.getNodo());
            nodo.agregarHijo(new NodoAST(operadoresLogicos[this.operador]));
            nodo.agregarHijo(this.operando2!.getNodo());
        }
        return nodo;
    }
}

export enum operadoresLogicos {
    AND,
    OR,
    NOT
}
