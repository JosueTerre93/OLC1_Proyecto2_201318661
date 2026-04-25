import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class Append extends Instruccion {
    private slice: Instruccion;
    private valores: Instruccion[];

    constructor(slice: Instruccion, valores: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.slice = slice;
        this.valores = valores;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let resSlice = this.slice.interpretar(arbol, tabla);
        if (resSlice && resSlice.isError) return resSlice;

        if (this.slice.tipoDato.getTipo() !== tipoDato.SLICE) {
            return new Errores("Semantico", "El primer argumento de append debe ser un slice", this.linea, this.columna);
        }

        // Crear una copia del slice original (Go append retorna un nuevo slice conceptualmente)
        // En JS, si queremos ser fieles a "retornando un nuevo slice", hacemos copia.
        let nuevoSlice = resSlice ? [...resSlice] : [];
        
        let tipoBase = this.slice.tipoDato.getTipoElemento();
        if (!tipoBase) return new Errores("Semantico", "Tipo de elemento de slice no definido", this.linea, this.columna);

        for (let exp of this.valores) {
            let val = exp.interpretar(arbol, tabla);
            if (val && val.isError) return val;

            if (exp.tipoDato.getTipo() !== tipoBase.getTipo()) {
                // Permitir casting de int a float
                if (tipoBase.getTipo() === tipoDato.DECIMAL && exp.tipoDato.getTipo() === tipoDato.ENTERO) {
                    val = parseFloat(val);
                } else {
                    return new Errores("Semantico", `Tipo de dato incompatible en append. Se esperaba ${tipoBase.getTipo()} y se recibio ${exp.tipoDato.getTipo()}`, this.linea, this.columna);
                }
            }
            nuevoSlice.push(val);
        }

        // El tipo de retorno es el mismo que el del slice original
        this.tipoDato = this.slice.tipoDato;

        return nuevoSlice;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("APPEND");
        nodo.agregarHijo(this.slice.getNodo());
        for (let v of this.valores) {
            nodo.agregarHijo(v.getNodo());
        }
        return nodo;
    }
}
