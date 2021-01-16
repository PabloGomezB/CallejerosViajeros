<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia();

// Util para las funciones utilizadas para paginar
$numTotalExperiencias = $exp->getTotalExperiences();

// Si existe "page" quiere decir que el usuario quiere cambiar de pagina
if (isset($_REQUEST['page'])) {
    $page = $_REQUEST['page'];
    if(!empty($page)){

        $nextPage = $exp->muestraOtraPagina($page, $numTotalExperiencias);
        echo json_encode($nextPage);
    }
}

// Si existe homePage quiere decir que es la primera vez que se accede a la pagina y por lo tanto se crea el navegador entre paginas
if (isset($_REQUEST['homePage'])) {
    if(!empty($_REQUEST['homePage'])){
        echo $exp->setNavegadorPaginas($numTotalExperiencias);
    }
}
// Por el contrario quiere decir que el user ya ha entrado por lo que la barra de paginar ya existe
else{
    $numTotalExperiencias = $exp->muestraExperienciasPaginadas($numTotalExperiencias);
    echo json_encode($numTotalExperiencias);
}


// $experiencias = $exp->mostrarTot();
// echo json_encode($experiencias);





?>