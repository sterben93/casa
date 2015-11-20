/* global jsonUsuario */
/* global json */
/* global datos */

/*
 * Proporciona las funciones necesarias para que funcione la paguina registro
 */
$(document).ready(function (){
	sesion();
    texto='"numero":"3",';
    $('#enviar').click(function (){
        texto='{"numero":"3",'
        $('input').each(function(idx, input) {
            texto+='"'+input.id+'":"'+input.value+'",';
        });
        texto+='"'+$('select').attr('id')+'":"'+$('select').val()+'"}';
        json=JSON.parse(texto);
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',json,regUsuario);
    });
});

function regUsuario(json){
    if(json.reg==1){
        alert(json.mensaje);
        window.location.href='index.html';
        window.location.reload;
    }else{
        alert(json.mensaje);
    }
}
