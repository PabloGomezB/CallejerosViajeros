<?php 
    header("Access-Control-Aloow-Origin: *");
    header("Content-Type: text/html; charset=utf8");

    require_once('../Experiencia.php');

    $exp = new Experiencia ();
    $exp->reportarExp($_REQUEST['idUsu']);
    $experiencias = $exp->mostrarTot();
    echo json_encode($experiencias);
?>