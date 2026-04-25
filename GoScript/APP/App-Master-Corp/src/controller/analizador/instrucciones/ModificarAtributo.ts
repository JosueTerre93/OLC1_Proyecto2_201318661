import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/TablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import Errores from "../excepciones/Errores";
import NodoAST from "../simbolo/NodoAST";

export default class ModificarAtributo extends Instruccion {
    private target: Instruccion;
    private idAtributo: string;
    private valor: Instruccion;

    constructor(target: Instruccion, idAtributo: string, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoDato.VOID), linea, columna);
        this.target = target;
        this.idAtributo = idAtributo;
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // 1. Obtener el objeto (struct)
        let obj = this.target.interpretar(arbol, tabla);
        if (obj instanceof Errores) return obj;

        // 2. Validar que sea un STRUCT
        if (this.target.tipoDato.getTipo() !== tipoDato.STRUCT) {
            return new Errores("Semantico", "La modificación por '.' solo es válida en structs", this.linea, this.columna);
        }

        if (obj === null) {
            return new Errores("Semantico", "Intento de modificar atributo de un struct nulo", this.linea, this.columna);
        }

        // 3. Obtener la definición del struct para validar el atributo y su tipo
        let idStruct = this.target.tipoDato.getIdStruct();
        if (!idStruct) return new Errores("Semantico", "No se pudo determinar el tipo de struct", this.linea, this.columna);

        let def = arbol.getStruct(idStruct);
        if (!def) return new Errores("Semantico", `Definición de struct '${idStruct}' no encontrada`, this.linea, this.columna);

        let attrDef = def.find((a: any) => a.id === this.idAtributo);
        if (!attrDef) {
            return new Errores("Semantico", `El atributo '${this.idAtributo}' no existe en el struct '${idStruct}'`, this.linea, this.columna);
        }

        // 4. Interpretar el nuevo valor
        let nuevoVal = this.valor.interpretar(arbol, tabla);
        if (nuevoVal instanceof Errores) return nuevoVal;

        // 5. Validar compatibilidad de tipos
        if (this.valor.tipoDato.getTipo() !== attrDef.tipo.getTipo()) {
            // Permitir casting implícito de int a float64
            if (attrDef.tipo.getTipo() === tipoDato.DECIMAL && this.valor.tipoDato.getTipo() === tipoDato.ENTERO) {
                nuevoVal = parseFloat(nuevoVal);
            } else if (attrDef.tipo.getTipo() === tipoDato.STRUCT && this.valor.tipoDato.getTipo() === tipoDato.STRUCT) {
                // Si ambos son structs, validar que sean del mismo idStruct
                if (attrDef.tipo.getIdStruct() !== this.valor.tipoDato.getIdStruct()) {
                    return new Errores("Semantico", `Tipo de struct incompatible. Se esperaba '${attrDef.tipo.getIdStruct()}' pero se obtuvo '${this.valor.tipoDato.getIdStruct()}'`, this.linea, this.columna);
                }
            } else {
                return new Errores("Semantico", `Tipo incompatible para el atributo '${this.idAtributo}'. Se esperaba ${tipoDato[attrDef.tipo.getTipo()]} pero se obtuvo ${tipoDato[this.valor.tipoDato.getTipo()]}`, this.linea, this.columna);
            }
        }

        // 6. Actualizar el atributo
        obj[this.idAtributo] = nuevoVal;
        return null;
    }

    getNodo(): NodoAST {
        let nodo = new NodoAST("MODIFICAR_ATRIBUTO");
        nodo.agregarHijo(this.target.getNodo());
        nodo.agregarHijo(new NodoAST("."));
        nodo.agregarHijo(new NodoAST(this.idAtributo));
        nodo.agregarHijo(new NodoAST("="));
        nodo.agregarHijo(this.valor.getNodo());
        return nodo;
    }
}
