<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");

/*
SELECT o.`patient_id` , c.`country_id`
FROM `a_transplantations` o
LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
INNER JOIN `a_patient_category` ca ON ca.patient_id = o.`patient_id`
WHERE ca.`category_id`
IN ( 41, 42, 43, 44, 65 )
AND c.`country_id` IS NULL
LIMIT 0 , 30
*/







$limit = $_POST['limit']; //the pagesize
$start = $_POST['start']; //Offset

date_default_timezone_set('Asia/Tbilisi');

$act="";
$response=array();
$temp_record=array();



			// count the Data Liv
			$result = $mysqli->query("SELECT COUNT(  id) AS count 
                                        FROM
                                        (
                                          SELECT pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                           `a_patient_category` pc
                                           GROUP BY id
                                        ) AS p
                                        INNER JOIN `a_transplantations` o ON o.patient_id=p.id
                                        LEFT JOIN `categories` cat ON cat.category_id = p.m
                                        LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
                                        LEFT JOIN `a_countries` co ON co.`country_id` = c.`country_id`
                                        WHERE cat.parent_category_id Not in(29,30,51)  
                                        ORDER BY `p`.`id` ASC");

			$row =  $result->fetch_assoc();//
			$total = $row['count'];


			// count the Data Liv
			$result = $mysqli->query("SELECT COUNT( id) AS count , co.`name` AS name
                                        FROM
                                        (
                                          SELECT pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                           `a_patient_category` pc
                                           GROUP BY id
                                        ) AS p
                                        INNER JOIN `a_transplantations` o ON o.patient_id=p.id
                                        LEFT JOIN `categories` cat ON cat.category_id = p.m
                                        LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
                                        LEFT JOIN `a_countries` co ON co.`country_id` = c.`country_id`
                                        WHERE cat.parent_category_id Not in(29,30,51)  
                                        GROUP BY co.`country_id` ORDER BY name");


            while($c = $result->fetch_array()) {

                $temp_record[] = array(
                    "name" => $c['name'],
                    "value" => $c['count'],
                    "percent" => number_format($c['count'] / $total * 100, 2)
                );


				//$r2->free();
				$response=array('items'=>$temp_record);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));


            }


echo  json_encode($response);
?>