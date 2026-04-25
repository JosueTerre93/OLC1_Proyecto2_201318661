export default class NodoAST {
    private valor: string;
    private hijos: NodoAST[];
    private linea: number | null;

    constructor(valor: string, linea?: number) {
        this.valor = valor;
        this.hijos = [];
        this.linea = linea || null;
    }

    public getLinea(): number | null {
        return this.linea;
    }

    public getValor(): string {
        return this.valor;
    }

    public getHijos(): NodoAST[] {
        return this.hijos;
    }

    public agregarHijo(hijo: NodoAST) {
        this.hijos.push(hijo);
    }
    
    public agregarHijos(hijos: NodoAST[]) {
        for (let hijo of hijos) {
            this.hijos.push(hijo);
        }
    }
}
