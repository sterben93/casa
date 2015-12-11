$(document).ready(function busquedas() {
    var filtros = $('#btfiltros');
    var busqueda = $('#busqueda');
    filtros.click(consultaFiltros);
    busqueda.click(consultaBusqueda);
});

function consultaFiltros() {
    var texto = '{';
    $('.datosF').each(function (idx, input) {
        if (!input.value == "") {
            texto += '"' + input.name + '":"' + input.value + '",';
        }
    });
    texto += '"numero":"3", "paginacion":' + 1 + '}';
    alert(texto);
    var json = JSON.parse(texto);
    if (texto == '{"numero":"3", "paginacion":' + 1 + '}') {
        alert('No hay ningun campo lleno');
    } else {
        ajaxPHP('http://localhost/apiParse/WSInmueble.php', json, construirContenido);
    }
}

function consultaBusqueda() {
    var servicio = parseInt($('#servicio').val());
    var colonia = $('#colonia').val();
    alert(servicio+" "+colonia);
    var bandera = 0;
    var limite = 10;
    var inicio = 0;
    var inmueble = Parse.Object.extend("Inmueble");
    var query = new Parse.Query(inmueble);
    if (servicio === 0) {
        bandera++;
    } else {
        query.equalTo("servicio", servicio);
    }
    if (colonia === "") {
        bandera++;
    } else {
        query.equalTo("colonia", colonia);
    }
    query.descending("createdAt");
    if (bandera===2) {
        alert('No hay ningun campo lleno');
    } else {
        crearPaginacion(query);
        query.limit(limite);
        consulta(query,inicio);
    }
}
