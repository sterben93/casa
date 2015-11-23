<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of APIUsuario
 *
 * @author rous
 */
require 'vendor/autoload.php';
require 'modelos/Usuario.php';
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

use Parse\ParseUser;
use Parse\ParseException;
use Parse\ParseClient;

class APIUsuario {

    /**
     * Autentica al usuario y lo convierte en el usuario actual, si la autenticacion
     * fue exitosa devuelve el usuario, si no, devuelve un mensaje de error.
     * @param type $usuario el nombre del usuario
     * @param type $contraseña la contraseña del usuario
     * @return usuario | string
     */
    public static function inicializa() {
        try {
            ParseClient::initialize('ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is', 'zt0dVKAQwyRTAOFkfFj5d9jzDWAH9fjaJsUR5fhD', 'QpnJBJkOEp3VmEbcaAX8r6HDixj2wCUNQ42e1c4N');
        } catch (ParseException $ex) {

        }
    }

    public static function iniciarSesion($usuario, $contraseña) {

        try {
            $user = ParseUser::logIn($usuario, $contraseña);
            return json_encode([logeo => 1, id => $user->getObjectId()]);
        } catch (ParseException $ex) {
            if ($ex->getCode() == 101) {
                return json_encode([logeo => 0, error => "Error: El usuario o la contraseña es incorrecta"]);
            } else {
                return json_encode([logeo => 0, error => "Error: " .$ex->getCode()]);
            }
        }
    }

    /**
     * Registra a un usuario nuevo tomando sus datos, si todo fue bien retorna el
     * objeto conteniendo al usuario, si no, retorna un mensaje de error.
     * @param type $nombre nombre del usuario
     * @param type $contraseña su contraseña
     * @param type $email el email del usuario
     * @param type $tipo el tipo de usuario (1 persona fisica, 2 persona moral).
     * @return \ParseUser
     */
    public static function reguistraUsuario($usuario) {
        $user = new ParseUser();
        $user->set("username", $usuario->getNombre());
        $user->set("password", $usuario->getPassword());
        $user->set("email", $usuario->getEmail());
        $user->set("tipo", $usuario->getTipo());

        try {
            $user->signUp();
            return json_encode([reg=>1,mensaje=>'Usuario registrado']);
        } catch (ParseException $ex) {
            if ($ex->getCode() == 203) {
                return json_encode([reg=>0,mensaje=>"La direccion email " . $usuario->getEmail() . " ya esta ocupada"]);
            } else if ($ex->getCode() == 202) {
                return json_encode([reg=>0,mensaje=>"El nombre de usuario " . $usuario->getNombre() . " ya esta ocupado"]);
            } else {
                return json_encode([reg=>0,mensaje=>"Error: " . $ex->getCode() . " " . $ex->getMessage()]);
            }
        }
    }

    /**
     * Metodo para borrar un usuario, se necesita autenticar con su usuario y contraseña,
     * si no es correcta envia un mensaje de error.
     * @param type $usuario
     * @param type $contraseña
     * @return ParseUser|string
     */
    public static function borrarUsuario($usuario, $contraseña) {
        $user = iniciarSesion($usuario, $contraseña);
        if ($user instanceof ParseUser) {
            $user->destroy();
            return "Usuario borrado";
        }
        return $user;
    }
    public static function usuarioActual(){
        return ParseUser::getCurrentUser();
    }
    public static function cerrarSesion(){
        ParseUser::logOut();
    }
    public static function reiniciarContraseña($email){
        try {
            ParseUser::requestPasswordReset($email);
            return true;
        } catch (ParseException $ex) {
            return false;
        }
    }
    /**
     * Permite que $usuario le otorgue una calificacion ($calificacion) a otro usuario, en este 
     * caso a $usuarioCalificado. Si el usuario ya califico previamente a ese usuario,
     * su calificacion anterior se borra.
     * @param type $usuario quien asigna la calificacion
     * @param type $usuarioCalificado a quien se le asignara la calificacion
     * @param type $calificacion la calificacion a asignar 
     */
    public function calificaUsuario($usuario, $usuarioCalificado, $calificacion){
        $calificacionAct=APIUsuario::existeCalificacion($usuario, $usuarioCalificado);
        if ($calificacionAct!=null) {
            $calificacionAct->destroy();
        }
        $calif= new ParseObject("Calificaciones");
        $calif->set("calificacion", $calificacion);
        $calif->set("idUsuario", $usuario);
        $calif->set("idUsuarioCalificado",$usuarioCalificado);
        
        $calif->save();
    }
    /**
     * Si existe una calificacion dada por $usuario a $usuarioC, devuelve este
     * registro, el metodo calificaUsuario lo usa para no repetir las calificaciones.
     * @param type $usuario
     * @param type $usuarioC
     * @return type
     */
    private function existeCalificacion($usuario,$usuarioC){
        $query = new ParseQuery("Calificaciones");
        $query ->equalTo("idUsuario", $usuario);
        $query ->equalTo("idUsuarioCalificado", $usuarioC);
        $calif= $query ->find();
        if (count($calif) >= 1) {
            return $calif[0];
        }
        return null;
    }
    /**
     * Devuelve el promedio de calificaciones que tiene actualmente $usuario, 
     * o nulo, si no tiene ninguna calificacion.
     * @param type $usuario
     * @return int|nulo
     */
    public function getCalificacionUsuario($usuario){
        $query = new ParseQuery("Calificaciones");
        $query ->equalTo("idUsuarioCalificado", $usuario);
        $calif= $query->find();
        $fin= count($calif);
        //echo "hay ".$fin." calificaciones <br>";
        if ($fin == 0) {
            return null;
        }
        $promedio= 0;
        for($i=0;$i<$fin;$i++){
            $promedio += $calif[$i]->get("calificacion");
        }
        return $promedio / $fin;
    }
    /**
     * Cuando el $usuario quiera rentar/comprar una casa ($inmueble), se mandara a llamar este metodo,
     * el cual se encargara de mandarle la notificacion al arrendador de que alguien 
     * quiere rentar su casa, y guardara esto en la tabla UsuarioVeDatosCasa, con un valor 
     * de false en la columna "validado", y se pondra en true hasta que el arrendador autorize 
     * que el usuario pueda ver sus datos (correo y nombre).
     * @param type $usuario
     * @param type $inmueble
     * @return string
     */
    public function usuarioSolicitaCasa($usuario, $inmueble){
        if(APIUsuario::yaSolicito($usuario, $inmueble)){
            return "Ya solicitaste los datos de este inmueble";
        }
        $arrendador = $inmueble->get("idUsuario");
        $arrendador->fetch();
        //echo " arrendador ". $arrendador->get("username") ."<br>";
        
        $mail= $usuario->get("email");
        $asunto= "Tienes un cliente en confort house!";
        $txt= "Hola ". $usuario->get("username")."! Nos es grato informarte que te hemos conseguido\n"
            ." un cliente esperando contactarse contigo para rentar/comprar tu casa en "
            .$inmueble->get("direccion").".\nPara ponerte en contacto con el entra ya a conforthouse!.\n";
        
        echo "<br>".$mail. "<br>";
        APIUsuario::enviarNotificacion($mail, $asunto, $txt);
        $peticion =  new ParseObject("UsuarioVeDatosCasa");
        $peticion->set("idInmueble", $inmueble);
        $peticion->set("idUsuario", $usuario);
        $peticion->set("arrendador",$arrendador);
        $peticion->set("validado",false);
        $peticion->save();
        if($inmueble->get("activado")){
            APIUsuario::autorizarContacto($inmueble);
        }
        return "Gracias por usar confort house, los datos del arrendador se te transferiran en cuanto este autorize la solicitud";
    }
    /**
     * Envia una notificacion al usuario de que alguien quiere rentar su casa.
     * @param type $usuario
     * @param type $inmueble
     */
    private function enviarNotificacion($mail,$asunto,$txt){
        $email = new PHPMailer;
        //Enable SMTP debugging. 
        $email->SMTPDebug = 0;                               
        //Set PHPMailer to use SMTP.
        $email->isSMTP();            
        //Set SMTP host name                          
        $email->Host = "smtp.gmail.com";
        //Set this to true if SMTP host requires authentication to send email
        $email->SMTPAuth = true;                          
        //Provide username and password     
        $email->Username = "manu.ang6587@gmail.com"; /*cambiar esto, si pones tu cuenta de google te dira que bloqueo esta aplicacion, tienes que activar el uso de aplicaciones no seguras para que esto jale*/
        $email->Password = "";  
        //If SMTP requires TLS encryption then set it
        $email->SMTPSecure = "tls";
        //Set TCP port to connect to 
        $email->Port = 587;                                   
        $email->From = "conforthouse@gmail.com";
        $email->FromName = "Confort house";
        $email->addAddress($mail, "Recepient Name");
        $email->isHTML(false);
        $email->Subject = $asunto;
        $email->Body = $txt;
        $email->AltBody = $txt;
        if(!$email->send()){
            echo "Mailer Error: " . $email->ErrorInfo;
        }
    }
    /**
     * Se asegura que si el usuario pide ver los datos de una casa, esta relacion no exista.
     * Retorna true si la relacion ya existe, false si no.
     * @param type $usuario
     * @param type $inmueble
     * @return boolean
     */
    private function yaSolicito($usuario, $inmueble){
        $peticion =  new ParseQuery("UsuarioVeDatosCasa");
        $peticion->equalTo("idUsuario", $usuario);
        $peticion->equalTo("idInmueble", $inmueble);
        $resp= $peticion->find();
        if(count($resp)==0){
            return false;
        }else return true;
    }
    /**
     * Devuelve todos los usuarios que se han interesado en alguna casa del 
     * $arrendador y que aun no se ha autorizado su contact. Los datos se devuelven
     * en forma de relacion de la tabla UsuarioVeDatosCasa, contiene idInmueble
     * (el inmueble que le intereso al usuario), idUsuario (el usuario interesado),
     * y arrendador (el usuario dueño del inmueble).
     * @param type $arrendador
     * @return type
     */
    public function getNotificacionesArrendador($arrendador){
        $query =  new ParseQuery("UsuarioVeDatosCasa");
        $query->equalTo("arrendador", $arrendador);
        $query->equalTo("validado",false);
        $query->ascending("idUsuario"); //importante
        $res= $query->find();
        $fin= count($res);
        for($i=0;$i<$fin;$i++){ 
            $user= $res[$i]->get("idUsuario");
            $inm = $res[$i]->get("idInmueble");
            $user->fetch(); $inm->fetch(); //imprimo el usuario con fines de debugeo, cuando se le notifique al arrendador no se le mostrara quien es
            echo "El usuario ". $user->get("username"). " se interesa en la casa que esta en "; //para evitar que se contacten entre ellos
            echo $inm->get("direccion").". <br>"; //solo se mostrara que alguien quiere rentar esa casa
        }
        return $res;
    }
    /**
     * Autoriza el contacto con las personas que se interesen por la compra o
     * renta del $inmueble, mandandoles un correo a todas ellas. Se mandara a 
     * llamar este metodo cuando el usuario pague por ese inmueble en particular.
     * @param type $inmueble
     */
    public function autorizarContacto($inmueble){
        $arrendador= APIUsuario::usuarioActual();
        if (!$arrendador->isAuthenticated()) {
            return false;
        }
        $inmueble->set("activado", true);
        $query = new ParseQuery("UsuarioVeDatosCasa");
        $query->equalTo("idInmueble", $inmueble);
        $query->equalTo("arrendador", $arrendador);
        $query->equalTo("validado", false);
        $res= $query->find();
        $fin =count($res);
        for($i=0;$i<$fin;$i++){ 
            //$res[$i]-> fetch();
            $user= $res[$i]->get("idUsuario");
            $user->fetch();
            $mail= $user->get("email");
            $asunto = "El arrendador de la casa que solicitaste se quiere contactar contigo!";
            $txt="Hola! " . $user->get("username"). ", Nos complase informarte que el usuario ". $arrendador->get("username")
                    ." ha desidido contactarse contigo y llegar a un acuerdo para la venta/renta de su casa ubicada en "
                    .$inmueble->get("direccion").". Puedes ponerte en contacto con el a traves de este correo: "
                    .$arrendador->get("email");
            APIUsuario::enviarNotificacion($mail,$asunto,$txt);
            echo "se envio correo informativo a ". $mail. " con el contenido: <br>". $txt." <br>";
            $res[$i]->set("validado", true);
            $res[$i]->save();
        }
    }
    /**
     * Devuelve todas las personas con las que se ha contactado, ya sea con clientes
     * o con otros arrendadores.
     * @param type $usuario
     */
    public function getContactos($usuario){
        
    }
}
