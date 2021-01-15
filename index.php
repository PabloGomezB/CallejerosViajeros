<?php session_start();
$_SESSION['username']="df";
print_r($_SESSION);
?>
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
    <header id="headhead" class="header">
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

    <!-- Full page content -->
    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar" class="active">
            <!-- Border -->
            <div class="borderAssets">
                <img class="pulpito" src="./img/sidebar/pulpitoSmall.gif" alt="cute pulpito" style="top:20px;"> 
                <span id="borderText" class="borderText">Login / registro</span>
                <img class="pulpito" src="./img/sidebar/pulpitoSmall.gif" alt="cute pulpito" style="top:440px;">
            </div>
            <!-- End border -->

            <!-- Forms -->
            <div id="formsIndex">
                <!-- Login -->
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
                <!-- End login -->

                <!-- Register -->
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
                <!-- End register -->
            </div>
            <!-- End forms -->
        </nav>
        <!-- End sidebar -->

        <!-- Page content -->
        <div id="content">
            
            <h1 id="enunciat">Vacances</h1>
            
            <div id="panell" style="display: none;">
                <h5 id="benvinguda"></h5>
            </div>

        </div>

        <div id="modalAdminCat"></div>

        <div id="modalAdminUser"></div>
        
        <!-- En este div se añade el modal que se crea dinamicamente para cada experiencia (moduleExperiencia: 200)-->
        <div id="divModal"></div>
        <!-- Este modal es la confirmacion de cuando el user va a eliminar una experiencia -->
        <div id="divModalConfirm"></div>
        
    </div>
    <?php
print_r($_SESSION);
if(!isset($_SESSION["username"])){
    echo "TONTOOOO";
}
else{echo "REGISTRADOOOOO :D";};
?>

    <!-- End full page content -->
    <script src="./js/moduleExperiencia.js"></script>
    <script src="./js/moduleNewExperiencia.js"></script>
    <!-- <script src="./js/moduleCategoria.js"></script> -->

</body>

</html>