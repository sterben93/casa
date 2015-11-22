/* global $cookie */
/* global texto */
/* global $removeCookie */
/* global menu2 */
/* global menu1 */

$(document).ready(function (){
	sesion();
    ajaxPHP('http://localhost/apiParse/WebServicesInmueble.php',{numero:1,numPage:1,paginacion:true},construirContenido);
});
