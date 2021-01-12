<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$_REQUEST['idUsu']
$novaExp = array (
    "titol" => $_REQUEST['titol'],
                "data" => $_REQUEST["data"],
                text: $_REQUEST["text"],
                imatge: $_REQUEST["imatge"],
                coordenades: $_REQUEST["coordenades"],
                categoria: $_REQUEST["categoria"],
                likes: $_REQUEST["likes"],
                dislikes: $_REQUEST["dislikes"],
                estat: $_REQUEST["estat"]
);


$exp->anadirExp($novaExp);

$experiencias = $exp->mostrarTot();


echo json_encode($experiencias);
?>