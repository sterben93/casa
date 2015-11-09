function ajaxPHP(urlPHP,jsonData){
    $.ajax({
			url : urlPHP,
			data : jsonData,
            type : 'POST',
			dataType : 'json',
			success : function(json) {
                alert(json.logeo+" "+json.error);
			},
	});
}


function construir(json){
    texto="";
    for(i=0;i<json.length;i++){
      texto+='<div class="container-fluid celda">'+
          '<div class="col-xs-12 col-sm-5 col-md-5 col-lg-5">'+
          '<img class="img-responsive" src="'+json[i].url+'" alt="img de prueba">'+
          '</div>'+
          '<div class="col-xs-12 col-sm-7 col-md-7 col-lg-7">'+
          '<p>Descripción: '+json[i].descripcion+'</p>'+
          '<p>Precio: '+json[i].precio+'</p>'+
          '</div>'+
          '<div>'+
          '<button type="submit" class="btn btn-default col-xs-offset-8 col-sm-offset-10 col-md-offset-10" value="'+json.id+'">'+
          'Ver mas...'+
          '</button>'+
          '</div>'+
          '</div>';

    }
    $('.contenido').html(texto);
    $('button').click(function(){
        id=this.value;
		window.location.href="http://localhost/casa.html";
        window.location.reload;
        $cookie('idcasa',id);
	});
}

/**
 * [[Description]]
 * @param {[[Type]]} numPaginacion [[Description]]
 */
function crearPaginacion(numPaginacion){
    if(numPaginacion<5){
        display=numPaginacion;
    }else{
        display=7;
    }
    $("#paginacion").paginate({
    	count : numPaginacion,
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

/**
 * [[Description]]
 * @param {[[Type]]} respuesta [[Description]]
 */
function login(respuesta){
    if(respuesta===1){
        $cookie('sesion','true');
        $cookie('idUsuario',json.id);
        $("#mensaje").hide();
        window.location.href="index.html";
        window.location.reload;
    }else{
        alert(json.logeo);
		$("#mensaje").show();
    }
}

function registroUsuario(json){

}

function inicioSesion(){

}
