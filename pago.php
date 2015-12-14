<!DOCTYPE html>
<html lang="es" ng-app="">

<head>
    <meta charset="utf-8">
    <meta name="description" content="Realiza la búsqueda de casa, departamento que deseas de tu gusto">
    <meta name="author" content="Ivan Romero Garcia">
    <meta name="keywords" content="casas, departamentos, renta, venta, pensión">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pagina</title>
    <link rel="stylesheet" href="css/styleindex.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/progression.css">
    <script type="text/javascript" src="js/angular.min.js"></script>
    <script type="text/javascript" src="js/angular-route.min.js"></script>
    <script type="text/javascript" src="js/jquery-1.11.2.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/progression.js"></script>
    <script type="text/javascript" src="js/funciones.js"></script>
    <script type="text/javascript" src="js/pago.js"></script>
</head>

<body>
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
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-10 col-md-offset-3 col-md-6 col-lg-6">
                <p>Para rea lizar la liberacion de contactos potenciales es necesario pagar una cuota por la publicacion de
                    $50
                </p>
                <p>Tipo de pagos:
                    <img src="img/visa.png" alt="logo de visa" height="50" width="100">
                    <img src="img/mastercard.png" alt="logo de master card" height="50" width="100">
                </p>
                <form action="" method="POST" role="form" id="formularioPago">
                    <div class="form-group">
                        <label for="">Número de tarjeta</label>
                        <input type="text" class="form-control" required data-progression data-helper="Se encuentra en la parte inferiror del chip de la tarjeta" required>
                        <label for="">Fecha de vencimiento</label>
                        <input type="number" class="form-control" required data-progression data-helper="Se localiza en la parte superir del Nombre del titular de la tarjeta con" required>
                        <label for="">Código de verificación de la tarjeta</label>
                        <input type="number" class="form-control" required data-progression data-helper="En MasterCard y Visa son los tres ultimos digitos del area de firma de la parte posteriro de la trajeta" required placeholder="mm/aaaa">
                        <label for="">Fecha de nacimiento</label>
                        <input type="text" class="form-control" required data-progression data-helper="La ley nos exige que recopilemos esta informacion" required placeholder="dd/mm/aaaa">
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
                <p>
                    <br/>Informacion del contacto
                    <br/> </p>
                <p>conforthouse@outlook.com</p>
            </div>
        </div>
    </div>
    <!--Footer es extraido del archivo footer de la aplicacion-->
    <footer id="foot" class="row" ng-include src="'footer.html'">

    </footer>
    <!--Con este script me permite integrar plantillas a mi paguina html con angularjs-->
    <script>
        var miAPlicacion = angular.module('include',[]);
    </script>
</body>

</html>
