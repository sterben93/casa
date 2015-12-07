var consulta={numero:1,paginacion:1};
$(document).ready(function () {
	sesion();
    ajaxPHP('http://localhost/apiParse/WSInmueble.php',{numero:1,paginacion:1}, construirContenido);
});
