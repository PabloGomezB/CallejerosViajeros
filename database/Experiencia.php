<?php
require_once('DBAbstractModel.php');

class Experiencia extends DBAbstractModel {
	private $img;
	private $titulo;
	private $descripcion;
	private $likes;
	private $dislikes;

	function __construct() {
		$this->db_name = "a16miqboipos_pr";
	}

	function __destruct() {
		// unset ($this);
	}

	public function mostrarTot() {
		$experiencias = array();
		$this->query = "SELECT * FROM  Experiencia;";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {

			$idCat = $this->rows[$i]["idCat"];

			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);

			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}

	public function mostrarEsbozos(){
		$experiencias = array();
		$this->query = "SELECT * FROM  Experiencia WHERE estat='esborrany';";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			$idCat = $this->rows[$i]["idCat"];
			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);

			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}

	public function getNomCategoria($idCat) {
		$this->query = "SELECT nom FROM Categoria WHERE idCat = $idCat;";
		$this->get_results_from_query();
		return $this->rows[0]["nom"];
	}

	public function updateLikes($idExp, $likes, $dislikes) {
		$this->query = "UPDATE Experiencia SET likes='$likes', dislikes= '$dislikes'
        WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function rebutjarExperiencia($idExp) {
		$this->query = "UPDATE Experiencia SET estat='rebutjada' WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function updateEstado($idExp){
		$this->query = "UPDATE Experiencia SET estat='publicada' WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function updateExperiencia($idExp, $newTitulo, $newFecha, $newTexto, $newImg) {
		$this->query = "UPDATE Experiencia SET titol='$newTitulo', data='$newFecha', text='$newTexto', imatge='$newImg'
        WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function eliminarExperiencia($idCard) {
		$this->query = "DELETE FROM Experiencia WHERE idExp ='$idCard'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function	reportarExperiencia($idCard) {
		$this->query = "UPDATE Experiencia SET reportat='1'
        WHERE idExp='$idCard'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function anadirExp($titol, $text, $imatge, $coordenades, $idCat, $username) {
		// $titol = $nuevaExp["titol"];
		// $text = $nuevaExp["text"];
		// $imatge = $nuevaExp["imatge"];
		// $coordenades = $nuevaExp["coordenades"];
		// $idCat = $nuevaExp["categoria"];
		// $username = $nuevaExp["username"];

		$this->query = "INSERT INTO Experiencia (titol, data, text, imatge, coordenades, likes, dislikes, estat, idCat, username, reportat) VALUES ('$titol', CURDATE(), '$text', '$imatge', '$coordenades', 0, 0, 'publicada', $idCat, '$username', false)";
		$this->execute_single_query($this->query);
		return "ALGO" . $imatge;
	}
}
