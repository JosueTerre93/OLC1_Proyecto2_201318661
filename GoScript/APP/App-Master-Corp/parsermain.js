var analizador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,20],$V1=[1,5],$V2=[1,19],$V3=[1,23],$V4=[1,22],$V5=[1,21],$V6=[1,24],$V7=[1,25],$V8=[1,26],$V9=[1,29],$Va=[1,30],$Vb=[1,27],$Vc=[1,28],$Vd=[1,34],$Ve=[2,5,7,21,22,23,24,30,34,36,37,38,43,45,46,50,51],$Vf=[1,37],$Vg=[1,39],$Vh=[1,38],$Vi=[1,40],$Vj=[1,53],$Vk=[1,43],$Vl=[1,44],$Vm=[1,45],$Vn=[1,46],$Vo=[1,47],$Vp=[1,48],$Vq=[1,49],$Vr=[1,50],$Vs=[1,51],$Vt=[33,41],$Vu=[2,45],$Vv=[1,69],$Vw=[1,70],$Vx=[1,71],$Vy=[1,72],$Vz=[1,73],$VA=[1,75],$VB=[1,76],$VC=[1,77],$VD=[1,78],$VE=[1,79],$VF=[1,80],$VG=[1,81],$VH=[2,5,7,21,22,23,24,30,33,34,36,37,38,41,43,45,46,50,51,52,53,61,62,63,64,65],$VI=[2,71],$VJ=[2,72],$VK=[1,89],$VL=[21,26,33,41],$VM=[1,104],$VN=[1,107],$VO=[2,5,7,21,22,23,24,30,33,34,36,37,38,41,43,45,46,50,51,61,62,63,64,65],$VP=[22,50],$VQ=[22,51];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INICIO":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"PUNTO_COMA":7,"INS_IMPRIMIR":8,"ASIGNAR":9,"DECLARACION":10,"INS_IF":11,"SUMA_ASIG":12,"DEC_CORTA":13,"INS_FOR":14,"INS_BREAK":15,"INS_CONTINUE":16,"INS_SWITCH":17,"INS_FUNCION":18,"INS_RETURN":19,"INS_LLAMADA_INST":20,"LLAVE_ABRE":21,"LLAVE_CIERRA":22,"VAR":23,"ID":24,"TIPO":25,"IGUAL":26,"EXPRESION":27,"DOS_PUNTOS_IGUAL":28,"MAS_IGUAL":29,"IMPRIMIR":30,"PAR_ABRE":31,"ARGUMENTOS":32,"PAR_CIERRA":33,"IF":34,"ELSE":35,"FOR":36,"RBREAK":37,"FUNC":38,"PARAMETROS":39,"TIPO_RETORNO":40,"COMA":41,"PARAMETRO":42,"RETURN":43,"LLAMADA_EXPR":44,"CONTINUE":45,"SWITCH":46,"CASOS":47,"DEFAULT":48,"CASO":49,"CASE":50,"DOS_PUNTOS":51,"MAS":52,"MENOS":53,"ENTERO":54,"DECIMAL":55,"CADENA":56,"L_RUNE":57,"NIL":58,"RTRUE":59,"RFALSE":60,"IGUAL_IGUAL":61,"MENOR":62,"MAYOR_IGUAL":63,"AND":64,"OR":65,"NOT":66,"INT":67,"T_FLOAT64":68,"T_STRING":69,"T_BOOL":70,"T_RUNE":71,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"PUNTO_COMA",21:"LLAVE_ABRE",22:"LLAVE_CIERRA",23:"VAR",24:"ID",26:"IGUAL",28:"DOS_PUNTOS_IGUAL",29:"MAS_IGUAL",30:"IMPRIMIR",31:"PAR_ABRE",33:"PAR_CIERRA",34:"IF",35:"ELSE",36:"FOR",37:"RBREAK",38:"FUNC",41:"COMA",43:"RETURN",45:"CONTINUE",46:"SWITCH",50:"CASE",51:"DOS_PUNTOS",52:"MAS",53:"MENOS",54:"ENTERO",55:"DECIMAL",56:"CADENA",57:"L_RUNE",58:"NIL",59:"RTRUE",60:"RFALSE",61:"IGUAL_IGUAL",62:"MENOR",63:"MAYOR_IGUAL",64:"AND",65:"OR",66:"NOT",67:"INT",68:"T_FLOAT64",69:"T_STRING",70:"T_BOOL",71:"T_RUNE"},
productions_: [0,[3,2],[3,1],[4,2],[4,2],[4,1],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,3],[6,1],[10,5],[13,3],[9,3],[12,3],[8,4],[11,5],[11,9],[14,5],[14,9],[15,1],[18,9],[39,3],[39,1],[39,0],[42,2],[40,1],[40,0],[19,2],[19,1],[20,1],[44,4],[32,3],[32,1],[32,0],[16,1],[17,5],[17,6],[47,2],[47,1],[49,4],[49,3],[48,3],[48,2],[27,3],[27,3],[27,2],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,1],[27,3],[27,3],[27,3],[27,3],[27,3],[27,2],[27,1],[27,1],[25,1],[25,1],[25,1],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 let ast = $$[$0-1]; let errs = listaErrores; listaErrores = []; return { ast: ast, errores: errs }; 
break;
case 2:
 return { ast: [], errores: listaErrores }; 
break;
case 3:
 if ($$[$0]) $$[$0-1].push($$[$0]); this.$=$$[$0-1]; 
break;
case 4:
 this.$ = $$[$0-1]; 
break;
case 5:
 this.$= $$[$0] ? [$$[$0]] : []; 
break;
case 6: case 35: case 45: case 54:
 this.$ = []; 
break;
case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19:
this.$ = $$[$0];
break;
case 20:
 this.$ = new Bloque.default($$[$0-1], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 21:
 listaErrores.push(new Errores.default('Sintáctico', 'Error de sintaxis cerca de ' + yytext, this._$.first_line, this._$.first_column)); this.$ = null; 
break;
case 22:
this.$= new Declaracion.default($$[$0-2],_$[$0-4].first_line, _$[$0-4].first_column,$$[$0-3],$$[$0]);
break;
case 23:
this.$= new DeclaracionCorta.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 24:
this.$= new AsignacionVar.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 25:
this.$= new SumaAsignacion.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 26:
this.$= new Imprimir.default($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 27:
 this.$ = new CondicionalIf.default($$[$0-3], $$[$0-1], undefined, _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 28:
 this.$ = new CondicionalIf.default($$[$0-7], $$[$0-5], $$[$0-1], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 29:
 this.$ = new CicloFor.default($$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 30:
 this.$ = new CicloForCompleto.default($$[$0-7], $$[$0-5], $$[$0-3], $$[$0-1], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 31:
 this.$ = new Break.default(_$[$0].first_line, _$[$0].first_column); 
break;
case 32:
 this.$ = new Funcion.default($$[$0-7], $$[$0-5], $$[$0-3], $$[$0-1], _$[$0-8].first_line, _$[$0-8].first_column); 
break;
case 33: case 43:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 34: case 44: case 50:
 this.$ = [$$[$0]]; 
break;
case 36:
 this.$ = {id: $$[$0-1], tipo: $$[$0]}; 
break;
case 37: case 41: case 53: case 71:
 this.$ = $$[$0]; 
break;
case 38:
 this.$ = new Tipo.default(Tipo.tipoDato.VOID); 
break;
case 39:
 this.$ = new Return.default($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 40:
 this.$ = new Return.default(null, _$[$0].first_line, _$[$0].first_column); 
break;
case 42:
 this.$ = new Llamada.default($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 46:
this.$= new Continue.default(_$[$0].first_line, _$[$0].first_column);
break;
case 47:
 this.$ = new Switch.default($$[$0-3], $$[$0-1], undefined, _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 48:
 this.$ = new Switch.default($$[$0-4], $$[$0-2], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 49:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 51:
 this.$ = new SwitchCase.default($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 52:
 this.$ = new SwitchCase.default($$[$0-1], [], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.SUMA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2],$$[$0] ); 
break;
case 56:
 this.$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.RESTA, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2],$$[$0]); 
break;
case 57:
 this.$= new Aritmeticas.default(Aritmeticas.OperadoresAritmeticos.NEG, _$[$0-1].first_line, _$[$0-1].first_column, $$[$0]); 
break;
case 58:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.ENTERO),$$[$0], _$[$0].first_line, _$[$0].first_column ); 
break;
case 59:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$$[$0], _$[$0].first_line, _$[$0].first_column ); 
break;
case 60:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.CADENA), $$[$0], _$[$0].first_line, _$[$0].first_column ); 
break;
case 61:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.RUNE), parseInt($$[$0]), _$[$0].first_line, _$[$0].first_column ); 
break;
case 62:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.NULO), null, _$[$0].first_line, _$[$0].first_column ); 
break;
case 63:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), true, _$[$0].first_line, _$[$0].first_column ); 
break;
case 64:
this.$= new Nativos.default(new Tipo.default(Tipo.tipoDato.BOOLEAN), false, _$[$0].first_line, _$[$0].first_column ); 
break;
case 65:
this.$= new Relacionales.default(Relacionales.Op_relacionales.IGUALDAD,_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2],$$[$0]);
break;
case 66:
this.$= new Relacionales.default(Relacionales.Op_relacionales.MENOR,_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2],$$[$0]);
break;
case 67:
this.$= new Relacionales.default(Relacionales.Op_relacionales.MAYOR_IGUAL,_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2],$$[$0]);
break;
case 68:
this.$= new Logicas.default(Logicas.operadoresLogicos.AND, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 69:
this.$= new Logicas.default(Logicas.operadoresLogicos.OR, _$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], $$[$0]);
break;
case 70:
this.$= new Logicas.default(Logicas.operadoresLogicos.NOT,_$[$0-1].first_line, _$[$0-1].first_column, $$[$0]);
break;
case 72:
this.$= new AccesoVar.default($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 73:
this.$= new Tipo.default(Tipo.tipoDato.ENTERO);
break;
case 74:
this.$= new Tipo.default(Tipo.tipoDato.DECIMAL);
break;
case 75:
this.$= new Tipo.default(Tipo.tipoDato.CADENA);
break;
case 76:
this.$= new Tipo.default(Tipo.tipoDato.BOOLEAN);
break;
case 77:
this.$= new Tipo.default(Tipo.tipoDato.RUNE);
break;
}
},
table: [{2:$V0,3:1,4:2,5:[1,3],6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{1:[3]},{2:$V0,5:[1,32],6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{1:[2,2]},o($Ve,[2,5]),o($Ve,[2,6]),o($Ve,[2,7]),o($Ve,[2,8]),o($Ve,[2,9]),o($Ve,[2,10]),o($Ve,[2,11]),o($Ve,[2,12]),o($Ve,[2,13]),o($Ve,[2,14]),o($Ve,[2,15]),o($Ve,[2,16]),o($Ve,[2,17]),o($Ve,[2,18]),o($Ve,[2,19]),{2:$V0,4:35,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($Ve,[2,21]),{31:[1,36]},{26:$Vf,28:$Vg,29:$Vh,31:$Vi},{24:[1,41]},{24:$Vj,27:42,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{2:$V0,6:55,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:[1,57],27:54,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:56,45:$Vb,46:$Vc,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($Ve,[2,31]),o($Ve,[2,46]),{24:$Vj,27:58,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:[1,59]},o([2,5,7,21,22,23,30,34,36,37,38,43,45,46,50,51],[2,40],{44:52,27:60,24:$Vj,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs}),o($Ve,[2,41]),{1:[2,1]},o($Ve,[2,3]),o($Ve,[2,4]),{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,61],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($Vt,$Vu,{44:52,32:62,27:63,24:$Vj,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs}),{24:$Vj,27:64,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:65,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:66,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($Vt,$Vu,{44:52,27:63,32:67,24:$Vj,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs}),{25:68,67:$Vv,68:$Vw,69:$Vx,70:$Vy,71:$Vz},{21:[1,74],52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG},{24:$Vj,27:82,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($VH,[2,58]),o($VH,[2,59]),o($VH,[2,60]),o($VH,[2,61]),o($VH,[2,62]),o($VH,[2,63]),o($VH,[2,64]),{24:$Vj,27:83,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($VH,$VI),o($VH,$VJ,{31:$Vi}),{21:[1,84],52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG},{7:[1,85]},o([7,21,52,53,61,62,63,64,65],$VI),o([21,52,53,61,62,63,64,65],$VJ,{26:$Vf,28:$Vg,29:$Vh,31:$Vi}),{21:[1,86],52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG},{31:[1,87]},o($Ve,[2,39],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,20]),{33:[1,88],41:$VK},o($Vt,[2,44],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,24],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,25],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,23],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),{33:[1,90],41:$VK},{26:[1,91]},o($VL,[2,73]),o($VL,[2,74]),o($VL,[2,75]),o($VL,[2,76]),o($VL,[2,77]),{2:$V0,4:92,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{24:$Vj,27:93,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:94,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:95,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:96,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:97,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:98,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{24:$Vj,27:99,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($VH,[2,57]),o($VH,[2,70]),{2:$V0,4:100,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{24:$Vj,27:101,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{47:102,49:103,50:$VM},o($Vt,[2,35],{39:105,42:106,24:$VN}),o($Ve,[2,26]),{24:$Vj,27:108,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},o($VH,[2,42]),{24:$Vj,27:109,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,110],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($VH,[2,55]),o($VH,[2,56]),o($VO,[2,65],{52:$VA,53:$VB}),o($VO,[2,66],{52:$VA,53:$VB}),o($VO,[2,67],{52:$VA,53:$VB}),o([2,5,7,21,22,23,24,30,33,34,36,37,38,41,43,45,46,50,51,64,65],[2,68],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE}),o([2,5,7,21,22,23,24,30,33,34,36,37,38,41,43,45,46,50,51,65],[2,69],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF}),{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,111],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{7:[1,112],52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG},{22:[1,113],48:114,49:115,50:$VM},o($VP,[2,50]),{24:$Vj,27:116,44:52,53:$Vk,54:$Vl,55:$Vm,56:$Vn,57:$Vo,58:$Vp,59:$Vq,60:$Vr,66:$Vs},{33:[1,117],41:[1,118]},o($Vt,[2,34]),{25:119,67:$Vv,68:$Vw,69:$Vx,70:$Vy,71:$Vz},o($Vt,[2,43],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,22],{52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG}),o($Ve,[2,27],{35:[1,120]}),o($Ve,[2,29]),{2:$V0,6:121,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($Ve,[2,47]),{22:[1,122],51:[1,123]},o($VP,[2,49]),{51:[1,124],52:$VA,53:$VB,61:$VC,62:$VD,63:$VE,64:$VF,65:$VG},{21:[2,38],25:126,40:125,67:$Vv,68:$Vw,69:$Vx,70:$Vy,71:$Vz},{24:$VN,42:127},o($Vt,[2,36]),{21:[1,128]},{21:[1,129]},o($Ve,[2,48]),o($VQ,[2,54],{6:4,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,44:31,4:130,2:$V0,7:$V1,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,45:$Vb,46:$Vc}),o($VP,[2,52],{6:4,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,44:31,4:131,2:$V0,7:$V1,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,45:$Vb,46:$Vc}),{21:[1,132]},{21:[2,37]},o($Vt,[2,33]),{2:$V0,4:133,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{2:$V0,4:134,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($VQ,[2,53],{8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,44:31,6:33,2:$V0,7:$Vd,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,45:$Vb,46:$Vc}),o($VP,[2,51],{8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,44:31,6:33,2:$V0,7:$Vd,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,45:$Vb,46:$Vc}),{2:$V0,4:135,6:4,7:$V1,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,136],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,137],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},{2:$V0,6:33,7:$Vd,8:6,9:7,10:8,11:9,12:10,13:11,14:12,15:13,16:14,17:15,18:16,19:17,20:18,21:$V2,22:[1,138],23:$V3,24:$V4,30:$V5,34:$V6,36:$V7,37:$V8,38:$V9,43:$Va,44:31,45:$Vb,46:$Vc},o($Ve,[2,28]),o($Ve,[2,30]),o($Ve,[2,32])],
defaultActions: {3:[2,2],32:[2,1],126:[2,37]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};


    const Tipo = require('./simbolo/Tipo')
    const Nativos= require('./expresiones/Nativos')
    const Aritmeticas= require('./expresiones/Aritmeticas')
    const Relacionales= require('./expresiones/Relacionales')


    const Declaracion= require('./instrucciones/Declaracion')
    const AccesoVar=require('./expresiones/AccesoVar')
    const AsignacionVar= require('./instrucciones/AsignacionVar')
    const Imprimir= require('./instrucciones/Imprimir')
    const CondicionalIf = require('./instrucciones/CondicionalIf');
    const SumaAsignacion = require('./instrucciones/SumaAsignacion');
    const DeclaracionCorta = require('./instrucciones/DeclaracionCorta');
    const CicloFor = require('./instrucciones/CicloFor');
    const CicloForCompleto = require('./instrucciones/CicloForCompleto');
    const Break = require('./instrucciones/Break');
    const Bloque = require('./instrucciones/Bloque');
    const Switch = require('./instrucciones/Switch');
    const SwitchCase = require('./instrucciones/SwitchCase');
    const Continue = require('./instrucciones/Continue');
    const Funcion = require('./instrucciones/Funcion');
    const Llamada = require('./instrucciones/Llamada');
    const Return = require('./instrucciones/Return');
    const Logicas = require('./expresiones/Logicas');
    const Errores = require('./excepciones/Errores');

    let listaErrores = [];
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 23;
break;
case 1:return 67;
break;
case 2:return 68;
break;
case 3:return 69;
break;
case 4:return 70;
break;
case 5:return 71;
break;
case 6:return 58;
break;
case 7:return 30;
break;
case 8:return 34;
break;
case 9:return 35;
break;
case 10:return 59;
break;
case 11:return 60;
break;
case 12:return 36;
break;
case 13:return 37;
break;
case 14:return 45;
break;
case 15:return 46;
break;
case 16:return 50;
break;
case 17:return 'DEFAULT';
break;
case 18:return 38;
break;
case 19:return 43;
break;
case 20:return 29;
break;
case 21:return 52;
break;
case 22:return 53;
break;
case 23:return 7;
break;
case 24:return 31;
break;
case 25:return 33;
break;
case 26:return 21;
break;
case 27:return 22;
break;
case 28:return 62;
break;
case 29:return 63;
break;
case 30:return 61;
break;
case 31:return 28;
break;
case 32:return 51;
break;
case 33:return 26;
break;
case 34:return 41;
break;
case 35:return 64;
break;
case 36:return 65;
break;
case 37:return 66;
break;
case 38:return 55;
break;
case 39:return 54;
break;
case 40:
    let str = yy_.yytext.substr(1,yy_.yytext.length-2);
    str = str.replace(/\\n/g, '\n')
             .replace(/\\r/g, '\r')
             .replace(/\\t/g, '\t')
             .replace(/\\\\/g, '\\')
             .replace(/\\"/g, '"');
    yy_.yytext = str;
    return 56;

break;
case 41: yy_.yytext = yy_.yytext.charCodeAt(1); return 57; 
break;
case 42:return 24
break;
case 43:
break;
case 44:
break;
case 45:
break;
case 46:
break;
case 47: listaErrores.push(new Errores.default('Léxico', 'Carácter no válido ' + yy_.yytext, yy_.yylloc.first_line, yy_.yylloc.first_column)); 
break;
case 48:return 5;
break;
}
},
rules: [/^(?:var\b)/,/^(?:int\b)/,/^(?:float64\b)/,/^(?:string\b)/,/^(?:bool\b)/,/^(?:rune\b)/,/^(?:nil\b)/,/^(?:[fF][mM][tT]\.[pP][rR][iI][nN][tT][lL][nN])/,/^(?:if\b)/,/^(?:else\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:for\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:func\b)/,/^(?:return\b)/,/^(?:\+=)/,/^(?:\+)/,/^(?:-)/,/^(?:;)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:<)/,/^(?:>=)/,/^(?:==)/,/^(?::=)/,/^(?::)/,/^(?:=)/,/^(?:,)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:[0-9]+\.[0-9]+\b)/,/^(?:[0-9]+\b)/,/^(?:"(?:\\.|[^\"\\])*")/,/^(?:'[^\']')/,/^(?:[a-zA-Z_][a-zA-Z0-9_]*)/,/^(?:\/\/.*)/,/^(?:\/\*[\s\S]*?\*\/)/,/^(?:[\ \t\n\r]+)/,/^(?:[\ \n])/,/^(?:.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})(); module.exports = analizador;