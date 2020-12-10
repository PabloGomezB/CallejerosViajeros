<?php
	require_once('Usuario.php');

	if (isset($_POST["submit"])) {
		$seguent = true;
		foreach ($_POST as $clave => $valor) {
			if (empty($_POST[$clave])) {
				echo "<br>" . $clave . " esta vuit.";
				$seguent = false;
			}
		}

		if ($seguent) {
			// echo "Continua.";
			$contacte = new Usuario();
			$contacte->mostrarUsuari($_POST["email"]);
		}
	}

?>