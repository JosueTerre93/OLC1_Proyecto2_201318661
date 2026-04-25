import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";



//E+E
//E-E
//E*E

export default class Aritmeticas extends Instruccion{
        private operando1: Instruccion|undefined
        private operando2: Instruccion|undefined

        private operador: OperadoresAritmeticos
        private operadorUnico:Instruccion|undefined

        constructor(operador:OperadoresAritmeticos, linea:number, columna:number, operando1: Instruccion, operando2?:Instruccion){
            super(new Tipo(tipoDato.ENTERO), linea, columna)

            this.operador=operador
            if (!operando2)this.operadorUnico=operando1
            else{
                this.operando1=operando1
                this.operando2=operando2
            }
            

        }
        interpretar(arbol: Arbol, tabla: TablaSimbolo) {

            let opIzq, opDer, Unico=null

            if (this.operadorUnico !=null){
                Unico=this.operadorUnico.interpretar(arbol,tabla)

            }else{

            opIzq=this.operando1?.interpretar(arbol,tabla)
            if(opIzq && opIzq.isError) return opIzq
            opDer=this.operando2?.interpretar(arbol,tabla)
            if(opDer && opDer.isError) return opDer

            switch (this.operador){
                case OperadoresAritmeticos.SUMA:
                    return this.suma(opIzq,opDer)
                case OperadoresAritmeticos.RESTA:
                    return this.resta(opIzq,opDer)
                case OperadoresAritmeticos.MULT:
                    return this.multiplicacion(opIzq, opDer)
                case OperadoresAritmeticos.DIV:
                    return this.division(opIzq, opDer)
                case OperadoresAritmeticos.MOD:
                    return this.modulo(opIzq, opDer)
                case OperadoresAritmeticos.NEG:
                    return this.negacion(Unico)
                
            }

        }
        }

        suma(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            // Función auxiliar para obtener el valor numérico de booleanos y runes
            const getVal = (v: any, t: any) => {
                if (t === tipoDato.BOOLEAN) return v ? 1 : 0;
                if (t === tipoDato.RUNE) return parseInt(v);
                if (t === tipoDato.ENTERO) return parseInt(v);
                if (t === tipoDato.DECIMAL) return parseFloat(v);
                return v;
            }

            // Caso STRING (Cualquier cosa con String es String)
            if (tipo1 === tipoDato.CADENA || tipo2 === tipoDato.CADENA) {
                this.tipoDato.setTipo(tipoDato.CADENA);
                let val1 = tipo1 === tipoDato.RUNE ? String.fromCharCode(op1) : op1.toString();
                let val2 = tipo2 === tipoDato.RUNE ? String.fromCharCode(op2) : op2.toString();
                return val1 + val2;
            }

            // Caso ENTERO
            if (tipo1 === tipoDato.ENTERO) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) + getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) + parseFloat(op2);
                }
            } 
            // Caso DECIMAL
            else if (tipo1 === tipoDato.DECIMAL) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.DECIMAL || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) + parseFloat(getVal(op2, tipo2));
                }
            } 
            // Caso BOOLEAN
            else if (tipo1 === tipoDato.BOOLEAN) {
                if (tipo2 === tipoDato.BOOLEAN) {
                    this.tipoDato.setTipo(tipoDato.BOOLEAN);
                    return op1 || op2; // true + false = true
                } else if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return (op1 ? 1 : 0) + getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return (op1 ? 1 : 0) + parseFloat(op2);
                }
            } 
            // Caso RUNE
            else if (tipo1 === tipoDato.RUNE) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) + getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseInt(op1) + parseFloat(op2);
                }
            }

            return new Errores("Semantico", "Suma entre tipos no permitida", this.linea, this.columna);
        }
        resta(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            // Función auxiliar para obtener el valor numérico
            const getVal = (v: any, t: any) => {
                if (t === tipoDato.BOOLEAN) return v ? 1 : 0;
                if (t === tipoDato.RUNE) return parseInt(v);
                if (t === tipoDato.ENTERO) return parseInt(v);
                if (t === tipoDato.DECIMAL) return parseFloat(v);
                return v;
            }

            // Caso STRING (Error en resta)
            if (tipo1 === tipoDato.CADENA || tipo2 === tipoDato.CADENA) {
                return new Errores("Semantico", "No se permite restar cadenas", this.linea, this.columna);
            }

            // Caso ENTERO
            if (tipo1 === tipoDato.ENTERO) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) - getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) - parseFloat(op2);
                }
            } 
            // Caso DECIMAL
            else if (tipo1 === tipoDato.DECIMAL) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.DECIMAL || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) - parseFloat(getVal(op2, tipo2));
                }
            } 
            // Caso BOOLEAN
            else if (tipo1 === tipoDato.BOOLEAN) {
                if (tipo2 === tipoDato.BOOLEAN) {
                    this.tipoDato.setTipo(tipoDato.BOOLEAN);
                    return op1 && !op2; // true - false = true, true - true = false
                } else if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return (op1 ? 1 : 0) - getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return (op1 ? 1 : 0) - parseFloat(op2);
                }
            } 
            // Caso RUNE
            else if (tipo1 === tipoDato.RUNE) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) - getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseInt(op1) - parseFloat(op2);
                }
            }

            return new Errores("Semantico", "Resta entre tipos no permitida", this.linea, this.columna);
        }    

        multiplicacion(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            // Función auxiliar para obtener el valor numérico
            const getVal = (v: any, t: any) => {
                if (t === tipoDato.BOOLEAN) return v ? 1 : 0;
                if (t === tipoDato.RUNE) return parseInt(v);
                if (t === tipoDato.ENTERO) return parseInt(v);
                if (t === tipoDato.DECIMAL) return parseFloat(v);
                return v;
            }

            // Caso STRING (Solo int * string es permitido según la tabla)
            if (tipo1 === tipoDato.ENTERO && tipo2 === tipoDato.CADENA) {
                this.tipoDato.setTipo(tipoDato.CADENA);
                return op2.toString().repeat(Math.max(0, parseInt(op1)));
            }
            if (tipo1 === tipoDato.CADENA || tipo2 === tipoDato.CADENA) {
                return new Errores("Semantico", "Multiplicacion con cadenas solo permitida para int * string", this.linea, this.columna);
            }

            // Caso ENTERO
            if (tipo1 === tipoDato.ENTERO) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) * getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) * parseFloat(op2);
                }
            } 
            // Caso DECIMAL
            else if (tipo1 === tipoDato.DECIMAL) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.DECIMAL || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseFloat(op1) * parseFloat(getVal(op2, tipo2));
                }
            } 
            // Caso BOOLEAN
            else if (tipo1 === tipoDato.BOOLEAN) {
                if (tipo2 === tipoDato.BOOLEAN) {
                    this.tipoDato.setTipo(tipoDato.BOOLEAN);
                    return op1 && op2; // true * false = false
                } else if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return (op1 ? 1 : 0) * getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return (op1 ? 1 : 0) * parseFloat(op2);
                }
            } 
            // Caso RUNE
            else if (tipo1 === tipoDato.RUNE) {
                if (tipo2 === tipoDato.ENTERO || tipo2 === tipoDato.BOOLEAN || tipo2 === tipoDato.RUNE) {
                    this.tipoDato.setTipo(tipoDato.ENTERO);
                    return parseInt(op1) * getVal(op2, tipo2);
                } else if (tipo2 === tipoDato.DECIMAL) {
                    this.tipoDato.setTipo(tipoDato.DECIMAL);
                    return parseInt(op1) * parseFloat(op2);
                }
            }

            return new Errores("Semantico", "Multiplicacion entre tipos no permitida", this.linea, this.columna);
        }

        division(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            if (parseFloat(op2) === 0) return new Errores("Semantico", "Division entre cero", this.linea, this.columna)

            // Caso ENTERO / ENTERO
            if (tipo1 === tipoDato.ENTERO && tipo2 === tipoDato.ENTERO) {
                this.tipoDato.setTipo(tipoDato.ENTERO)
                return Math.floor(parseInt(op1) / parseInt(op2))
            } 
            // Casos con DECIMAL
            else if (tipo1 === tipoDato.ENTERO && tipo2 === tipoDato.DECIMAL) {
                this.tipoDato.setTipo(tipoDato.DECIMAL)
                return parseInt(op1) / parseFloat(op2)
            }
            else if (tipo1 === tipoDato.DECIMAL && tipo2 === tipoDato.DECIMAL) {
                this.tipoDato.setTipo(tipoDato.DECIMAL)
                return parseFloat(op1) / parseFloat(op2)
            }
            else if (tipo1 === tipoDato.DECIMAL && tipo2 === tipoDato.ENTERO) {
                this.tipoDato.setTipo(tipoDato.DECIMAL)
                return parseFloat(op1) / parseInt(op2)
            }

            return new Errores("Semantico", "Division entre tipos no permitida", this.linea, this.columna)
        }

        modulo(op1:any, op2:any){
            let tipo1 = this.operando1?.tipoDato.getTipo()
            let tipo2 = this.operando2?.tipoDato.getTipo()

            if (tipo1 === tipoDato.ENTERO && tipo2 === tipoDato.ENTERO) {
                this.tipoDato.setTipo(tipoDato.ENTERO)
                return parseInt(op1) % parseInt(op2)
            }
            return new Errores("Semantico", "Modulo solo permitido entre enteros", this.linea, this.columna)
        }
    negacion(op1: any) {
        let opU = this.operadorUnico?.tipoDato.getTipo()
        switch (opU) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO)
                return parseInt(op1) * -1
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.DECIMAL)
                return parseFloat(op1) * -1
            default:
                return new Errores("Semantico", "Negacion Unaria invalida", this.linea, this.columna)
        }
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("ARITMETICA");
        if (this.operadorUnico != null) {
            nodo.agregarHijo(new NodoAST(OperadoresAritmeticos[this.operador]));
            nodo.agregarHijo(this.operadorUnico.getNodo());
        } else {
            nodo.agregarHijo(this.operando1!.getNodo());
            nodo.agregarHijo(new NodoAST(OperadoresAritmeticos[this.operador]));
            nodo.agregarHijo(this.operando2!.getNodo());
        }
        return nodo;
    }
}
export enum OperadoresAritmeticos{
    SUMA,
    RESTA,
    MULT,
    DIV,
    MOD,
    NEG
}