/* global jsonUsuario */
/* global json */
/* global datos */

/*
 * Proporciona las funciones necesarias para que funcione la paguina registro
 */
$(document).ready(function (){
	sesion();
    $('#enviar').click(function (){
        datos=$('#formularioUsuario').serializeArray();
        json=new Array();
        for(var i=0;i<datos.length;i++){
            json.push(datos[i].name+":"+datos[i].value);
        }
        jsonUsuario={numero:3,json};
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',jsonUsuario,[registroDeUsuario]);
    });
});
