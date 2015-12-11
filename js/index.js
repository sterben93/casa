/* global Parse */
/* global sesion */
/* global $cookie */

$(document).ready(constriurIndex);

/**
 * Funcion para crear el contenido al abrir el contenido
 */
function constriurIndex(){
    sesion();
    Parse.initialize("ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is", "KW6EKtE5UC6cNj2RWfOyHfGKCA4B8FHG4fV0A0oq");
    var limite = 10;
    var inicio = 0;
    var inmueble = Parse.Object.extend("Inmueble");
    var query = new Parse.Query(inmueble);
    query.descending("createdAt");
    query.limit(limite);
    consulta(query,inicio);
}
