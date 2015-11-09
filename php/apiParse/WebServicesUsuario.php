<?php
    require 'APIUsuario.php';
    use APIUsuario;
    APIUsuario::inicializa();
    $num=$_POST['numero'];

    switch ($num){
        //logeo
        case 1:
            $usuario=$_POST['usuario'];
            $password=$_POST['password'];
            //echo json_encode([logeo=>$usuario]);
            echo APIUsuario::iniciarSesion($usuario,$password);
            break;
        //cerrar sesion
        case 2:
            echo json_encode([mensaje=>'si funciona el cerrar sesion']);
            break;
        //reguistro de usuario
        case 3:
            $tipo=$_POST['tipo'];
            $nombre=$_POST['nombre'];
            $email=$_POST['email'];
            $password=$_POST['password'];
            echo json_encode([mensaje=>'si funciona el reguistro de usuario']);
            break;
  }
?>
