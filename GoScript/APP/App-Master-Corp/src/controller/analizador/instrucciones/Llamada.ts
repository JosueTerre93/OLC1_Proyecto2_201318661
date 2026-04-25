import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import TablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Funcion from "./Funcion";
import Return from "./Return";
import Break from "./Break";
import Continue from "./Continue";
import NodoAST from "../simbolo/NodoAST";

export default class Llamada extends Instruccion {
    private id: string;
    private expresiones: Instruccion[];

    public readonly isLlamada = true;

    constructor(id: string, expresiones: Instruccion[], linea: number, columna: number) {
        // El tipo se verificará despues basado en la funcion enviada
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.expresiones = expresiones;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolo) {
        let funcion: Funcion | undefined = arbol.getFuncion(this.id) as Funcion;

        if (funcion == null) {
            return new Errores("Semantico", `La funcion ${this.id} no existe`, this.linea, this.columna);
        }

        if (this.expresiones.length !== funcion.parametros.length) {
            return new Errores("Semantico", `La funcion ${this.id} requiere ${funcion.parametros.length} parametros, pero se mandaron ${this.expresiones.length}`, this.linea, this.columna);
        }

        // Crear entorno global de la funcion (tiene que colgar del entorno global!)
        let nuevaTabla = new TablaSimbolo(arbol.getTablaGlobal());
        nuevaTabla.setNombreDato(this.id);

        // Procesar argumentos
        for (let i = 0; i < this.expresiones.length; i++) {
            let exp = this.expresiones[i].interpretar(arbol, tabla);
            if (exp instanceof Errores) return exp;

            let tipoArgumento = this.expresiones[i].tipoDato.getTipo();
            let tipoParametro = funcion.parametros[i].tipo.getTipo();

            let finalValue = exp;
            
            // Casting int a float si es necesario o validación de Structs
            if (tipoArgumento !== tipoParametro) {
                if (tipoArgumento === tipoDato.ENTERO && tipoParametro === tipoDato.DECIMAL) {
                    finalValue = parseFloat(exp);
                } else {
                    return new Errores("Semantico", `Tipo de parametro incorrecto en funcion ${this.id}. Se esperaba ${tipoDato[tipoParametro]} pero se recibio ${tipoDato[tipoArgumento]}`, this.linea, this.columna);
                }
            } else if (tipoParametro === tipoDato.STRUCT) {
                // Si ambos son structs, validar que sean del mismo idStruct
                let idParam = funcion.parametros[i].tipo.getIdStruct();
                let idArg = this.expresiones[i].tipoDato.getIdStruct();
                if (idParam !== idArg) {
                    return new Errores("Semantico", `Tipo de struct incompatible en funcion ${this.id}. Se esperaba '${idParam}' pero se recibio '${idArg}'`, this.linea, this.columna);
                }
            }

            nuevaTabla.setVariable(new Simbolo(funcion.parametros[i].tipo, funcion.parametros[i].id, finalValue));
        }

        // Ejecutar bloque
        for (let instruccion of funcion.instrucciones) {
            if (!instruccion) continue;
            let res = instruccion.interpretar(arbol, nuevaTabla);
            if (res instanceof Errores) return res;
            if (res instanceof Return) {
                // Comprobar return type match
                let reqType = funcion.tipoDato.getTipo();
                if (res.expresion) {
                    let retVal = res.expresion.interpretar(arbol, nuevaTabla);
                    if (retVal instanceof Errores) return retVal;

                    if (reqType !== res.expresion.tipoDato.getTipo()) {
                        if (reqType === tipoDato.DECIMAL && res.expresion.tipoDato.getTipo() === tipoDato.ENTERO) {
                            retVal = parseFloat(retVal);
                        } else {
                            return new Errores("Semantico", `La funcion ${this.id} debe retornar tipo ${tipoDato[reqType]} pero retorna ${tipoDato[res.expresion.tipoDato.getTipo()]}`, this.linea, this.columna);
                        }
                    } else if (reqType === tipoDato.STRUCT) {
                        // Validar idStruct en el return
                        let idReq = funcion.tipoDato.getIdStruct();
                        let idRet = res.expresion.tipoDato.getIdStruct();
                        if (idReq !== idRet) {
                            return new Errores("Semantico", `La funcion ${this.id} debe retornar struct '${idReq}' pero retorna '${idRet}'`, this.linea, this.columna);
                        }
                    }
                    this.tipoDato = funcion.tipoDato;
                    return retVal;
                } else {
                    if (reqType !== tipoDato.VOID) {
                        return new Errores("Semantico", `La funcion ${this.id} requiere un valor de retorno ${reqType}`, this.linea, this.columna);
                    }
                    return null;
                }
            }
            if (res instanceof Break) {
                return new Errores("Semantico", "La sentencia break solo se puede usar dentro de un bucle o switch", res.linea, res.columna);
            }
            if (res instanceof Continue) {
                return new Errores("Semantico", "La sentencia continue solo se puede usar dentro de un bucle", res.linea, res.columna);
            }
        }

        if (funcion.tipoDato.getTipo() !== tipoDato.VOID) {
            return new Errores("Semantico", `La funcion ${this.id} esperaba retornar param ${funcion.tipoDato.getTipo()} pero termino sin comando return`, this.linea, this.columna);
        }

        this.tipoDato = funcion.tipoDato;
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("LLAMADA");
        nodo.agregarHijo(new NodoAST(this.id));
        let params = new NodoAST("PARAMETROS_LLAMADA");
        for (let base of this.expresiones) {
            params.agregarHijo(base.getNodo());
        }
        nodo.agregarHijo(params);
        return nodo;
    }
}
