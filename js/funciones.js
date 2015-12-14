/* global $cookie */
/* global $ */

/**
 * Funcion que me permite el intercambio de informacion mediante Objetos JSON
 * Desde un sitio web a un WebServices
 * @param String urlPHP
 * @param Object JSON jsonData
 * @param Funcio funcion
 */
function ajaxPHP(urlPHP,jsonData,funcion){
    $.ajax({
			url : urlPHP,
			data : jsonData,
            type : 'POST',
			dataType : 'json',
			success : function(json) {
                alert('si entro')
                funcion(json);
			},
        error : function(jqXHR, status, error) {
            alert('Disculpe, existió un problema ');;
        },
        complete : function(jqXHR, status) {
            alert('Petición realizada');
        }
	});
}

/**
 * Realiza un consulta a la base de datos, sin necesidad de crear la consulta
 * @param Objeto query
 * @param int inicio
 */
function consulta(query, inicio) {
    query.find({
        success: function(results) {
            procesarResultados(results, inicio);
        },
        error: function(error) {
            alert("Error en la Conexion a la Base de Datos");
        }
    });
}

/**
 * Procesa el resultado de una consulta realizadda
 * @param Object inmueble
 * @param int inicio
 */
function procesarResultados(inmueble, inicio){
    $('.contenido').html("");
    var tamaño=inmueble.length;
    if(tamaño==0){
        $('.contenido').html("No se encontraron resultados");
    }else{
    for(var i=inicio;i<inmueble.length;i++){
        var objecto=inmueble[i];
        construirContenido(objecto);
    }
    }
}

/**
 * Construye el contenido de la pagina a partir de una consulta
 * @param Object inmueble
 */
function construirContenido(inmueble) {
    var relation = inmueble.relation("imagenes");
    var query = relation.query();
    query.first({
            success: function(imagen) {
                var imag = imagen.get("imagen");
                var $div1=$('<div/>',{'class':'col-xs-12 col-sm-5 col-md-5 col-lg-5'}).append(
                $('<img/>',{'class':'img-responsive',
                         'src':imag.url(),
                         'alt':'imagen de inmueble'}));
                var $div2=$('<div/>',{'class':'col-xs-12 col-sm-7 col-md-7 col-lg-7'}).append(
                $('<p/>',{'html':'Despripcion: '+inmueble.get('descripcion')})).append(
                $('<p/>',{'html':'Precio: '+inmueble.get('precio')}));
                var $div3=$('<div><a href="inmueble.php?id='+inmueble.id+'"><button type="submit" class="vermas btn btn-default col-xs-offset-8 col-sm-offset-10 col-md-offset-10"  value="'+inmueble.id+'">Ver mas...</button></a>'+'</div>');
                $('.contenido').append($('<div/>',{'class':'container-fluid celda'}).append($div1).append($div2).append($div3));
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
    });
}

/**
 * La funcion sesion sirve para proporcionarle al usuario las opciones de menu que puede aceder
 * dependiendo del contenido de la cookie sesion.
 */
function sesion() {
    var $menu1 = $('.menu1');
    var $menu2 = $('.menu2');
    if ($cookie('sesion') == undefined) {
        $menu1.show();
        $menu2.hide();
    } else {
        $menu1.hide();
        $menu2.show();
    }

    $('#publica').click(function () { crearCookie('pub') });
    $('#favoritos').click(function () { crearCookie('fav') });
    $('#anuncios').click(function () { crearCookie('anun') });
    $('#notificaciones').click(function () { crearCookie('noti') });
    $('#cerrar').click(function () {
        ajaxPHP('localhost/apiParse/WSUsuario.php', { numero: 2 }, cerrarSesion);
        $menu1.show();
        $menu2.hide();
        $removeCookie('sesion');
        $removeCookie('id');
    });
}

/**
 * Crea una cookie para decirle a la aplicacion que pestaña activar
 * @param string bton indica que tipo de boton a sido clikeado
 */
function crearCookie(bton) {
    boton[bton]();
}

/*Objeto boton que simula un switch*/
var boton = {
    'pub': function () {
        $cookie('pestana', 'pub');
        alert($cookie('pestana'));
    },
    'fav': function () {
        $cookie('pestana', 'fav');
        alert($cookie('pestana'));
    },
    'anun': function () {
        $cookie('pestana', 'anun');
        alert($cookie('pestana'));
    },
    'noti': function () {
        $cookie('pestana', 'noti');
        alert($cookie('pestana'));
    }
}

/**
 * La funcion Cierra la sesion del usuario actual ademas de elimniar dos cookie
 * sesion y id del usuario
 * @param Objeto json
 */
function cerrarSesion(json) {
    if (json.mensaje === 'Fin de la sesion') {
        $removeCookie('sesion');
        $removeCookie('id');
        window.location.href = "index.html";
        window.location.reload;
    } else {
        alert(json.mensaje);
    }
}

function crearPaginacion(query){
    query.count({
        success: function(count) {
            if(count<10){
                paginacionF(1)
            }else if(count%10==0){
                paginacionF(parseInt(count/10));
            }else{
                paginacionF(parseInt((count/10))+1);
            }
        },
        error: function(error) {
            alert('Error en la conexion a la Base de Datos')
        }
    });
}

function paginacionF(paginacion){
    $("#paginacion").paginate({
            count: paginacion,
            start: 1,
            display: 7,
            border: true,
            border_color: '#fff',
            text_color: '#fff',
            background_color: 'black',
            border_hover_color: '#ccc',
            text_hover_color: '#000',
            background_hover_color: '#fff',
            images: false,
            mouse: 'press',
            onChange: function(page){
                alert(page);
            }
    });
}
