import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class TypeOf extends Instruccion {
    private expresion: Instruccion;

    constructor(exp: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.CADENA), linea, columna);
        this.expresion = exp;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let val = this.expresion.interpretar(arbol, tabla);
        if (val instanceof Errores) return val;

        this.tipoDato = new Tipo(tipoDato.CADENA);
        let tipo = this.expresion.tipoDato;
        return this.getTipoString(tipo);
    }

    private getTipoString(tipo: Tipo): string {
        switch (tipo.getTipo()) {
            case tipoDato.ENTERO:
                return "int";
            case tipoDato.DECIMAL:
                return "float64";
            case tipoDato.BOOLEAN:
                return "bool";
            case tipoDato.CADENA:
                return "string";
            case tipoDato.RUNE:
                return "char";
            case tipoDato.STRUCT:
                return tipo.getIdStruct() || "struct";
            case tipoDato.SLICE:
                return "[]" + this.getTipoString(tipo.getTipoElemento()!);
            default:
                return "unknown";
        }
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("REFLECT_TYPEOF");
        nodo.agregarHijo(new NodoAST("reflect.TypeOf"));
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }
}
