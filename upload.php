<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: text/html; charset-utf-8');

// print_r($_FILES);

if ( 0 != $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    // echo 'hola';
    $path = 'img/experiencias/uploads/';
    $file = $path . $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'], $file);
    echo $_FILES['file']['name'];
}

// if (move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES['file']['name'])) {
//     // echo "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded.";

//     echo json_encode($_FILES['file']['name'] . "yyooyo");
// } else {
//     // echo "Sorry, there was an error uploading your file.";
//     echo json_encode("Error desconocio. Problema con el labs");
// }

?>