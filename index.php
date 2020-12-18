<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php include("includes/includes.inc") ?>
    <title>Index</title>
    <script src="./js/index.js"></script>
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>

    <header class="header">
        <button type="button" id="sidebarCollapse" class="btn btn-primary subirButton">
            <i class="fas fa-sign-in-alt"></i>
            <span>Log in !</span>
        </button>
        <div class="containerImage">
            <img src="./img/trip.png" class="banner">
            <!-- <div class="banner2"><span></span></div> -->
            <div class="middle">
                <div class="textContainer">
                    <span class="text">
                        Callejeros Viajeros
                    </span>
                </div>
            </div>
        </div>
    </header>

    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <li class="active">
                    <a id="dropDownLogin" href="#desplegableLogin" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle sidebar-header">Login</a>
                    <ul class="collapse list-unstyled" id="desplegableLogin">
                        <li>
                            <?php include("includes/sidebarLogin.php") ?>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="list-unstyled components">
                <li class="active">
                    <a id="dropDownRegistro" href="#desplegableRegistro" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebar-header">Registro</a>
                    <ul class="collapse list-unstyled" id="desplegableRegistro">
                        <li>
                            <?php include("includes/sidebarRegister.php") ?>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <!-- End sidebar -->
        <div id="content">
            
    <!-- START CODE RAFA -->
            <h1 id="enunciat">Vacances</h1>
            
            <div id="panell" style="display: none;">
                <h5 id="benvinguda"></h5>
            </div>
    <!-- END CODE RAFA -->

        </div>
    
    </div>
    
    <script src="./js/moduleExperiencia.js"></script>
</body>

</html>