<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST');

    require './APIInmueble.php';
    require './modelos/Inmueble.php';

    $num=$_POST['numero'];

    switch ($num){
        //consulta Todo
        case 1:
            echo json_encode([mensaje=>'colsultatodo']);
            break;
        //cosulta busqueda por filtros
        case 2:
            $preciomin=$_POST["preciomin"];
            $preciomax=$_POST["preciomax"];
            $cuartos=$_POST["cuartos"];
            $banos=$_POST["banos"];
            $recamaras=$_POST["recamaras"];
            $plantas=$_POST["plantas"];
            echo json_encode([mensaje=>'si funciona la consulta pro filtros']);
            break;
        //consulta busqueda
        case 3:
            $tipoInmueble=$_POST["inmueble"];
            $oferta=$_POST["oferta"];
            $colonia=$_POST["colonia"];
            echo json_encode([mensaje=>'si funciona la busqueda']);
            break;
        //consulta inmueble
        case 4:
            $id=$_POST['id'];
            echo json_encode([mensaje=>'si funciona la consulta por inmueble']);
            break;
        //reguistro de inmueble
        case 5:
            echo json_encode([mensaje=>'si funciona el reguistro del inmueble']);
            break;
    }
?>
