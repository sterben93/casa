/* global $removeCookie */
/* global pestana */
/* global $pesnoti */
/* global $pesfav */
/* global $pesperfil */
/* global $pespub */

$(document).ready(inicializa);

/**
 * Verifica el contenido de la cookie pestana para activar la pestaña solicitada ppor el usuario
 */
function inicializa() {
    $pesperfil = $('#pesperf');
    $pesfav = $('#pesfav');
    $pesnoti = $('#pesnoti');
    $pespub = $('#pespub');
    if ($cookie('pestana') !== undefined) {
        pestana[$cookie('pestana')]();
    }
    $pesperfil.click(function () {
        pestanaPerfil();
    });

    $pesfav.click(function () {
        pestanaFavorito();
    });

    $pesnoti.click(function () {
        pestanaNotificaciones();
    });

    $pespub.click(function () {
        pestanaPublica();
    });
}

/**
 * Metodos que activan las clases css de cada una de las pestañas dandole el
 *  comportamiento de una pestaña activada
 */
function pestanaPerfil() {
    $pesperfil.addClass('active');
    $pesfav.removeClass('active');
    $pesnoti.removeClass('active');
    $pespub.removeClass('active');
    $('#contenido').load("http://localhost/casas/perfil.html");
    Parse.initialize("ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is", "KW6EKtE5UC6cNj2RWfOyHfGKCA4B8FHG4fV0A0oq");
    var Usuario = Parse.Object.extend("_User");
    var query = new Parse.Query(Usuario);
    query.equalTo("objectId", $cookie('id'));
    llenarDatos(query);
}


function pestanaFavorito() {
    $pesperfil.removeClass('active');
    $pesfav.addClass('active');
    $pesnoti.removeClass('active');
    $pespub.removeClass('active');
    //$('#contenido').load("http://localhost/php/favoritos.php");
}

function pestanaNotificaciones() {
    $pesperfil.removeClass('active');
    $pesfav.removeClass('active');
    $pesnoti.addClass('active');
    $pespub.removeClass('active');
    $('#contenido').load("http://localhost/apiParse/WSUsuario.php?numero=4&id=" + $cookie('id'));
}

function pestanaPublica() {
    $pesperfil.removeClass('active');
    $pesfav.removeClass('active');
    $pesnoti.removeClass('active');
    $pespub.addClass('active');
    $('#contenido').load("http://localhost/casas/publicaInmueble.html");
}

function llenarDatos(query) {
    query.first({
        success: function (usuario) {
            $("#nombre").html(usuario.get('username'));
            $("#email").html(usuario.get('email'));
            $("#tipo").html(convertirTipo(parseInt(usuario.get('tipo'))));
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function convertirTipo(tipo) {
    if (tipo == 1) {
        return 'Moral'
    } else {
        return 'Fisica'
    }
}
/**
 * Objeto pestana que simula un switch
 */
pestana = {
    'pub': function () {
        $removeCookie('pestana');
        pestanaPublica();
    },
    'fav': function () {
        $removeCookie('pestana');
        pestanaFavorito();
    },
    'anun': function () {
        $removeCookie('pestana');
        pestanaPerfil();
    },
    'noti': function () {
        $removeCookie('pestana');
        pestanaNotificaciones();
    }
}
