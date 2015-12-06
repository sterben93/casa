$(document).ready(function () {
	sesion();
    ajaxPHP('http://localhost/apiParse2/pruebas.php', { numero: 1, pag: 1 }, construirContenido);

        var options = {
            currentPage: 3,
            totalPages: 10
        }

        $('#example').bootstrapPaginator(options);
});
