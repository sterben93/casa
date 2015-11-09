/* global $cookie */
/* global $removeCookie */
/* global $ */
/* global boton */
/* global menu2 */
/* global menu1 */

/**
 * La funcion sesion sirve para proporcionarle al usuario las opciones de menu que puede aceder
 * dependiendo del contenido de la cookie sesion.
 */
function sesion(){
    menu1= $('.menu1');
    menu2= $('.menu2');
    if($cookie('sesion')===undefined){
        menu1.show();
        menu2.hide();
    }else{
        menu1.hide();
        menu2.show();
    }

    $('#publica').click(function (){crearCookie('pub')});
    $('#favoritos').click(function (){crearCookie('fav')});
    $('#anuncios').click(function (){crearCookie('anun')});
    $('#notificaciones').click(function (){crearCookie('noti')});

    $('#cerrar').click(function (){
        $removeCookie('sesion');
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',{numero:2});
        menu1.show();
        menu2.hide();
    });
}

/**
 * Crea una cookie para decirle a la aplicacion que pestaña activar
 * @param string bton indica que tipo de boton a sido clikeado
 */
function crearCookie(bton){
    boton[bton]();
}


/*Objeto boton que simula un switch*/
boton={
    'pub':function(){
        $cookie('pestana','pub');
        alert($cookie('pestana'));
    },
    'fav':function(){
        $cookie('pestana','fav');
        alert($cookie('pestana'));
    },
    'anun':function(){
        $cookie('pestana','anun');
        alert($cookie('pestana'));
    },
    'noti':function(){
        $cookie('pestana','noti');
        alert($cookie('pestana'));
    }
}
