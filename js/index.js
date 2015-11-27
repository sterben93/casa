$(document).ready(function (){
	sesion();
    ajaxPHP('http://localhost/apiParse/pruebas.php',{numero:1,pag:1},construirContenido);
});
