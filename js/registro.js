$(document).ready(function () {
    sesion();
    $("#formularioUsuario").progression({
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
    $('#enviar').click(reguistraUsuario);
});

/**
 * Realiza el reguistro del usuario a la Base de Datos de Parse
 */
function reguistraUsuario() {
    var texto = '{"numero":"3",';
    $('input').each(function (idx, input) {
        texto += '"' + input.id + '":"' + input.value + '",';
    });
    texto += '"' + $('select').attr('id') + '":"' + $('select').val() + '"}';
    var json = JSON.parse(texto);
    texto = '{"numero":"3",';
    ajaxPHP('http://localhost/apiParse/WSUsuario.php', json, verificaReguistro);
}

/**
 * Metodo para verificar el resultado del registro
 * @param Object JSON json
 */
function verificaReguistro(json) {
    if (json.mensaje === 'Registro Exitoso') {
        alert(json.mensaje);
        window.location.href = 'index.html';
        window.location.reload;
    } else {
        alert(json.mensaje);
    }
}
