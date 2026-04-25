import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import NodoAST from "../simbolo/NodoAST";

export default class Decremento extends Instruccion {
    private id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.id = id;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Buscar la variable
        let variable = tabla.getVariable(this.id);
        if (variable == null) {
            return new Errores("Semantico", `La variable '${this.id}' no existe`, this.linea, this.columna);
        }

        let tipoVariable = variable.getTipo().getTipo();
        if (tipoVariable !== tipoDato.ENTERO && tipoVariable !== tipoDato.DECIMAL) {
            return new Errores("Semantico", "La operacion -- solo es valida para variables de tipo ENTERO o DECIMAL", this.linea, this.columna);
        }

        // 2. Obtener el valor actual
        let valorActual = variable.getValor();
        let resultado;

        if (tipoVariable === tipoDato.ENTERO) {
            resultado = parseInt(valorActual) - 1;
        } else { // DECIMAL
            resultado = parseFloat(valorActual) - 1.0;
        }

        // 3. Actualizar el valor
        variable.setValor(resultado);
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("DECREMENTO");
        nodo.agregarHijo(new NodoAST(this.id));
        nodo.agregarHijo(new NodoAST("--"));
        return nodo;
    }
}
