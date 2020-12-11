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
        <div>
            <img src="./img/logo.png" alt="logo" class="logo">
        </div>
        <h1>Viajes Kolvin</h1>
    </header>

    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <li class="active">
                    <a href="#desplegableLogin" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebar-header">Login</a>
                    <ul class="collapse list-unstyled" id="desplegableLogin">
                        <li>
                            <?php include("includes/sidebarLogin.php") ?>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="list-unstyled components">
                <li class="active">
                    <a href="#desplegableRegistro" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle sidebar-header">Registro</a>
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
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-primary">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Log in !</span>
                    </button>
                </div>
            </nav>

            <div id="div">
                HEY
            </div>
        </div>
    
    </div>
    <!-- jQuery CDN - Slim version (=without AJAX) -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <!-- Popper.JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <!-- Bootstrap JS -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</body>

</html>