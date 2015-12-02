$(function busquedas() {
    var filtros = $('#btfiltros');
    var busqueda=$('#busqueda');
    filtros.click(consultaFiltros);
    busqueda.click(consultaBusqueda);
});

function consultaFiltros() {
    var $datos=$('#fomularioFiltros').serializeArray();
    var texto='{';
    for(var i=0;i<$datos.length;i++){
        texto+='"'+$datos[i].name+'":"'+$datos[i].value+'",';
    }
    texto+='"numero":"1"}';
    json=JSON.parse(texto);
    //ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',json,construirContenido);
}

function consultaBusqueda(){
    var $datos=$('#formularioBusqueda').serializeArray();
    var texto='{';
    for(var i=0;i<$datos.length;i++){
        texto+='"'+$datos[i].name+'":"'+$datos[i].value+'",';
    }
    texto+='"numero":"1"}';
    json=JSON.parse(texto);
    //ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',jsonBusqueda,);
}
