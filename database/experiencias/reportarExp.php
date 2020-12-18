<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$exp->reportarExp($_REQUEST['idUsu']);
$experiencias = $exp->mostrarTot();
echo json_encode($experiencias);
?>