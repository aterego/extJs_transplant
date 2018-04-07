<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');
$act="";
$response=array();
$temp_record=array();


// count the Dates
//AND YEAR( FROM_UNIXTIME( t.`date` ) ) > YEAR( DATE_SUB( NOW( ) , INTERVAL 12 YEAR ) )
$result = $mysqli->query("SELECT DISTINCT YEAR( FROM_UNIXTIME( t.`date` ) ) AS year
                          FROM `a_transplantations` t
                          INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id = t.`patient_id`
                          LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                          WHERE `category_id` IN ( 43, 44 ) AND c.country_id =4302
                          
                          ORDER BY year ASC");


while($y = $result->fetch_array()){
	$years_array[]=array(
		"year"=>$y['year'],
	);

}







		$j=0;

		foreach ($years_array as $y) {


			$query = $mysqli->query("SELECT COUNT( * ) AS count
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE YEAR( FROM_UNIXTIME( t.`date` ) ) = " .$y['year']
                                     . " AND pc.category_id =43 AND c.country_id =4302");

            $row =  $query->fetch_assoc();
            $liv = $row['count'];


            $query = $mysqli->query("SELECT COUNT( * ) AS count
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE YEAR( FROM_UNIXTIME( t.`date` ) ) = " .$y['year']
                . " AND pc.category_id =44 AND c.country_id =4302");

            $row =  $query->fetch_assoc();
            $kd = $row['count'];

            //***AVA*** this query fetches data only from the transplantation table
            /*
            $query = $mysqli->query("SELECT MAX(t.`date`) AS last
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE pc.category_id in (43,44)  AND c.country_id =4302");
            */
            //***AVA*** this one fetches from all tables where a date is present
            /*
            $query = $mysqli->query("SELECT GREATEST(MAX(t1.`date`), MAX(t2.`date`), MAX(t3.`date`), MAX(t4.`date`), MAX(t5.`date`),
                                                     MAX(t6.`date`), MAX(t7.`date`), MAX(t8.`date`)) AS last
                                      FROM `a_patient_category` AS t1 
                                      LEFT JOIN `a_patient_dialysis` AS t2 ON t1.patient_id = t2.patient_id 
                                      LEFT JOIN `a_patient_history` AS t3 ON t1.patient_id = t3.patient_id 
                                      LEFT JOIN `a_patient_instrumental` AS t4 ON t1.patient_id = t4.patient_id 
                                      LEFT JOIN `a_patient_labaratory` AS t5 ON t1.patient_id = t5.patient_id 
                                      LEFT JOIN `a_patient_removals` AS t6 ON t1.patient_id = t6.patient_id 
                                      LEFT JOIN `a_patient_treatment` AS t7 ON t1.patient_id = t7.patient_id 
                                      LEFT JOIN `a_transplantations` AS t8 ON t1.patient_id = t8.patient_id 
                                     ");
           */

            $query = $mysqli->query("SELECT GREATEST(MAX(t1.`date`), MAX(t2.`date`)) AS last
                                      FROM `a_patient_category` AS t1 
                                      LEFT JOIN `a_transplantations` AS t2 ON t1.patient_id = t2.patient_id 
                                     ");

            $row =  $query->fetch_assoc();
            $last = $row['last'];

			$temp_record[$j] = array(
					"year" => $y['year'],
					"liv" => $liv,
                    "kd" => $kd,
                    "last"=>(abs($last)< 1000)? "-" : date('d.m.Y', $last)
			);

            
           // $file = 'd:\people.txt';
           // file_put_contents($file, $kd."<br>",FILE_APPEND);


			$j++;

		}





	//$r2->free();
	$response = array('items' => $temp_record);
	//$response=$temp_record;
	//array_push($response,array('totalCount' => 1421));




//print_r($response);

    echo  json_encode($response);



?>