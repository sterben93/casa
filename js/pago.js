$(document).ready(function () {
    sesion();
    $("#formularioPago").progression({
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
    $('button').click(function () {
        var bandera true;
        $('input').each(function (id, elem){
            if(elem.value == ""){
                bandera=false;
            }
        })
        if(bandera){
            urlActual=window.location.toString().split('=');
            verificaPago(urlActual[1],$cookie('id'));
        }

    });
});

function verificaPago(idInmueble,idUsuario){
    var text = '{"numero":' + 6 + ', "idUsuario":"' + idUsuario + '", "idInueble":"' + idInmueble + '"}';
    json = JSON.parse(text);
    ajaxPHP('http://localhost/apiParse/WSUsuario.php', json, confirmaPago);
}

function confirmaPago(json){
    alert(json.mensaje);
}
