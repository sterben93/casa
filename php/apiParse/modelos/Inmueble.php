<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Inmueble
 *
 * @author rous
 */
class Inmueble {
    private $servicio;//('venta', 'renta', 'pension', 'a tratar')
    private $direccion;
    private $colonia;
    private $codigoPostal;
    private $numeroCuartos;
    private $numeroBanos;
    private $numeroEstacionamientos;
    private $numeroPlantas;
    private $precio;
    private $descripcion;
    private $fechaPublicacion;
    private $disponible;
    private $idArrendador;

    public function __construct($servicio, $direccion, $colonia, $codigoPostal,
                                $numeroCuartos, $numeroBanos, $numeroEstacionamientos,
                                $numeroPlantas, $precio, $descripcion, $fechaPublicacion,
                                $disponible, $idArrendador) {

        $this->servicio = $servicio;
        $this->direccion = $direccion;
        $this->colonia = $colonia;
        $this->codigoPostal = $codigoPostal;
        $this->numeroCuartos = $numeroCuartos;
        $this->numeroBanos = $numeroBanos;
        $this->numeroEstacionamientos = $numeroEstacionamientos;
        $this->numeroPlantas = $numeroPlantas;
        $this->precio = $precio;
        $this->descripcion = $descripcion;
        $this->fechaPublicacion = $fechaPublicacion;
        $this->disponible = $disponible;
        $this->idArrendador = $idArrendador;
    }

    public function getServicio() {
        return $this->servicio;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function getColonia() {
        return $this->colonia;
    }

    public function getCodigoPostal() {
        return $this->codigoPostal;
    }

    public function getNumeroCuartos() {
        return $this->numeroCuartos;
    }

    public function getNumeroBanos() {
        return $this->numeroBanos;
    }

    public function getNumeroEstacionamientos() {
        return $this->numeroEstacionamientos;
    }

    public function getNumeroPlantas() {
        return $this->numeroPlantas;
    }

    public function getPrecio() {
        return $this->precio;
    }

    public function getDescripcion() {
        return $this->descripcion;
    }

    public function getFechaPublicacion() {
        return $this->fechaPublicacion;
    }

    public function getDisponible() {
        return $this->disponible;
    }

    public function getIdArrendador() {
        return $this->idArrendador;
    }
}
