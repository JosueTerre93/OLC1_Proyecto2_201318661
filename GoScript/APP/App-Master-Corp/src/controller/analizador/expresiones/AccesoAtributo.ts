import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class AccesoAtributo extends Instruccion {
    public target: Instruccion;
    public idAtributo: string;
    public readonly isAccesoAtributo = true;

    constructor(target: Instruccion, idAtributo: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.target = target;
        this.idAtributo = idAtributo;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let obj = this.target.interpretar(arbol, tabla);
        if (obj instanceof Errores) return obj;

        if (this.target.tipoDato.getTipo() !== tipoDato.STRUCT) {
            return new Errores("Semantico", "El acceso por '.' solo es valido en structs", this.linea, this.columna);
        }

        // Obtener la definición del struct para saber el tipo del atributo
        let idStruct = this.target.tipoDato.getIdStruct();
        if (!idStruct) return new Errores("Semantico", "No se pudo determinar el tipo de struct", this.linea, this.columna);

        let def = arbol.getStruct(idStruct);
        if (!def) return new Errores("Semantico", `Definicion de struct '${idStruct}' no encontrada`, this.linea, this.columna);

        let attrDef = def.find((a: any) => a.id === this.idAtributo);
        if (!attrDef) {
            return new Errores("Semantico", `El atributo '${this.idAtributo}' no existe en el struct '${idStruct}'`, this.linea, this.columna);
        }

        this.tipoDato = attrDef.tipo;

        if (obj === null) {
            return new Errores("Semantico", "Acceso a atributo de un struct nulo", this.linea, this.columna);
        }

        return obj[this.idAtributo];
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("ACCESO_ATRIBUTO");
        nodo.agregarHijo(this.target.getNodo());
        nodo.agregarHijo(new NodoAST("."));
        nodo.agregarHijo(new NodoAST(this.idAtributo));
        return nodo;
    }
}
