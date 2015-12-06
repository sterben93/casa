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
		    tooltipBackgroundColor:'222',
		    tooltipPadding: '10',
		    tooltipAnimate: true
    });
    $('#iniciar').click(function () {
        $usuario = $("#usuario").val();
        $password = $("#password").val();
        json = { 'numero': 1, 'usuario': $usuario, 'password': $password };
        ajaxPHP('http://localhost/apiParse2/WebServicesUsuario.php', json, inicioSesion);
    });
});

function inicioSesion(json) {
    alert(json.logeo);
    if (json.logeo == 1) {
        $cookie('sesion', 'true');
        $cookie('id', json.id);
        window.location.href = "index.html";
        window.location.reload;
    } else {
        $('#mensaje').html('<p>' + json.error + '<p>');
    }
}
