/* global $password */
/* global $usuario */
/**
 * Inicializa el comportamiento del inicio de sesion
 */
$(document).ready(function () {
    $("#formularioLogin").progression({
        tooltipWidth: '200',
        tooltipPosition: 'right',
        tooltipOffset: '50',
        showProgressBar: true,
        showHelper: true,
        tooltipFontSize: '14',
        tooltipFontColor: 'fff',
        progressBarBackground: 'fff',
        progressBarColor: '6EA5E1',
        tooltipBackgroundColor: '222',
        tooltipPadding: '10',
        tooltipAnimate: true
    });
    $('#iniciar').click(function () {
        var inputArray = [];
        $('input').each(function (idx, input) {
            inputArray[idx] = input.value;
        });
        var texto = '{"numero":"1", "usuario":"' + inputArray[0] + '", "password":"' + inputArray[1] + '"}';
        var json = JSON.parse(texto);
        ajaxPHP('http://localhost/apiParse/WSUsuario.php', json, inicioSesion);
    });
});

function inicioSesion(json) {
    if (json.mensaje == 1) {
        $cookie('sesion', 'true');
        $cookie('id', json.id);
        window.location.href = "index.html";
        window.location.reload;
    } else {
        $('#mensaje').html('<p>' + json.mensaje + '<p>');
    }
}
