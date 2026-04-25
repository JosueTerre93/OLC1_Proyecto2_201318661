export default class Tipo{
    private tipo:tipoDato
    private tipoElemento: Tipo | undefined;
    private idStruct: string | undefined;

    constructor(tipo:tipoDato, tipoElemento?: Tipo, idStruct?: string) {
        this.tipo = tipo;
        this.tipoElemento = tipoElemento;
        this.idStruct = idStruct;
    }

    public getTipo(): tipoDato {
        return this.tipo;
    }
    public setTipo(tipo: tipoDato): void {
        this.tipo = tipo;
    }

    public getTipoElemento(): Tipo | undefined {
        return this.tipoElemento;
    }

    public setTipoElemento(tipo: Tipo): void {
        this.tipoElemento = tipo;
    }

    public getIdStruct(): string | undefined {
        return this.idStruct;
    }

    public setIdStruct(id: string): void {
        this.idStruct = id;
    }

    public toString(): string {
        switch (this.tipo) {
            case tipoDato.ENTERO:
                return "int";
            case tipoDato.DECIMAL:
                return "float64";
            case tipoDato.BOOLEAN:
                return "bool";
            case tipoDato.RUNE:
                return "char";
            case tipoDato.CADENA:
                return "string";
            case tipoDato.SLICE:
                return "[]" + (this.tipoElemento ? this.tipoElemento.toString() : "any");
            case tipoDato.STRUCT:
                return this.idStruct || "struct";
            case tipoDato.VOID:
                return "void";
            default:
                return "any";
        }
    }

    public getDefaultValue(): any {
        switch (this.tipo) {
            case tipoDato.ENTERO:
                return 0;
            case tipoDato.DECIMAL:
                return 0.0;
            case tipoDato.BOOLEAN:
                return false;
            case tipoDato.RUNE:
                return 0;
            case tipoDato.CADENA:
                return "";
            case tipoDato.SLICE:
                return null;
            case tipoDato.STRUCT:
                return null; // El valor por defecto de un struct suele ser nulo o inicializado
            default:
                return null;
        }
    }
}

export enum tipoDato{
    ENTERO,
    DECIMAL,
    BOOLEAN,
    RUNE,
    CADENA,
    VOID,
    NULO,
    SLICE,
    STRUCT
}