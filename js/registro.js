$(document).ready(function () {
    sesion();
    $('#enviar').click(reguistraUsuario);
});

/**
 * Realiza el reguistro del usuario a la Base de Datos de Parse
 */
function reguistraUsuario() {
    var texto = '{"numero":"3",'
    $('input').each(function (idx, input) {
        texto += '"' + input.id + '":"' + input.value + '",';
    });
    texto += '"' + $('select').attr('id') + '":"' + $('select').val() + '"}';
    var json = JSON.parse(texto);
    texto = '{"numero":"3",';
    ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php', json, verificaReguistro);
}

/**
 * Verifica si el reguistro del usuario se llevo acabo o no
 */
function verificaReguistro(json) {
    if (json.reg == 1) {
        alert(json.mensaje);
        window.location.href = 'index.html';
        window.location.reload;
    } else {
        alert(json.mensaje);
    }
}
