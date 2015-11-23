<?php
require 'vendor/autoload.php';
require 'modelos/Usuario.php';

use Parse\ParseUser;
use Parse\ParseException;
use Parse\ParseClient;

class APIUsuario {

    /**
     * Inicializa la conexion a la base de datos de Parse
     */
    public static function inicializa() {
        try {
            ParseClient::initialize('ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is', 'zt0dVKAQwyRTAOFkfFj5d9jzDWAH9fjaJsUR5fhD', 'QpnJBJkOEp3VmEbcaAX8r6HDixj2wCUNQ42e1c4N');
        } catch (ParseException $ex) {
            echo 'Error en Parse';
        }
    }

    /**
     * Autentica al usuario y lo convierte en el usuario actual, si la autenticacion
     * fue exitosa devuelve el usuario, si no, devuelve un mensaje de error.
     * @param type $usuario el nombre del usuario
     * @param type $contraseña la contraseña del usuario
     * @return objeto json
     */
    public static function iniciarSesion($usuario, $contraseña) {
        try {
            $user = ParseUser::logIn($usuario, $contraseña);
            return json_encode([logeo => 1, id => $user->getObjectId()]);
        } catch (ParseException $ex) {
            if ($ex->getCode() == 101) {
                return json_encode([logeo => 0, error => "Error: El usuario o la contraseña es incorrecta"]);
            } else {
                return json_encode([logeo => 0, error => "Error: " . $ex->getMessage()]);
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
     * @return objeto json
     */
    public static function reguistraUsuario($usuario) {
        $user = new ParseUser();
        $user->set("username", $usuario->getNombre());
        $user->set("password", $usuario->getPassword());
        $user->set("email", $usuario->getEmail());
        $user->set("tipo", $usuario->getTipo());
        try {
            $user->signUp();
            return json_encode([reg => 1, mensaje => 'Usuario registrado']);
        } catch (ParseException $ex) {
            if ($ex->getCode() == 203) {
                return json_encode([reg => 0, mensaje => "La direccion email " . $usuario->getEmail() . " ya esta ocupada"]);
            } else if ($ex->getCode() == 202) {
                return json_encode([reg => 0, mensaje => "El nombre de usuario " . $usuario->getNombre() . " ya esta ocupado"]);
            } else {
                return json_encode([reg => 0, mensaje => $ex->getMessage()]);
            }
        }
    }

    /**
     * Cierra la sesion del usuario actual
     * @return objeto json
     */
    public static function cerrarSesion() {
        try {
            ParseUser::logOut();
            return json_encode(['sesion' => 1]);
        } catch (Exception $ex) {
            return json_encode(['sesion' => 0, 'error' => $ex->getMessage()]);
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
        $calificacionAct=Usuario::existeCalificacion($usuario, $usuarioCalificado);
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
}
