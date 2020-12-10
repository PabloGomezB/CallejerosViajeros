<?php

// // Campos no validos
// $emailErr = $passErr = "";
// // Campos correctos
// $email = $pass = "";

// if ($_SERVER["REQUEST_METHOD"] == "POST") {

//     $email = limpiarString($_POST["email"]);
//     if (!preg_match("/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/", $email)) {
//         $emailErr = "El correo no es valido, revisa los caracteres";
//     }

//     $pass = limpiarString($_POST["pass"]);
// }

// function limpiarString($string) {
//     $string = trim($string);
//     $string = stripslashes($string);
//     $string = htmlspecialchars($string);
//     return $string;
// }

require_once('./database/Usuario.php');

// if (isset($_POST["submit"])) {
    $seguent = true;
    // print_r($_POST);
    foreach ($_POST as $clave => $valor) {
        // if (empty($_POST[$clave])) {
        //     echo "<br>" . $clave . " esta vuit.";
        //     $seguent = false;
        // }
    }

    if ($seguent) {
        // echo "Continua.";
        $contacte = new Usuario();
        $contacte->mostrarUsuari($_POST["email"]);
    }
// }

// echo "<h2>Respuestas formulario:</h2>";

// $span = "<span style='font-weight:bold'>";
// $error = "<span style='font-weight:bold; color: red;'>";

// if (!empty($emailErr)) {
//     echo $error . "Error en el nombre: </span>" . $emailErr . " => [" . $email . "]";
// } else {
//     echo $span . "Correo: </span>" . $email;
// }
// echo "<br>";
// if (!empty($passErr)) {
//     echo $error . "Error en la contraseña: </span>" . $passErr . " => [" . $pass . "]";
// } else {
//     echo $span . "Contraseña: </span>" . $pass;
// }


?>