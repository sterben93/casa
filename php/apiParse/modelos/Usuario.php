<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Usuario
 *
 * @author rous
 */
class Usuario {

    private $tipo; //('persona fisica', 'persona moral')
    private $nombre;
    private $email;
    private $password;

    public function __construct($tipo, $nombre, $email, $password) {
        $this->tipo = $tipo;
        $this->nombre = $nombre;
        $this->email = $email;
        $this->password = $password;
    }
    public function getTipo() {
        return $this->tipo;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPassword() {
        return $this->password;
    }
}
