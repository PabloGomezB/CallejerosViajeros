<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Usuario.php');

$email = $_REQUEST["email"];
$contacte = new Usuario();
$response = $contacte->buscarUser($email);
echo $response;
?>