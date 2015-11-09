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
        $usuario->set("email", $usuario->getEmail());
        $user->set("tipo", $usuario->getTipo());

        try {
            $user->signUp();
            return 'Usuario reguistrado';
        } catch (ParseException $ex) {
            if ($ex->getCode() == 203) {
                return "La direccion email " . $usuario->getEmail() . " ya esta ocupada";
            } else if ($ex->getCode() == 202) {
                return "El nombre de usuario " . $usuario->getNombre() . " ya esta ocupado";
            } else {
                return "Error: " . $ex->getCode() . " " . $ex->getMessage();
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

}
