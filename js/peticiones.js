$(document).ready(function busquedas() {
    var filtros = $('#btfiltros');
    var busqueda = $('#busqueda');
    filtros.click(consultaFiltros);
    busqueda.click(consultaBusqueda);
});

function consultaFiltros() {
    var limite = 10;
    var inicio = 0;
    var inmueble = Parse.Object.extend("Inmueble");
    var query = new Parse.Query(inmueble);
    var texto = '{';
    $('.datosF').each(function (idx, input) {
        if (!input.value == "") {
            texto += '"' + input.name + '":"' + input.value + '",';
            query.equalTo(input.name, parseInt(input.value));
        }
    });
    texto += '"numero":"3", "paginacion":' + 1 + '}';
    if (texto == '{"numero":"3", "paginacion":' + 1 + '}') {
        alert('No hay ningun campo lleno en la Busqueda filtros');
    } else {
        query.descending("createdAt");
        query.limit(limite);
        consulta(query,inicio);
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
    if (bandera===2) {
        alert('No hay ningun campo lleno para realizar la busqueda');
    } else {
        query.descending("createdAt");
        query.limit(limite);
        consulta(query,inicio);
    }
}
