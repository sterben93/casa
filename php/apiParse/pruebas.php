<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            require 'vendor/autoload.php';
            //require 'APIUsuario.php';
            //require 'APIInmueble.php';
            use Parse\ParseClient;
            ParseClient::initialize('ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is', 'zt0dVKAQwyRTAOFkfFj5d9jzDWAH9fjaJsUR5fhD', 'QpnJBJkOEp3VmEbcaAX8r6HDixj2wCUNQ42e1c4N');
            use Parse\ParseObject;
            use Parse\ParseQuery;
            use Parse\ParseUser;
            
            /*$pars = new ParseObject("TestObject");
            $pars->set("foo","asd");
            $pars->save();*/
            
            /********************** Pruebas con los usuarios ******************/
            /* creando un usuario*/
            /*$result= APIUsuario::registrarUsuario("cuenta de prueba", "123","prueba@hotmail.com",1);
            if($result instanceof ParseUser){
                echo 'Registro satisfactorio del usuario '. $result->get("username")."<br>";
            }else {
                echo $result."<br>";
            }*/
            
            /*Usar el usuario logeado*/
            /*$actual= APIUsuario::usuarioActual();
            if($actual!=null){
                echo "El usuario actual es ".$actual->getUserName()." correo: ".$actual->get("email")."<br>";
            }else {echo "Ningun usuario conectado<br>";}
            /*cerrar sesion
            APIUsuario::cerrarSesion();*/
            
            //$objeto= $consulta->get("Dxl8ifn73z");
            //$objeto->destroy();
            
            muestraUsuarios();
            //calificaUsuario(); innercircle1
            //getCalificacionUsuario(); luzvivanco1#
            //solicitaCasa();
            
            notificacionesArrendador();
            autorizarContactos();
            function autorizarContactos(){
                iniciaSesion();
                $query = new ParseQuery("Inmueble");
                $inmueble = $query->get("ECBYtmXxj6");
                APIUsuario::autorizarContacto($inmueble);
            }
            function notificacionesArrendador(){
                $query = new ParseQuery("_User");
                $user= $query->get("LLLdzjvZ44"); 
                APIUsuario::getNotificacionesArrendador($user);
            }
            function solicitaCasa(){
                $query = new ParseQuery("Inmueble");
                $inmueble = $query->get("ECBYtmXxj6");
                $query = new ParseQuery("_User");
                $user= $query->get("p4Zy5A64pY"); 
                $resp= APIUsuario::usuarioSolicitaCasa($user, $inmueble);
                echo $resp;
            }
            function guardaImagenRelacion(){
                $consulta= new ParseQuery("Inmueble");
                $inmueble = $consulta->get("Wkz7fvW6qG");
                $consulta= new ParseQuery("Imagenes");
                $imagen= $consulta->first();        
                $relacion= $inmueble->getRelation("imagenes");
                $relacion->add($imagen);
                $inmueble->save();
            }
            function calificaUsuario(){
                $query = new ParseQuery("_User");
                $usuario =  $query->get("X8gPmNBW1R");
                $usuarioCalificado= $query->get("xfRgPRI2Ta");
                APIUsuario::calificaUsuario($usuario,$usuarioCalificado, 6);
            }
            function getCalificacionUsuario(){
                $query = new ParseQuery("_User");
                $usuario= $query->get("xfRgPRI2Ta");
                $calif= APIUsuario::getCalificacionUsuario($usuario);
                echo "El usuario ".$usuario->get("username");
                if($calif==null){
                    echo " no tiene calificaciones<br>";
                }else{
                    echo " tiene la calificacion de ". $calif. " <br>";
                }
                
            }
            function consultaVariasImagenes(){
                $consulta= new ParseQuery("Imagenes");
                $objetos= $consulta->find();
                for($i=0;$i<count($objetos);$i++){
                    echo "<img src= ". $objetos[$i]->get("imagen")->getUrl() . " > <br>";
                    //$objetos[$i]->destroy();
                }
            }
            function getImagenesInmuebles(){
                $consulta= new ParseQuery("Inmueble");
                $inmueble = $consulta->get("ECBYtmXxj6");
                APIInmueble::getImagenesInmueble($inmueble);
            }
            function muestraUsuarios(){
                $consulta= new ParseQuery("_User");
                //$consulta->equalTo("tipo",1);
                try{
                    $objetos=$consulta->find();
                } catch (ParseException $ex) {
                    echo "No funciono ". $ex;
                }
                echo "se encontraron " . count($objetos). " resultados <br>";
                for($i=0;$i<count($objetos);$i++){
                    echo $objetos[$i]->get("username")."<br>";
                    //$objetos[$i]->destroy();
                }
            }
             /*iniciar sesion*/
            function iniciaSesion(){
                $usuario = APIUsuario::iniciarSesion("Manuel Angel Muñoz Solano", "1234");
                if($usuario instanceof ParseUser){
                    echo '<br>Bienvenido ' . $usuario->getUsername() ."<br>";
                }else {
                    echo $usuario."<br>";
                }
            }
            function migraImagenes(){
                APIInmueble::migrarImagenes();
                //APIInmueble::migrarImagenesInmueble($inmueble);
            }
        ?>
    </body>
</html>
