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
    <link rel="stylesheet" type="text/css" media="screen" href="./css/footer.css" />
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




    <!-- Start footer -->
    <footer class="container-fluid footer">
        <!-- Divisor -->
        <div class="divisor row mt-5 p-5 px-3 mb-5 d-flex justify-content-between">
            <div>
                <span class="mr-5 font-weight-bold">Ready to get started?</span>
                <span class="d-none d-md-inline-block">Get in touch to discuss your cybersecurity needs</span>
            </div>
            <div>
                <span class="d-none d-sm-inline-block">JOIN NOW</span>
            </div>
        </div>
        <!-- End Divisor -->

        <!-- Upper Container -->
        <div class="container-fluid px-0">
            <div class="row">
                <!-- Links -->
                <div class="row col-sm-8 px-0">
                    <!-- Company -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">COMPANY</h6>
                        <ul class="list-unstyled mt-3">
                            <li class="mb-2">
                                <a class="footer-links" href="#">About us</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Certification</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Customer Stories</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Partners</a>
                            </li>
                        </ul>
                    </div>

                    <!-- About -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">ABOUT</h6>
                        <ul class="list-unstyled mt-3">
                            <li class="mb-2">
                                <a class="footer-links" href="#">Privacy Policy</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Cookie Policy</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Terms of Use</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Get in touch -->
                    <div class="col col-md-auto mr-5">
                        <h6 class="font-weight-bold footer-ul">
                            GET IN TOUCH
                        </h6>
                        <ul class="list-unstyled mt-3">
                            <li class="mb-2">
                                <a class="footer-links" href="#">Contact us</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Jobs</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Locations</a>
                            </li>
                        </ul>
                    </div>

                    <!-- Technical support -->
                    <div class="col col-md-auto">
                        <h6 class="font-weight-bold footer-ul">
                            TECHNICAL SUPPORT
                        </h6>
                        <ul class="list-unstyled mt-3">
                            <li class="mb-2">
                                <a class="footer-links" href="#">Incident?</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Communities</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Contact Support</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Customer Portal</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Documentation Portal</a>
                            </li>
                            <li class="mb-2">
                                <a class="footer-links" href="#">Report Security Issue</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End Links -->

                <!-- Media -->
                <div class="col-sm-4 px-0 ml-4">
                    <div class="float-right">
                        <div class="mb-4">
                            <p class="footer-media-title mb-0">
                                GIFT DEMO CARDS
                            </p>
                            <p class="footer-media-text">
                                Give a Demo Today
                            </p>
                        </div>
                        <div>
                            <p class="footer-media-title mb-0">
                                SOCIAL MEDIA
                            </p>
                            <p class="footer-media-text">
                                Give a Demo Today
                            </p>
                        </div>
                        <div class="">
                            <a class="mr-3" href="#"><i class="fab fa-twitter fa-lg text-dark"></i></a>
                            <a class="mr-3" href="#"><i class="fab fa-facebook-f fa-lg text-dark"></i></a>
                            <a href="#"><i class="fab fa-instagram fa-lg text-dark"></i></a>
                        </div>
                    </div>
                </div>
                <!-- End Media -->
            </div>
        </div>
        <!-- End Upper Container -->

        <!-- Lower Container -->
        <div class="container-fluid mt-5 mb-5 px-0">
            <div class="row">
                <div class="col-sm-6 px-0">
                    <p class="mb-0">
                        <span class="mr-2 footer-bottom-grail" style="color: #000F14;">GRAIL</span><span
                            class="footer-bottom-grail" style="color: #BDBDBD;">CYBERTECH</span>
                    </p>
                    <p class="footer-bottom-copyright">
                        &copy; Grail 2021. All rights reserved
                    </p>
                </div>
                <div class="col-sm-6 px-0">
                    <p class="footer-bottom-text">
                        SECURITY FOR EVERYONE
                    </p>
                </div>
            </div>
        </div>
        <!-- End Lower Container -->
    </footer>
    <!-- End footer -->












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