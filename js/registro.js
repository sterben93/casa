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
		    tooltipBackgroundColor:'222',
		    tooltipPadding: '10',
		    tooltipAnimate: true
    });
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
