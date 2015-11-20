/**
 * Inicializa el comportamiento del inicio de sesion
 */
$(document).ready(function (){
    $('#iniciar').click(function (){
        usuario=$("#usuario").val();
        password=$("#password").val();
        json={'numero':1,'usuario':usuario,'password':password};
        funcion=inicioSesion;
        ajaxPHP('http://localhost/apiParse/WebServicesUsuario.php',json,funcion);
    });
});

function inicioSesion(json){
    if(json.logeo==1){
        $cookie('sesion','true');
        $cookie('id',json.id);
        window.location.href="index.html";
        window.location.reload;
    }else{
        $(mensaje).html('<p>'+json.error+'<p>');
    }
}
