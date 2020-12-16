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
			// echo "idExp: ".$this->rows[$i]["idExp"]."<br>";
			// echo "titol: ".$this->rows[$i]["titol"]."<br>";
			// echo "data: ".$this->rows[$i]["data"]."<br>";
			// echo "text: ".$this->rows[$i]["text"]."<br>";
			// echo "imatge: ".$this->rows[$i]["imatge"]."<br>";
			// echo "coordenades: ".$this->rows[$i]["coordenades"]."<br>";
			// echo "likes: ".$this->rows[$i]["likes"]."<br>";
			// echo "dislikes: ".$this->rows[$i]["dislikes"]."<br>";
			// echo "estat: ".$this->rows[$i]["estat"]."<br>";
			// echo "idCat: ".$this->rows[$i]["idCat"]."<br>";
			// echo "idUsu: ".$this->rows[$i]["idUsu"]."<br>";

			$idExp = $this->rows[$i]["idExp"];
			$titol = $this->rows[$i]["titol"];
			$data = $this->rows[$i]["data"];
			$text = $this->rows[$i]["text"];
			$imatge = $this->rows[$i]["imatge"];
			$coordenades = $this->rows[$i]["coordenades"];
			$likes = $this->rows[$i]["likes"];
			$dislikes = $this->rows[$i]["dislikes"];
			$estat = $this->rows[$i]["estat"];
			$idCat = $this->rows[$i]["idCat"];
			$idUsu = $this->rows[$i]["idUsu"];

			$exp = array(
				"idExp" => $idExp, 'titol' => $titol, 'data' =>  $data, 'text' => $text,
				'imatge' => $imatge,
				'coordenades' => $coordenades,
				'likes' => $likes,
				'dislikes' => $dislikes,
				'estat' => $estat,
				'idCat' => $idCat,
				'idUsu' => $idUsu
			);

			array_push($experiencias, $exp);

			// foreach ($this->rows[$i] as $key => $value) {
			//   echo "  /  ".$value;
			// }
		}
		return json_encode($experiencias);
	}

	public function updateLikes($idExp, $likes, $dislikes) {
		$this->query = "UPDATE Experiencia SET likes='$likes', dislikes= '$dislikes'
        WHERE idExp='$idExp'";
		$exito = $this->execute_single_query($this->query);
		if(!$exito){
			return "FAIL";
		}else{
			return "OK";
		}
		// foreach ($userData as $property => $value)
		//   $$property = $value;
		// $this->query = "UPDATE experiencia SET likes='$likes', dislikes= '$dislikes'
		// WHERE idExp='$idExp'";
		// $this->execute_single_query($this->query);
	}




	public function deleteExp($idExp = "") {
		$this->query = "DELETE FROM Experiencia WHERE idExp ='$idExp'";
		$this->execute_single_query($this->query);
	}

	// public function mostrarTot (&$img, &$titulo, &$descripcion, &$likes, &$dislikes) {
	//     $this->query = "SELECT * FROM  experiencia;";
	//     $this->get_results_from_query();
	//     for ($i=0; $i < count($this->rows); $i++) { 
	//       // echo "idExp: ".$this->rows[$i]["idExp"]."<br>";
	//       $img = $this->rows[$i]["imagen"];
	//       $titulo = $this->rows[$i]["titulo"];
	//       $descripcion = $this->rows[$i]["descripcion"];
	//       $likes = $this->rows[$i]["likes"];
	//       $dislikes = $this->rows[$i]["dislikes"];
	//       // foreach ($this->rows[$i] as $key => $value) {
	//       //   echo $value;
	//       // }
	//     }
	// }


	// public function mostrarTotPrueba () {
	//     $this->query = "SELECT * FROM  experiencia;";
	//     $this->get_results_from_query();
	//     for ($i=0; $i < count($this->rows); $i++) { 
	//       echo "<br><br>";
	//       echo "idExp: ".$this->rows[$i]["idExp"]."<br>";
	//       echo "Titulo: ".$this->rows[$i]["titulo"]."<br>";
	//       echo "Descripcion: ".$this->rows[$i]["descripcion"]."<br>";
	//       echo "Likes: ".$this->rows[$i]["likes"]."<br>";
	//       echo "Dislikes: ".$this->rows[$i]["dislikes"]."<br>";
	//       // foreach ($this->rows[$i] as $key => $value) {
	//       //   echo $value;
	//       // }
	//     }
	// }
}
