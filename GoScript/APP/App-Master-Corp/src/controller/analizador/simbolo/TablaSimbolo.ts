import Simbolo from "./Simbolo";


export default class TablaSimbolo{
    public tablaActual: Map<string,Simbolo>
    public nombreDato: string
    public anterior: TablaSimbolo | null;

    constructor(anterior?: TablaSimbolo){
        this.tablaActual= new Map<string,Simbolo>()
        this.nombreDato= anterior ? "Local" : "Global"
        this.anterior = anterior || null;
    }
    public getTabla(): Map<string, Simbolo> {
        return this.tablaActual;
    }
    public setTabla(tabla: Map<string, Simbolo>): void {
        this.tablaActual = tabla;
    }
    public getNombreDato(): string {
        return this.nombreDato;
    }
    public setNombreDato(nombreDato: string): void {
        this.nombreDato = nombreDato;
    }

    public setVariable(simbolo:Simbolo){
        if (this.tablaActual.has(simbolo.getId())) {
            return false;
        }
        this.tablaActual.set(simbolo.getId(), simbolo);
        return true;
    }

    public getVariable(id: string): Simbolo | null {
        let current: any = this;
        while (current != null) {
            // Intento 1: Acceso directo a tablaActual (Map)
            if (current.tablaActual && typeof current.tablaActual.has === 'function' && current.tablaActual.has(id)) {
                return current.tablaActual.get(id);
            }
            // Intento 2: Acceso vía getTabla()
            if (typeof current.getTabla === 'function') {
                let table = current.getTabla();
                if (table && typeof table.has === 'function' && table.has(id)) {
                    return table.get(id);
                }
            }
            
            // Subir al entorno anterior (Padre)
            let next: any = null;
            if (current.anterior) {
                next = current.anterior;
            } else if (typeof current.getAnterior === 'function') {
                next = current.getAnterior();
            }

            if (!next || next === current) break; // Seguridad contra ciclos
            current = next;
        }
        return null;
    }

    public getAnterior(): TablaSimbolo | null {
        return this.anterior;
    }
}