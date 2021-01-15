<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Usuario.php');

$contacte = new Usuario();
$response = $contacte->doLogin($_REQUEST["email"], $_REQUEST["pass"]);
$_SESSION['username']="df";
echo $response;

?>