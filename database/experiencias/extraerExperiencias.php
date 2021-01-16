<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia();

$numTotalExperiencias = $exp->getTotalExperiencias();
echo json_encode($numTotalExperiencias);

// $experiencias = $exp->mostrarTot();
// echo json_encode($experiencias);
?>