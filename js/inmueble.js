/* global $cookie */
/* global $ */

$(document).ready(crearContenido);

function crearContenido() {
    var idCasa =$cookie('idCasa');
    ajaxPHP('http://localhost/apiParse/pruebas.php',{'numero':'2','id':idCasa},llenarContenido);
}

function llenarContenido(json) {
    var listaImg=new Array();
    listaImg=json.url;
    listaImg.forEach(function(urlImg,i) {
        $('#imagenes').append($('<li/>').append($('<img/>',{'src':urlImg,
                                                     'alt':'Image '+i+1})));
    });
    $('.jcarousel-wrapper').append('<p class="jcarousel-pagination"></p>');
    var inmueble=json.inmueble;
    $("#descripcion").html(inmueble.descripcion);
    $("#servicio").html(inmueble.servicio);
    $("#direccion").html(inmueble.direccion);
    $("#colonia").html(inmueble.colonia);
    $("#codigo_postal").html(inmueble.codigopostal);
    $("#cuartos").html(inmueble.cuartos);
    $("#banos").html(inmueble.banos);
    $("#estacionamientos").html(inmueble.estacionamientos);
    $("#plantas").html(inmueble.plantas);
    $("#precio").html(inmueble.precio);
    $("#fecha").html(inmueble.fecha);
    $("#disponible").html(inmueble.disponible);
}
