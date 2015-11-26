$(document).ready(function (){
	sesion();
    ajaxPHP('http://localhost/apiParse/pruebas.php',{numero:1,pag:1},construirContenido);
    $("#formularioBusqueda").progression({
            tooltipWidth: '200',
		    tooltipPosition: 'right',
            tooltipOffset: '50',
		    showProgressBar: true,
		    showHelper: true,
		    tooltipFontSize: '14',
		    tooltipFontColor: 'fff',
		    progressBarBackground: 'fff',
		    progressBarColor: '6EA5E1',
		    tooltipBackgroundColor:'a2cbfa',
		    tooltipPadding: '10',
		    tooltipAnimate: true
		});

});
