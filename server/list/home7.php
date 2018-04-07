<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');
$act="";
$response=array();
$temp_record=array();



			// count the Data Liv
			$result = $mysqli->query("SELECT COUNT( * ) AS count, c.clinicdesc AS clinic, c.clinic_id
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE  pc.category_id IN (43) AND c.country_id =4302");

			$row =  $result->fetch_assoc();//
			$total = $row['count'];


            $result = $mysqli->query("SELECT COUNT( * ) AS count, c.clinicdesc AS clinic, c.clinic_id
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE  pc.category_id IN (43) AND c.country_id =4302
                                     GROUP BY c.clinic_id");


            while($c = $result->fetch_array()) {

                $temp_record[] = array(
                    "name" => $c['clinic'],
                    "value" => $c['count'],
                    "percent" => number_format($c['count'] / $total * 100, 2)
                );


				//$r2->free();
				$response=array('items'=>$temp_record);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));


            }





//print_r($response);

    echo  json_encode($response);



?>