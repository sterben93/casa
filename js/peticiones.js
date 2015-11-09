/* global jsonBusqueda */
/* global jsonFiltros */
/* global consulta */
/* global $ */

consulta={numero:1};

/**
 * Metodp que inicializa los Botones con su repectivo metodo
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
    datos=$('#fomularioFiltros').serializeArray();
    json=new Array();
    alert(datos.length);
    for(var i=0;i<datos.length;i++){
        json.push(datos[i].name+":"+datos[i].value);
    }
    jsonFiltros={numero:2,json};
    ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',jsonFiltros,[construir,crearPaginacion]);
    alert(jsonFiltros);
	consulta=jsonFiltros;
}

/**
 * Obtiene los datos del formulario de busqueda y los convierte a un formato json
 */
function consultaBusqueda(){
    datos=$('#formularioBusqueda').serializeArray();
    json=new Array();
    alert(datos.length);
    for(var i=0;i<datos.length;i++){
        json.push(datos[i].name+":"+datos[i].value);
    }
    jsonBusqueda={numero:3,json};
    alert(jsonBusqueda);
    ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',jsonBusqueda,[construir,crearPaginacion]);
	consulta=jsonBusqueda;
}

function consultaAll(){
    ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',consulta);
}
