<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
require './modelos/APIUsuario.php';

use APIUsuario;

APIUsuario::inicializa();
$num = $_POST['numero'];

switch ($num) {
    //Inicia sesion de un usuario en la aplicacion web
    case 1:
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];
        echo APIUsuario::iniciarSesion($usuario, $password);
        break;
    //Cierra la sesion del usuario actual en la aplicicion web
    case 2:
        echo APIUsuario::cerrarSesion();
        break;
    //Reguistra un usuario en la base de datos de Parse
    case 3:
        $tipo = $_POST['tipo'];
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $usuario = new Usuario((int) $tipo, $nombre, $email, $password);
        echo APIUsuario::reguistraUsuario($usuario);
        break;
    case 4:
        break;
    case 5:
        break;
}
?>
