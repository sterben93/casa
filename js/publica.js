$(document).ready(publica);

function publica() {
    $("#formularioInm").progression({
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
    $('input[type="file"]').change(function () {
        alert(this.files[0]);

    });
    $('#enviar').click(function () {

    });
}
