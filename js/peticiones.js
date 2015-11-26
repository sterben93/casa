/* global jsonBusqueda */
/* global jsonFiltros */
/* global $ */

/**
 * Metodo que inicializa los Botones con su repectivo metodo
 */
$(function busquedas() {
    var filtros = $('#btfiltros');
    var busqueda=$('#busqueda');
    filtros.click(consultaFiltros);
    busqueda.click(consultaBusqueda);
});

/**
 * Obtiene los datos del formulario de busqueda por filtros y los convierte a un formato json
 */
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

/**
 * Obtiene los datos del formulario de busqueda y los convierte a un formato json
 * envia la peticion al webservices
 */
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
