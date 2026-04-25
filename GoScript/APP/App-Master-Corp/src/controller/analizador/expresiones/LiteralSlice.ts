import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

import LiteralMultidimensional from "./LiteralMultidimensional";

export default class LiteralSlice extends Instruccion {
    private expresiones: Instruccion[];

    public readonly isLiteralSlice = true;

    constructor(tipo: Tipo, expresiones: Instruccion[], linea: number, columna: number) {
        // El tipo de esta instrucción es SLICE de tipoElemento
        super(new Tipo(tipoDato.SLICE, tipo), linea, columna);
        this.expresiones = expresiones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valores = [];
        let tipoBase = this.tipoDato.getTipoElemento();

        if (!tipoBase) {
            return new Errores("Semantico", "Tipo base de slice no definido", this.linea, this.columna);
        }

        for (let exp of this.expresiones) {
            // Si el hijo es un literal multidimensional, propagar el tipo base
            if ((exp as any).isLiteralMultidimensional) {
                (exp as any).setTipoEsperado(tipoBase);
            }

            let res = exp.interpretar(arbol, tabla);
            if (res && res.isError) return res;

            // Validar tipos
            if (!(exp as any).isLiteralMultidimensional) {
                if (exp.tipoDato.getTipo() !== tipoBase.getTipo()) {
                    // Permitir casting de int a float
                    if (tipoBase.getTipo() === tipoDato.DECIMAL && exp.tipoDato.getTipo() === tipoDato.ENTERO) {
                        res = parseFloat(res);
                    } else {
                        return new Errores("Semantico", `Tipo de dato incorrecto en literal de slice. Se esperaba ${tipoBase.getTipo()} y se recibio ${exp.tipoDato.getTipo()}`, this.linea, this.columna);
                    }
                }
            }
            valores.push(res);
        }

        return valores;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("LITERAL_SLICE");
        let tipoNode = new NodoAST("TIPO");
        tipoNode.agregarHijo(new NodoAST(tipoDato[this.tipoDato.getTipoElemento()?.getTipo() || tipoDato.VOID]));
        nodo.agregarHijo(tipoNode);
        
        let valsNode = new NodoAST("VALORES");
        for (let exp of this.expresiones) {
            valsNode.agregarHijo(exp.getNodo());
        }
        nodo.agregarHijo(valsNode);
        return nodo;
    }
}
