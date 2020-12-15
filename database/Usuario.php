<?php

require_once('DBAbstractModel.php');

class Usuario extends DBAbstractModel {
	private $idUser;
	private $nombre;
	private $apellidos;
	private $email;
	private $pass;

	function __construct() {
		$this->db_name = "a16miqboipos_pr";
	}

	function __toString() {
		// echo "entro string <br>";
		return "idUsu: " . $this->idUser . ", Nombre: " . $this->nombre . ", Apellidos: " . $this->apellidos . ", Email " .
			$this->email . ", Pass:" . $this->pass . ")";
	}

	function __destruct() {
		// unset ($this);
	}

	public function doLogin($userEmail = "", $pass) {
		if ($userEmail != "") {
			$this->query = "SELECT *
                    FROM Usuari
                    WHERE username='$userEmail' AND password='$pass'";
			$this->get_results_from_query();
		}
		// Any register selected
		if (count($this->rows) == 1) {
			// session_start();
			// $_SESSION['email']=$this->rows[0]['username'];
			$response = array('status' => 'OK', 'id' => $this->rows[0]["idUsu"], 'email' => $this->rows[0]["username"], 'password' => $this->rows[0]["password"], 'SESSION' => $_SESSION['email']);
			return json_encode($response);
		} else {
			return json_encode(array('status' => 'FAIL'));
		}
	}

	public function doRegister($nom, $cognom, $username, $pass){
		$this->query = "INSERT INTO Usuari (nom, cognom, username, password)
						VALUES ('$nom','$cognom','$username','$pass')";
		$this->execute_single_query();
		return $this->doLogin($username, $pass);
	}

	public function mostrarTot() {
		$this->query = "SELECT * FROM  contactes;";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			echo "<br><br>";
			echo "Email: " . $this->rows[$i]["email"] . "<br>";
			echo "Nom: " . $this->rows[$i]["nom"] . "<br>";
			echo "1r Cognom: " . $this->rows[$i]["cognom1"] . "<br>";
			echo "2n Cognom: " . $this->rows[$i]["cognom2"] . "<br>";
			echo "Telefon: " . $this->rows[$i]["telefon"] . "<br>";
			// foreach ($this->rows[$i] as $key => $value) {
			//   echo $value;
			// }
		}
	}

	public function select($userEmail = "") {
		if ($userEmail != "") {
			$this->query = "SELECT *
                    FROM contactes
                    WHERE email='$userEmail'";
			$this->get_results_from_query();
		}
	}

	public function insert($userData = array()) {
		/*CREO QUE HABRA DE CREAR LA FUNCION array_key_exists*/
		// echo "ESTO ES LA FUNCION INSERT";
		if (array_key_exists("email", $userData)) {
			$this->select($userData["email"]);
			if ($userData["email"] != $this->email) {
				foreach ($userData as $property => $value)
					$$property = $value;
				$this->query = "INSERT INTO contactes (email, nom, cognom1, cognom2, telefon)
					VALUES ('$email', '$nom', '$cognom1', '$cognom2', '$telefon')";
				$this->execute_single_query();
			}
		}
	}

	public function update($userData = array()) {
		foreach ($userData as $property => $value)
			$$property = $value;
		$this->query = "UPDATE contactes SET nom='$nom', cognom1= '$cognom1',
    cognom2 = '$cognom2', telefon = '$telefon' WHERE email='$email'";
		$this->execute_single_query($this->query);
	}

	public function delete($userEmail = "") {
		$this->query = "DELETE FROM contactes WHERE email ='$userEmail'";
		$this->execute_single_query($this->query);
		echo "<br>" . $userEmail . " ha sigut eliminat.";
	}
}

?>