/**
 * Inicializa el comportamiento del inicio de sesion
 */
$(document).ready(function (){
    $('#iniciar').click(function (){
        usuario=$("#usuario").val();
        password=$("#password").val();
        json={'numero':1,'usuario':usuario,'password':password};
        alert(json.password);
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',json);
    });
});
