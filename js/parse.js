/* global Parse */
/* global $ */
$(document).ready(inicializa);

/**
 * inicializa los eventos del boton de registro del inmueble
 */
function inicializa() {
    $('#enviar').click(function () {
        Parse.initialize("ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is", "KW6EKtE5UC6cNj2RWfOyHfGKCA4B8FHG4fV0A0oq");
        subirDatos();
    });
}

/**
 * Obtiene la informacion de los campos del formulario para agregarlo a un objeto Parse y poder guardalos en la base
 * de datos de Parse.com
 */
function subirDatos() {
    var Inmueble = Parse.Object.extend("Inmueble");
    var inmueble = new Inmueble();
    var bandera = true;
    $('.datos').each(function (id, datos) {
        if(datos.value==""){
            bandera=false;
        }
        if (datos.type === 'number') {
            inmueble.set(datos.id, parseInt(datos.value));
            if(parseInt(datos.value)<0||parseInt(datos.value)>10){
                bandera=false;
            }
        } else if (datos.id === 'servicio') {
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
    if(bandera){
    inmueble.save(null, {
        success: function (inmueble) {
            imagenesInmuebles(inmueble)
            alert('Su publicacion ya se guardo en la base de datos ');
        },
        error: function (inmueble, error) {
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
    }
}

/**
 * Resibe un objeto Parse con informacion de un inmueble, este metodo obtienen las imagenes agregadas en el formulario para
 * posteriromente guardarlos en la base de datos de Parse.com
 * @param Object inmueble
 */
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

/**
 * El metodo guarda las imagenes en la base de datos de Parse.com
 * @param Object File parseFile [[Description]]
 * @param Object inmueble  [[Description]]
 */
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

/**
 * Crea las relaciones que existe entre un inmueble y susu imagenes
 * @param Object imagen
 * @param Object inmueble
 */
function relacion(imagen, inmueble) {
    var relation = inmueble.relation("imagenes");
    relation.add(imagen);
    inmueble.save();
}
