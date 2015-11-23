/* global $cookie */
/* global $ */
/* global $div3 */
/* global div3 */
/* global $div2 */
/* global $div1 */
var colsulta={};
/**
 * Realiza las peticiones ajax a los WebServices
 */
function ajaxPHP(urlPHP,jsonData,funcion){
    alert(jsonData.numero)
    alert('Hola');
    $.ajax({
			url : urlPHP,
			data : jsonData,
            type : 'POST',
			dataType : 'json',
			success : function(json) {
                funcion(json);
			},
	});
}

/**
 * Construye el contenido de la paguina principal
 * @param Objeto json
 */
function construirContenido(json){
    alert(json[0].id);
    for(var i=0;i<json.length;i++){
        $div1=$('<div/>',{'class':'col-xs-12 col-sm-5 col-md-5 col-lg-5'}).append(
             $('<img/>',{'class':'img-responsive',
                         'src':json[i].url,
                         'alt':'imagen de inmueble'}));
        $div2=$('<div/>',{'class':'col-xs-12 col-sm-7 col-md-7 col-lg-7'}).append(
             $('<p/>',{'html':'Despripcion: '+json[i].descripcion})).append(
             $('<p/>',{'html':'Precio: '+json[i].precio}));
        $div3=$('<div><button type="submit" class="btn btn-default col-xs-offset-8 col-sm-offset-10 col-md-offset-10"  value="'+json[i].id+'">Ver mas...</button>'+'</div>');
       $('.contenido').append($('<div/>',{'class':'container-fluid celda'}).append($div1).append($div2).append($div3));
    }
    $('button').click(function(){
        var id=this.value;
		window.location.href="inmueble.html";
        window.location.reload;
        $cookie('idCasa',id);
	});

}

/**
 * [[Description]]
 * @param {[[Type]]} numPaginacion [[Description]]
 */
function crearPaginacion(json){
    var paginacion=json.pag;
    var display;
    if(paginacion==0){
        break;
    }else if(paginacion<7){
        display=paginacion;
    }else{
        display=7;
    }

    $("#paginacion").paginate({
    	count : paginacion,
        start : 1,
		display : display,
		border : true,
		border_color : 'black',
		text_color : 'black',
		background_color : 'white',
		border_hover_color : '#ccc',
		text_hover_color : '#000',
		background_hover_color : '#fff',
		images : false,
		mouse : 'press',
		onChange : function(page){
            alert(consulta);
        }
    });
}
