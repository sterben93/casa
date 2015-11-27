<?php

/**
 * Clase api
 *
 * @author rous
 */
require './vendor/autoload.php';

use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseException;
use Parse\ParseClient;

class APIInmueble {

    /**
    * Inicializa la aplicacion de la base de datos de Parse
    */
    public static function inicializa() {
        try {
            ParseClient::initialize('ve3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is', 'zt0dVKAQwyRTAOFkfFj5d9jzDWAH9fjaJsUR5fhD', 'QpnJBJkOEp3VmEbcaAX8r6HDixj2wCUNQ42e1c4N');
        } catch (ParseException $ex) {
        }
    }

    /**
     * Crea la paginacion de la pagina con respecto a la cantidad de registros
     * @param type $query
     * @return objeto json
     */
    public function crearPaginacion($query) {
        try {
            $count = $query->count();
        } catch (ParseException $ex) {
            return json_encode([pag => 'Error en la Base de datos', error => $ex->getMessage()]);
        }
        $paguinacion = $count / 10;
        return json_encode([pag => $paguinacion]);
    }

    /**
     *
     * @param type $numPage
     * @param type $query
     * @return type
     */
    public function consultaInmuebles($numPage, $query) {
        $limite = $numPage * 10;
        $inicio = $limite - 9;

        $json = array();
        $jsonArray = array();

        $query->limit($limite);
        $resultado = $query->find();

        for ($i = $inicio; $i < count($resultado); $i++) {
            $inmueble = $resultado[$i];
            $id = $inmueble->getObjectId();
            $descripcion = $inmueble->get('descripcion');
            $precio = $inmueble->get('precio');
            $json['id'] = $id;
            $urlImg = urlImagen($inmueble);
            $json['descripcion'] = $descripcion;
            $json['precio'] = $precio;
            $json['url'] = $urlImg;
            $jsonArray[$i] = $json;
        }
        return $jsonArray;
    }

    /**
     * Devuelve una sola imagen de un inmueble, la primera.
     * @param type $inmueble
     * @return string $url
     */
    
    public function urlImagen($inmueble){
        $relation =  $inmueble ->getRelation("imagenes");
        $query = $relation ->getQuery(); 
        $imagen= $query->first();
        $imag= $imagen->get("imagen");
        return $imag->getUrl();
    }
    /*public function urlImagen($inmueble) {
        $query = new ParseQuery('ImagenesDelInmueble');
        $query->equalTo("inmuebleId", $inmueble);
        $imagen = $query->first();
        $imgId = $imagen->get('imagenId')->getObjectId();

        $queryImage = new ParseQuery('Imagenes'); //esto era innecesario, bastaba llamar a imgId->fetch (sin antes llamar a getObjectId para obtener $object
        $queryImage->equalTo("objectId", $imgId);
        $object = $queryImage->first();
        $urlImg = $object->get('imagen')->getUrl();
        return $urlImg;
    }*/
    /**
     * Devuelve todas las imagenes asociadas con un inmueble, 
     * las devuelve en un arreglo de URLs.
     * @param type $inmueble
     * @return type
     */
    public function urlImagenes($inmueble){
        $relation =  $inmueble ->getRelation("imagenes");
        $query = $relation ->getQuery(); 
        $imagenes= $query->find();
        $fin= count($imagenes);
        $resp=[];
        for($i=0;$i< $fin;$i++){
            $imag= $imagenes[$i]->get("imagen");
            $resp[]=$imag->getUrl();
        }
        /*for($i=0;$i< $fin;$i++){
            echo "<img src= " . $resp[$i]. " > <br>";
        }*/
        return $resp;
    }
    /**
    * 
    * @param type $id
    * @return type
    */
    public function inmueble($id) {
        $query = new ParseQuery('Inmueble');
        $query->equalTo("objectId", $id);
        $inmueble = $query->first();

        $jsonInmueble = [servicio => $inmueble->get('servicio'),
            direccion => $inmueble->get('direccion'),
            colonia => $inmueble->get('colonia'),
            codigoPostal => $inmueble->get('codigoPostal'),
            cuartos => $inmueble->get('numeroCuartos'),
            banos => $inmueble->get('numeroBathrooms'),
            estacionamientos => $inmueble->get('numeroEstacionamientos'),
            plantas => $inmueble->get('numeroPlantas'),
            precio => $inmueble->get('precio'),
            descripcion => $inmueble->get('descripcion'),
            fechaPublicacion => $inmueble->getCreatedAt(),
            disponible => $inmueble->get('disponible')
        ];

        return $jsonInmueble;
    }


    public function reguistraInmueble($inmueble) {
        $inmuebleO = new ParseObject('Inmueble');
        $inmuebleO->set('servicio',$inmueble->getServicio());
        $inmuebleO->set('direccion',$inmueble->getDireccion());
        $inmuebleO->set('colonia',$inmueble->getColonia());
        $inmuebleO->set('codigoPostal',$inmueble->getCodigoPostal());
        $inmuebleO->set('numeroCuartos',$inmueble->getNumeroCuartos());
        $inmuebleO->set('numeroBaños',$inmueble->getNumeroBanos());
        $inmuebleO->set('numeroEstacionamiento',$inmueble->getNumeroEstacionamientos());
        $inmuebleO->set('numeroPlantas',$inmueble->getNumeroPlantas());
        $inmuebleO->set('precio',$inmueble->getPrecio());
        $inmuebleO->set('descripcion',$inmueble->getDescripcion());
        $inmuebleO->set('fechaPublicacion',$inmueble->getFechaPublicacion());
        $inmuebleO->set('disponible',$inmueble->getDisponible());
        $inmuebleO->set('idArrendador',$inmueble->getIdArrendador());
        try {
            $inmueble->save();
            return 'reguistro existoso';
        } catch (ParseException $ex) {
            return $ex->getMessage();
        }
    }

    /**
     * [[Description]]
     */
    public function reguistraImagen() {
        $imagen = new ParseObject('Imagenes');
        $imagen->set();
        $imagen->set();
        $imagen->set();
        $imagen->set();
        $imagen->set();
        $imagen->set();
        try {
            $imagen->save();
        } catch (ParseException $ex) {

        }
    }
    
    /**
     * [[Description]]
     * @param [[Type]] $inmueble [[Description]]
     * @param [[Type]] $imagenes [[Description]]
     */
    public function registraImgIn($inmueble, $imagenes) {

    }
    /**
     * use este metodo para pasar las imagenes de la tabla ImagenesDelInmueble, 
     * a la relacion que esta en la tabla inmueble, columna imagenes
     */
    public static function migrarImagenes(){
        $queryInmuebles= new ParseQuery("Inmueble");
        $inmuebles= $queryInmuebles->find();
        $fin=count($inmuebles);
        for($i=0;$i <$fin;$i++){
            echo "Inmueble: ". $inmuebles[$i]->get("direccion")." tiene imagen:<br>";
            Inmueble::migrarImagenesInmueble($inmuebles[$i]);
        }
    }
    private static function migrarImagenesInmueble($inmueble){
        $queryTabla= new ParseQuery("ImagenesDelInmueble");
        $queryTabla ->equalTo("inmuebleId",$inmueble);
        $imagenes= $queryTabla->find();
        $fin=count($imagenes);
        $relacion= $inmueble->getRelation("imagenes");
        
        for($i=0;$i<$fin;$i++){
            $imagId = $imagenes[$i]->get("imagenId");
            $imagId ->fetch();
            
            
            $relacion->add($imagId);
            //muestra
            $imagen= $imagId ->get("imagen");
            echo "<img src= ".$imagen->getUrl(). "> <br>";
        }
        $inmueble->save();
    }/**
     * Agrega la $imagen a el $inmueble dado, usando el campo de relacion 
     * (no la tabla de punteros).
     * @param type $inmueble
     * @param type $imagen
     */
    public function agregaImagenAInmueble($inmueble, $imagen){
        //$consulta= new ParseQuery("Inmueble"); //este es un ejemplo de como agregar una imagen.
        //$inmueble = $consulta->get("Wkz7fvW6qG");
        //$consulta= new ParseQuery("Imagenes");
        //$imagen= $consulta->first();
        $relacion= $inmueble->getRelation("imagenes");
        $relacion->add($imagen);
        $inmueble->save();
    }
}
echo 'hola';
?>
