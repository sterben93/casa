<?php

/**
 * Clase api
 *
 * @author rous
 */
require './vendor/autoload.php';
require './modelos/Usuario.php';


use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseException;
use Parse\ParseClient;

class APIInmueble {

    private $app_id = 've3SsAciKVt8GwhmLDCzW9rQ6EkPj8ai3pWcp3Is';
    private $rest_key = 'zt0dVKAQwyRTAOFkfFj5d9jzDWAH9fjaJsUR5fhD';
    private $master_key = 'QpnJBJkOEp3VmEbcaAX8r6HDixj2wCUNQ42e1c4N';

    /**
     * Inicializa la aplicacion de la base de datos de Parse
     */
    public static function inicializa() {
        ParseClient::initialize($this->app_id, $this->rest_key, $this->master_key);
    }

    public function crearPaginacion($query) {
        $count = $query->count();
        $paguinacion = $count / 10;
        return $paguinacion;
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
     *
     * @param type $inmueble
     * @return type
     */
    public function urlImagen($inmueble) {
        $query = new ParseQuery('ImagenesDelInmueble');
        $query->equalTo("inmuebleId", $inmueble);
        $imagen = $query->first();
        $imgId = $imagen->get('imagenId')->getObjectId();

        $queryImage = new ParseQuery('Imagenes');
        $queryImage->equalTo("objectId", $imgId);
        $object = $queryImage->first();
        $urlImg = $object->get('imagen')->getUrl();
        return $urlImg;
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
            numeroCuartos => $inmueble->get('numeroCuartos'),
            numeroBanos => $inmueble->get('numeroBanos'),
            numeroEstacionamientos => $inmueble->get('numeroEstacionamientos'),
            numeroPlantas => $inmueble->get('numeroPlantas'),
            precio => $inmueble->get('precio'),
            descripcion => $inmueble->get('descripcion'),
            fechaPublicacion => $inmueble->get('fechaPublicacion'),
            disponible => $inmueble->get('disponible')
                //idArrendador checar lo de la realcion
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

}
echo 'hola';
?>
