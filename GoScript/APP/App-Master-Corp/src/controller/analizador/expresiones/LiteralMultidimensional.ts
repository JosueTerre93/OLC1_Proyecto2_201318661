import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class LiteralMultidimensional extends Instruccion {
    private expresiones: Instruccion[];

    public readonly isLiteralMultidimensional = true;

    constructor(expresiones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.SLICE), linea, columna);
        this.expresiones = expresiones;
    }

    public setTipoEsperado(tipo: Tipo) {
        this.tipoDato = tipo;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valores = [];
        let tipoBase = this.tipoDato.getTipoElemento();

        if (!tipoBase) {
            return new Errores("Semantico", "Tipo base de matriz no definido", this.linea, this.columna);
        }

        for (let exp of this.expresiones) {
            if ((exp as any).isLiteralMultidimensional) {
                (exp as any).setTipoEsperado(tipoBase);
            }

            let res = exp.interpretar(arbol, tabla);
            if (res && res.isError) return res;

            if (!(exp as any).isLiteralMultidimensional) {
                if (exp.tipoDato.getTipo() !== tipoBase.getTipo()) {
                    if (tipoBase.getTipo() === tipoDato.DECIMAL && exp.tipoDato.getTipo() === tipoDato.ENTERO) {
                        res = parseFloat(res);
                    } else {
                        return new Errores("Semantico", `Tipo de dato incorrecto en matriz. Se esperaba ${tipoBase.getTipo()} y se recibio ${exp.tipoDato.getTipo()}`, this.linea, this.columna);
                    }
                }
            }
            valores.push(res);
        }

        return valores;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("LITERAL_MATRIZ");
        for (let exp of this.expresiones) {
            nodo.agregarHijo(exp.getNodo());
        }
        return nodo;
    }
}
