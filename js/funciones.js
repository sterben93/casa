/* global $cookie */
/* global $ */

var colsulta={};


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
