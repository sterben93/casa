/* global $ */
/* global Parse */
var arrayID = [];
var inmuebleTemp;

$(document).ready(inicializa);
function inicializa() {
    $('#enviar').click(function () {
        Parse.initialize("ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is", "KW6EKtE5UC6cNj2RWfOyHfGKCA4B8FHG4fV0A0oq");
        subirDatos();
    });
}


function subirDatos() {
    var Inmueble = Parse.Object.extend("Inmueble");
    var inmueble = new Inmueble();
    $('.datos').each(function (id, datos) {
        if (datos.type == 'number') {
            inmueble.set(datos.id, parseInt(datos.value));
        } else if (datos.id == 'servicio') {
            inmueble.set('servicio', parseInt(datos.value));
        } else {
            inmueble.set(datos.id, datos.value);
        }
    });
    inmueble.set('activado', false);
    inmueble.set('disponible', true);
    var Usuarios = Parse.Object.extend("_User");
    var query = new Parse.Query(Usuarios);
    var id = $cookie('id');
    query.equalTo("objectId", id);
    query.first({
        success: function (object) {
            inmueble.set('idUsuario', object.toPointer());
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
    inmueble.save(null, {
        success: function (inmueble) {
            imagenesInmuebles(inmueble)
            alert('Create new object, id: ' + inmueble.id);
        },
        error: function (inmueble, error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}

function imagenesInmuebles(inmueble) {
    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    var tam = fileUploadControl.files.length;
    for (var i = 0; i < tam; i++) {
        var file = fileUploadControl.files[i];
        var name = 'imagen' + i + 'jpg';
        var parseFile = new Parse.File(name, file);
        subirImagen(parseFile, inmueble);
    }
}

function subirImagen(parseFile, inmueble) {
    var Imagenes = Parse.Object.extend("Imagenes");
    var imagen = new Imagenes();
    imagen.set("imagen", parseFile);
    imagen.save(null, {
        success: function (imagen) {
            relacion(imagen, inmueble)
            alert('Create new object, id: ' + imagen.id);
        },
        error: function (imagen, error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}

function relacion(imagen, inmueble) {
    var relation = inmueble.relation("imagenes");
    relation.add(imagen);
    inmueble.save();
}