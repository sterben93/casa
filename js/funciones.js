/* global consulta */
/* global json */
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
    alert('Hola Ajax');
    alert(jsonData.numero);
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
 * Construye el contenido de la paguina principal
 * @param Objeto json
 */
function construirContenido(jsonArray){
    json=jsonArray.inmuebles;
    $('.contenido').html("");
    tamaño=json.length;
    if(tamaño==0){
        $('.contenido').html("No se encontraron resultados");
    }else{
    for(var i=0;i<json.length;i++){

        $div1=$('<div/>',{'class':'col-xs-12 col-sm-5 col-md-5 col-lg-5'}).append(
             $('<img/>',{'class':'img-responsive',
                         'src':json[i].url,
                         'alt':'imagen de inmueble'}));
        $div2=$('<div/>',{'class':'col-xs-12 col-sm-7 col-md-7 col-lg-7'}).append(
             $('<p/>',{'html':'Despripcion: '+json[i].descripcion})).append(
             $('<p/>',{'html':'Precio: '+json[i].precio}));
        $div3=$('<div><button type="submit" class="vermas btn btn-default col-xs-offset-8 col-sm-offset-10 col-md-offset-10"  value="'+json[i].id+'">Ver mas...</button>'+'</div>');
       $('.contenido').append($('<div/>',{'class':'container-fluid celda'}).append($div1).append($div2).append($div3));
    }
    $('.vermas').click(function(){
        var id=this.value;
		window.location.href="inmueble.html";
        window.location.reload;
        $cookie('idCasa',id);
	});
    }
    crearPaginacion(jsonArray.paginacion);
}

function crearPaginacion(json){
    var paginacion=json.pag;
    alert(paginacion);
    var display;
    if(paginacion<5){
        display=paginacion;
    }else{
        display=5;
    }
}
