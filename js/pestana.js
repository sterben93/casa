/* global pestana */
/* global pesnoti */
/* global pesfav */
/* global pesanum */
/* global pespub */

$(document).ready(inicializa);

/**
 * Verifica el contenido de la cookie pestana para activar la pestaña solicitada ppor el usuario
 */
function inicializa(){
    pesanum=$('#pesanun');
    pesfav=$('#pesfav');
    pesnoti=$('#pesnoti');
    pespub=$('#pespub');
    if($cookie('pestana')!==undefined){
        pestana[$cookie('pestana')]();
    }
    pesanum.click(function (){
        pestanaAnuncio();
    });

    pesfav.click(function (){
        pestanaFavorito();
    });

    pesnoti.click(function (){
        pestanaNotificaciones();
    });

    pespub.click(function (){
        pestanaPublica();
    });
}

/**
 * Metodos que activan las clases css de cada una de las pestañas dandole el
 *  comportamiento de una pestaña activada
 */
function pestanaAnuncio(){
    pesanum.addClass('active');
    pesfav.removeClass('active');
    pesnoti.removeClass('active');
    pespub.removeClass('active');
    //$('#contenido').load("http://localhost/php/misanuncios.php");
}

function pestanaFavorito(){
    pesanum.removeClass('active');
    pesfav.addClass('active');
    pesnoti.removeClass('active');
    pespub.removeClass('active');
    //$('#contenido').load("http://localhost/php/favoritos.php");
}

function pestanaNotificaciones(){
    pesanum.removeClass('active');
    pesfav.removeClass('active');
    pesnoti.addClass('active');
    pespub.removeClass('active');
    //$('#contenido').load("http://localhost/php/notificaciones.php");
}

function pestanaPublica(){
    pesanum.removeClass('active');
    pesfav.removeClass('active');
    pesnoti.removeClass('active');
    pespub.addClass('active');
    $('#contenido').load("http://localhost/casa/publica.html");
}

/**
 * Objeto pestana que simula un switch
 */
pestana={
    'pub':function() {
        $removeCookie('pestana');
        pestanaPublica();
    },
    'fav':function() {
        $removeCookie('pestana');
        pestanaFavorito();
    },
    'anun':function() {
            $removeCookie('pestana');
            pestanaAnuncio();
    },
    'noti':function() {
            $removeCookie('pestana');
            pestanaNotificaciones();
    }
}
