import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import Arbol from '../../controller/analizador/simbolo/Arbol';
import TablaSimbolo from '../../controller/analizador/simbolo/TablaSimbolo';
import { tipoDato } from '../../controller/analizador/simbolo/Tipo';

declare var require: any;

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

  codeEditorContent: string = ``;
  consoleOutput: string = '';

  // Fake symbol table data
  symbolTable: any[] = [];
  reporteTablaSimbolos: any[] = [];
  errorTable: any[] = [];
  astImageUrl: any = '';
  activeTab: string = 'console';

  get lineNumbers(): number[] {
    const lines = this.codeEditorContent.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1);
  }

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
  }

  syncScroll(event: any) {
    const lineNumbers = document.querySelector('.line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = event.target.scrollTop;
    }
  }

  runCode() {
    this.consoleOutput = "Compilando y ejecutando....... \n";
    
    // Limpiar reportes previos
    this.symbolTable = [];
    this.reporteTablaSimbolos = [];
    this.errorTable = [];
    this.astImageUrl = '';
    this.consoleOutput = 'Compilando y ejecutando....... \n';

    try {
      let parser = require('../../controller/analizador/analizador.js');
      let result = parser.parse(this.codeEditorContent);
      
      let ast = new Arbol(result.ast);
      let tabla = ast.getTablaGlobal();

      // Unificar errores de Jison (Léxicos/Sintácticos)
      if (result.errores && result.errores.length > 0) {
        for (let err of result.errores) {
          ast.getErrores().push(err);
        }
      }

      ast.setConsola("");

      // 0. Registro de Structs
      for (let i of ast.getInstrucciones()) {
          if (i && (i as any).isDefinicionStruct) {
              let res = i.interpretar(ast, tabla);
              if (res && res.isError) ast.getErrores().push(res);
          }
      }

      // 1. Registro de Funciones
      for (let i of ast.getInstrucciones()) {
          if (i && (i as any).isFuncion) {
              let res = i.interpretar(ast, tabla);
              if (res && res.isError) ast.getErrores().push(res);
          }
      }

      // 2. Ejecución de Globales
      for (let i of ast.getInstrucciones()) {
          if (!i || (i as any).isFuncion || (i as any).isDefinicionStruct || (i as any).isLlamada) {
              continue;
          }
          let resultado = i.interpretar(ast, tabla);
          if (resultado && resultado.isError) {
              ast.getErrores().push(resultado);
          }
      }

      // 3. Punto de entrada main()
      let mainFunc = ast.getFuncion("main");
      if (mainFunc) {
          let LlamadaClass = require('../../controller/analizador/instrucciones/Llamada').default;
          let req = new LlamadaClass("main", [], 0, 0);
          let res = req.interpretar(ast, tabla);
          if (res && res.isError) ast.getErrores().push(res);
      } else {
          // Si no hay main(), quizás el usuario está ejecutando instrucciones sueltas o una llamada directa al final
          for (let req of ast.getInstrucciones()) {
              if (req && (req as any).isLlamada) {
                  let res = req.interpretar(ast, tabla);
                  if (res && res.isError) ast.getErrores().push(res);
              }
          }
      }

      this.consoleOutput += "\n" + ast.getConsola();

      // Actualizar reportes finales
      this.reporteTablaSimbolos = ast.getReporteTablaSimbolos();
      this.errorTable = ast.getErrores();
      
      // Generar AST
      let astDot = ast.getASTGrafo();
      
      // Para AST muy grandes, el URL supera el limite de caracteres de una peticion GET.
      // Usamos POST para asegurar que se genere sin importar el tamaño.
      fetch('https://quickchart.io/graphviz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ graph: astDot })
      })
      .then(response => response.blob())
      .then(blob => {
        let objectUrl = URL.createObjectURL(blob);
        this.astImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
      .catch(error => {
        console.error("Error al generar la imagen del AST:", error);
        this.consoleOutput += "\n[WARNING] No se pudo generar la imagen del AST debido a un error de red.";
      });
    } catch (e: any) {
      console.log(e);
      this.consoleOutput += "\nERROR CRÍTICO EN COMPILACIÓN:\n" + e.message;
      this.errorTable.push({ tipo: 'Crítico', descripcion: e.message, linea: 0, columna: 0 });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.codeEditorContent = e.target.result;
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  }
}
