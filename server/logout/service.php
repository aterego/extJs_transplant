<?php
session_start();
session_destroy();
$response = array( 'success'=>true, 'data'=>true );	
echo  json_encode($response);
?>