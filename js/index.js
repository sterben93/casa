/* global $cookie */
/* global texto */
/* global $removeCookie */
/* global menu2 */
/* global menu1 */

$(document).ready(function (){
	sesion();
    ajaxPHP('http://localhost/apiParse/pruebas.php',{numero:1},construirContenido);
});
