<!DOCTYPE html>
<html lang="es" ng-app="">

<head>
    <meta charset="utf-8">
    <meta name="description" content="Realiza la búsqueda de casa, departamento que deseas de tu gusto">
    <meta name="author" content="Ivan Romero Garcia">
    <meta name="keywords" content="casas, departamentos, renta, venta, pensión">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Conform House</title>
    <link rel="stylesheet" href="css/styleindex.css">
    <link rel="stylesheet" href="css/stylehouse.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/jcarousel.responsive.css">
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-route.min.js"></script>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.jcarousel.js"></script>
    <script type="text/javascript" src="js/jcarousel.responsive.js"></script>
    <script type="text/javascript" src="js/jquery-1.11.2.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="http://www.parsecdn.com/js/parse-latest.js"></script>
    <script type="text/javascript" src="js/funciones.js"></script>
    <script type="text/javascript" src="js/inmueble.js"></script>
</head>
<body>
    <!--header es extraido del archivo header de las plantillas-->
    <header>
        <nav class="navbar navbar-default" data-spy="affix" data-offset-top="197">
            <div class="container-fluid buscador">
                <div class="navbar-header  ">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html">
                        <p class="letras">Conform House</p>
                    </a>
                </div>
                <div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <span class="glyphicon glyphicon-user dropdown-toggle icon" data-toggle="dropdown">
                        <span class="caret"></span>
                                </span>
                                <ul class="dropdown-menu">
                                    <li class="menu1"><a href="login.html">Entrar</a></li>
                                    <li class="divider menu1"></li>
                                    <li class="menu1"><a href="registro.html">Registrate</a></li>
                                    <li id="publica" class="menu2"><a href="user.html">Publica</a></li>
                                    <li class="divider menu2"></li>
                                    <li id="favoritos" class="menu2"><a href="user.html">Favoritos</a></li>
                                    <li class="divider menu2"></li>
                                    <li id="anuncios" class="menu2"><a href="user.html">Mi Perfil</a></li>
                                    <li class="divider menu2"></li>
                                    <li id="notificaciones" class="menu2"><a href="user.html">Notificaciones</a></li>
                                    <li class="divider menu2"></li>
                                    <li class="menu2"><a href="index.html" id="cerrar">Salir</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <div class="container-fluid row ">
        <div class="container col-xs-12 col-sm-9 col-md-9 col-lg-9">
            <div class="row">
                <div class="col-xs-12 col-sm-offset-2 col-sm-6 col-md-6 col-lg-6">
                    <div class="wrapper">
                        <div class="jcarousel-wrapper">
                            <div class="jcarousel">
                                <ul id="imagenes">

                                </ul>
                            </div>
                            <a href="#" class="jcarousel-control-prev">&lsaquo;</a>
                            <a href="#" class="jcarousel-control-next">&rsaquo;</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-offset-2 col-sm-9 col-md-9 col-lg-9 contenido">
                    <h3>Descripcion:</h3>
                    <p id="descripcion" class="text-justify">
                    </p>
                    <h4>Servicio:</h4>
                    <p id="servicio" class="text-justify">

                    </p>
                    <h4>Direccion:</h4>
                    <p id="direccion" class="text-justify">

                    </p>
                    <h4>Colonia:</h4>
                    <p id="colonia" class="text-justify">

                    </p>
                    <h4>Codigo Postal:</h4>
                    <p id="codigo_postal" class="text-justify">

                    </p>
                    <h4>Numero de Cuartos:</h4>
                    <p id="cuartos" class="text-justify">

                    </p>
                    <h4>Numero de Baños:</h4>
                    <p id="banos" class="text-justify">

                    </p>
                    <h4>Numero de Estacionamientos:</h4>
                    <p id="estacionamientos" class="text-justify">

                    </p>
                    <h4>Numero de Plantas:</h4>
                    <p id="plantas" class="text-justify">

                    </p>
                    <h4>Precio: </h4>
                    <p id="precio" class="text-justify">

                    </p>
                    <h4>Fecha Publicacion:</h4>
                    <p id="fecha" class="text-justify">

                    </p>
                    <h4>Disponible:</h4>
                    <p id="disponible" class="text-justify">

                    </p>
                </div>
                <div class="col-xs-12 col-sm-offset-2 col-sm-9 col-md-9 col-lg-9">
                    <button id="btfavorito" type="button" class="btn btn-large btn-block btn-default" style="background:#82b214" >Agregar a favoritos</button>
                </div>
            </div>
        </div>
        <div id="contacto" class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
            <img class="img-responsive imagen" src="img/icon-email.png" alt="Chania">
                <button id="btContacto" class="btn btn-primary">Contactame</button>
        </div>
    </div>

    <!--Footer es extraido del archivo footer de las plantillas-->
    <footer id="foot" class="row" ng-include src="'footer.html'">

    </footer>
    <!--Con este script me permite integrar plantillas a mi paguina html con angularjs-->
    <script>
        var miAPlicacion = angular.module('include',[]);
    </script>
</body>

</html>
