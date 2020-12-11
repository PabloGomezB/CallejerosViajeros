<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html; chart-utf-8');

if ($_REQUEST['user']=='rafael' && $_REQUEST['pass']=='rafael') {
    $response = array('status' => 'ok', 'name' => 'Rafael');
} else if ($_REQUEST['user']=='miquel' && $_REQUEST['pass']=='miquel') {
    $response = array('status' => 'ok', 'name' => 'Miquel');
} else if ($_REQUEST['user']=='pablo' && $_REQUEST['pass']=='pablo') {
    $response = array('status' => 'ok', 'name' => 'Pablotoootonto');
} else if ($_REQUEST['user']=='jordi' && $_REQUEST['pass']=='jordi') {
    $response = array('status' => 'ok', 'name' => 'Master');
} else {
    $response = array('status' => 'fail');
}

echo json_encode($response);

?>