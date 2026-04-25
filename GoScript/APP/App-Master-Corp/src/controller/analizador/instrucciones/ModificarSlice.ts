import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class ModificarSlice extends Instruccion {
    private target: Instruccion;
    private index: Instruccion;
    private valor: Instruccion;

    constructor(target: Instruccion, index: Instruccion, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.target = target;
        this.index = index;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let slice = this.target.interpretar(arbol, tabla);
        if (slice && slice.isError) return slice;

        if (this.target.tipoDato.getTipo() !== tipoDato.SLICE) {
            return new Errores("Semantico", "El destino de la asignación no es un slice", this.linea, this.columna);
        }

        if (!Array.isArray(slice)) {
            return new Errores("Semantico", "El valor no es un slice valido", this.linea, this.columna);
        }

        let resIndex = this.index.interpretar(arbol, tabla);
        if (resIndex && resIndex.isError) return resIndex;

        if (this.index.tipoDato.getTipo() !== tipoDato.ENTERO) {
            return new Errores("Semantico", "El indice debe ser un entero", this.linea, this.columna);
        }

        let index = parseInt(resIndex);
        if (index < 0) {
            return new Errores("Semantico", "El indice no puede ser negativo", this.linea, this.columna);
        }

        if (index >= slice.length) {
            return new Errores("Semantico", `Indice fuera de rango: ${index}. Tamaño del slice: ${slice.length}`, this.linea, this.columna);
        }

        let newVal = this.valor.interpretar(arbol, tabla);
        if (newVal && newVal.isError) return newVal;

        // Validar tipo de dato
        let tipoBase = this.target.tipoDato.getTipoElemento();
        if (tipoBase) {
            if (this.valor.tipoDato.getTipo() !== tipoBase.getTipo()) {
                // Permitir casting de int a float
                if (tipoBase.getTipo() === tipoDato.DECIMAL && this.valor.tipoDato.getTipo() === tipoDato.ENTERO) {
                    newVal = parseFloat(newVal);
                } else {
                    return new Errores("Semantico", `Tipo de dato incorrecto. Se esperaba ${tipoBase.getTipo()} y se recibio ${this.valor.tipoDato.getTipo()}`, this.linea, this.columna);
                }
            }
        }

        slice[index] = newVal;
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("MODIFICAR_SLICE");
        nodo.agregarHijo(this.target.getNodo());
        nodo.agregarHijo(this.index.getNodo());
        nodo.agregarHijo(this.valor.getNodo());
        return nodo;
    }
}
