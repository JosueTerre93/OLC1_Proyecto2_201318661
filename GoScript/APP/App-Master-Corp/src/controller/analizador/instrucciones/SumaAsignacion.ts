import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class SumaAsignacion extends Instruccion {
    private id: string;
    private expresion: Instruccion;

    constructor(id: string, expresion: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Buscar la variable
        let variable = tabla.getVariable(this.id);
        if (variable == null) {
            return new Errores("Semantico", `La variable '${this.id}' no existe`, this.linea, this.columna);
        }

        let tipoVariable = variable.getTipo().getTipo();
        if (tipoVariable !== tipoDato.ENTERO && tipoVariable !== tipoDato.DECIMAL && tipoVariable !== tipoDato.CADENA) {
            return new Errores("Semantico", "La operacion += solo es valida para variables numericas o de cadena", this.linea, this.columna);
        }

        // 2. Interpretar el valor a sumar
        let valorSumar = this.expresion.interpretar(arbol, tabla);
        if (valorSumar && valorSumar.isError) return valorSumar;

        // 3. Obtener el valor actual
        let valorActual = variable.getValor();
        let tipoExpresion = this.expresion.tipoDato.getTipo();

        // 4. Lógica de suma (siguiendo la matriz de Aritmeticas.ts)
        const getVal = (v: any, t: any) => {
            if (t === tipoDato.BOOLEAN) return v ? 1 : 0;
            if (t === tipoDato.RUNE) return parseInt(v);
            if (t === tipoDato.ENTERO) return parseInt(v);
            if (t === tipoDato.DECIMAL) return parseFloat(v);
            return v;
        }

        let resultado;
        let tipoResultado;

        if (tipoVariable === tipoDato.ENTERO) {
            if (tipoExpresion === tipoDato.ENTERO || tipoExpresion === tipoDato.BOOLEAN || tipoExpresion === tipoDato.RUNE) {
                resultado = parseInt(valorActual) + getVal(valorSumar, tipoExpresion);
                tipoResultado = tipoDato.ENTERO;
            } else if (tipoExpresion === tipoDato.DECIMAL) {
                return new Errores("Semantico", "No se puede asignar un resultado DECIMAL a una variable ENTERO", this.linea, this.columna);
            } else {
                return new Errores("Semantico", "Suma invalida para el operador +=", this.linea, this.columna);
            }
        } else if (tipoVariable === tipoDato.DECIMAL) {
            if (tipoExpresion === tipoDato.ENTERO || tipoExpresion === tipoDato.DECIMAL || tipoExpresion === tipoDato.BOOLEAN || tipoExpresion === tipoDato.RUNE) {
                resultado = parseFloat(valorActual) + parseFloat(getVal(valorSumar, tipoExpresion));
                tipoResultado = tipoDato.DECIMAL;
            } else {
                return new Errores("Semantico", "Suma invalida para el operador +=", this.linea, this.columna);
            }
        } else if (tipoVariable === tipoDato.CADENA) {
            resultado = valorActual.toString() + valorSumar.toString();
            tipoResultado = tipoDato.CADENA;
        }

        // 5. Actualizar el valor
        variable.setValor(resultado);
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("SUMA_ASIGNACION");
        nodo.agregarHijo(new NodoAST(this.id));
        nodo.agregarHijo(new NodoAST("+="));
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }
}
