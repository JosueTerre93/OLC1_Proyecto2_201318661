function convertirLetras()
{
    var texto=document.getElementById('texto_txt').value;

    var arregloTexto=texto.split('');

    var index=-1;

    arregloTexto.forEach(element => 
        {
            index++;
            console.log(element);
            if(element=='a')
            {
                arregloTexto[index]='b';
            } 
            else if(element=='b')
            {
                arregloTexto[index]='a';
            }
        }
        );

    alert(arregloTexto);
}

