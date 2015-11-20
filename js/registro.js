/* global jsonUsuario */
/* global json */
/* global datos */

/*
 * Proporciona las funciones necesarias para que funcione la paguina registro
 */
$(document).ready(function (){
	sesion();
    texto='{"numero":"2",';
    $('#enviar').click(function (){
        $('input').each(function(idx, input) {
            texto+='"'+input.id+'":"'+input.value+'",';
        });
        texto+='"'+$('select').attr('id')+'":"'+$('select').val()+'"}';
        json=JSON.parse(texto);
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',json,regUsuario);
        alert(json);
    });
});

function regUsuario(json){

}
