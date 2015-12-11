/* global $ */
/* global Parse */
$(document).ready(crearContenido);

/**
 * Crea el contenido de la pagina Inmueble
 */
function crearContenido() {
    var URLactual = window.location.toString().split('=');
    Parse.initialize("ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is", "KW6EKtE5UC6cNj2RWfOyHfGKCA4B8FHG4fV0A0oq");
    var inmueble = Parse.Object.extend("Inmueble");
    var query = new Parse.Query(inmueble);
    query.equalTo("objectId", URLactual[1]);
    llenarContenido(query);

}

/**
 * Llena el contenido de la descripcion del inmueble
 * @param Object JSON json Contiene la informcaion para el llenado de la pagina
 */
function llenarContenido(query) {
    query.first({
        success: function (objetoInm) {
            $("#descripcion").html(objetoInm.get('descripcion'));
            $("#servicio").html(tipoServicios(objetoInm.get('servicio')));
            $("#direccion").html(objetoInm.get('direccion'));
            $("#colonia").html(objetoInm.get('colonia'));
            $("#codigo_postal").html(objetoInm.get('codigoPostal'));
            $("#cuartos").html(objetoInm.get('colonia'));
            $("#banos").html(objetoInm.get('numeroBathrooms'));
            $("#estacionamientos").html(objetoInm.get('numeroEstacionamientos'));
            $("#plantas").html(objetoInm.get('numeroPlantas'));
            $("#precio").html('$ ' + objetoInm.get('precio'));
            var fecha=objetoInm.createdAt.toString().split(' ');
            $("#fecha").html(fecha[1]+" "+fecha[2]+" "+fecha[3]);
            var disponible;
            if(objetoInm.get('disponible')){
                disponible='Si';
            }else{
                disponible='No';
            }
            $("#disponible").html(disponible);
            crearSlider(objetoInm);
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

/**
 * Metodo para crear el slider de la pagina inmueble
 * @param Object Parse inmueble
 */
function crearSlider(inmueble) {
    var relation = inmueble.relation("imagenes");
    var query = relation.query();
    query.find({
        success: function (results) {
            for (var i = 0; i < results.length; i++) {
                var imagen = results[i].get("imagen");
                $('#imagenes').append($('<li/>').append($('<img/>', { 'src': imagen.url(), 'alt': 'Image ' + i + 1 })));
            }
            $('.jcarousel-wrapper').append('<p class="jcarousel-pagination"></p>');
        },
        error: function (error) {
            alert("Error en la Conexion a la Base de Datos");
        }
    });
}

/**
 *Retorna el tipo de Servicio que se esta ofreciendo
 * @param   int servicio
 * @returns string return
 */
function tipoServicios(servicio) {
    if (servicio == 1) {
        return 'Venta';
    } else {
        return 'Renta';
    }
}
