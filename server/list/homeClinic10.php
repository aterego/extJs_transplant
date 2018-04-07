<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');
$act="";
$response=array();
$temp_record=array();


$result = $mysqli->query("SELECT c.clinicdesc AS clinic, c.clinic_id
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE  pc.category_id IN (43) AND c.country_id =4302
                                     GROUP BY c.clinic_id");


while($c = $result->fetch_array()){
	$temp_record[]=array(
		"clinic"=>$c['clinic'],
        "clinic_id"=>$c['clinic_id']
	);

}

$response = array('items' => $temp_record);
 echo  json_encode($response);

?>