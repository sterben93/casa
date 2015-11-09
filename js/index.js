/* global $cookie */
/* global texto */
/* global $removeCookie */
/* global menu2 */
/* global menu1 */

$(document).ready(function (){
	sesion();
    $("#paginacion").paginate({
    	count : 7,
        start : 1,
		display : 5,
		border : true,
		border_color : 'black',
		text_color : 'black',
		background_color : 'white',
		border_hover_color : '#ccc',
		text_hover_color : '#000',
		background_hover_color : '#fff',
		images : false,
		mouse : 'press',
		onChange : function(page){
            alert(consulta);
        }
    });
	ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',{numero:1},[construir, crearPaginacion]);
});

