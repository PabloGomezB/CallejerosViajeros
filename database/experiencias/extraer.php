<?php 
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');
require_once('../Experiencia.php');

$exp = new Experiencia ();
$experiencias = $exp->mostrarTot();

// echo $experiencias[0]["titulo"];

// for ($i=0; $i < count($experiencias); $i++) { 
//     echo "<br><br>Img: ".$experiencias[$i]["titulo"]."<br>Descripcion".$experiencias[$i]["descripcion"]."<br>Likes: ".$experiencias[$i]["likes"]."<br>Dislikes: ".$experiencias[$i]["dislikes"];
//     // foreach ($experiencias[$i] as $key => $value) {
//     //     echo $experiencias[$i][$key];
//     // }
// }

echo json_encode($experiencias);
?>