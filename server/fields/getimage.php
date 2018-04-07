<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



$act="";
$response=array();
$temp_record=array();


$query = $mysqli->query("SELECT image FROM a_patient_photo WHERE `patient_id`= ". $_POST['patient_id']);
if($query){
	$r = $query->fetch_array();
	$pimage = $r['image'];
//$r2->free();
//$response=array('items'=>$temp_record, 'totalCount' => $count);
$response=array('pimage'=>base64_encode($pimage));

}
else
	$response=array('pimage'=>null);

echo  json_encode($response);
?>