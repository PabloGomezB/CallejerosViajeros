<?php 

print_r($_FILES);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['files'])) {
        $errors = [];
        $path = 'uploads/';
	    $extensions = ['jpg', 'jpeg', 'png', 'gif'];
        
        
        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {  
            // Obtenim nom, tipus i mida
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            $file_error = $_FILES['files']['error'][$i];
            // Comprovar l'extensio
            $tmp = explode('.', $_FILES['files']['name'][$i]);
            $file_ext = strtolower(end($tmp));

            $file = $path . $file_name;

            // print_r($file_name);
            // print_r($file_tmp);
            // print_r($file_type);
            // print_r($file_size);
            // print_r($file_error);

            // check extensio file
            if (!in_array($file_ext, $extensions)) {
                $errors[] = "No es permet l'extensió: " . $file_name . ' ' . $file_type;
            }

            // check no més de 2 megabytes en bytes
            if ($file_size > 2097152) {
                $errors[] = 'La mida del fitxer supera el límit: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                if (!$file_error) {
                    print_r('tot be');
                    // file i desti
                    move_uploaded_file($file_tmp, $file);
                }
            }
        }

        if ($errors) print_r($errors);
    }
}