$(document).ready(iniciaContacto);

function iniciaContacto() {
    $('#enviar').click(enviarDatos);
}

function enviarDatos(){
    var texto = '{"numero":"num",'
    $('input').each(function (num, input){
        texto += '"' + input.id + '":"' + input.value + '",';
    });
    texArea=$('textarea');
    texto += '"' + texArea.id + '":"' + texArea.value + '"}';
    var json = JSON.parse(texto);
    texto = '{"numero":"3",';
    ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php', json, verificaContacto);
}

function verificaContacto(json){

}
