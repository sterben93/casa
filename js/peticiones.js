$(function busquedas() {
    var filtros = $('#btfiltros');
    var busqueda=$('#busqueda');
    filtros.click(consultaFiltros);
    busqueda.click(consultaBusqueda);
});

function consultaFiltros() {
    texto='{';
    $('.datosF').each(function (idx, input) {
        if(!input.value==""){
            texto+='"'+input.name+'":"'+input.value+'",';    
        }
    });
    texto+='"numero":"3", "paginacion":'+1+'}';
    alert(texto);
    json=JSON.parse(texto);
    if(texto=='{"numero":"3", "paginacion":"1"}'){
        alert('No hay ningun campo lleno');
    }else{
    ajaxPHP('http://localhost/apiParse/WSInmueble.php',json, construirContenido);
    }
}

function consultaBusqueda(){
    var $datos=$('#formularioBusqueda').serializeArray();
    var texto='{';
    for(var i=0;i<$datos.length;i++){
        texto+='"'+$datos[i].name+'":"'+$datos[i].value+'",';
    }
    texto+='"numero":"4"}';
    json=JSON.parse(texto);
    consulta=json;
    //ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',jsonBusqueda,);
}
