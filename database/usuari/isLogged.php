<?php
session_start();

if(isset($_SESSION['username'])){
    if(!empty($_SESSION['username'])){
        $array = array('username' => $_SESSION["username"], 'password' => $_SESSION["password"], 'isAdmin' => $_SESSION["isAdmin"]);
        echo json_encode($array);
    }
}
?>