<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");

$limit = $_POST['limit']; //the pagesize
$start = $_POST['start']; //Offset

date_default_timezone_set('Asia/Tbilisi');

$act="";
$response=array();
$temp_record=array();
if(isset($_GET['act'])){
	if(!empty($_GET['act'])){
		$act=$_GET['act'];	
	}else{
		//respon error
		$response=array('success'=>false,'data'=>false);	
	}
}else{
	//respon error
	$response=array('success'=>false,'data'=>false);	
}

if(!empty($act)){
	$mod="tab-group_";
	switch($act){
		case "View":


			// count the Data Liv
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM(
                       SELECT id
                        FROM
                        (
                          SELECT   p0.`patient_id` as id,  max(`a_patient_category`.`category_id`) as m FROM 
                          (
                             SELECT o.* 
                              FROM `a_transplantations` o   
                              LEFT JOIN `a_transplantations` b            
                              ON o.`patient_id` = b.`patient_id` AND o.`fc` < b.`fc`
                              WHERE b.`fc` is NULL   
                          ) AS p0
                         INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id=p0.`patient_id`
                         WHERE  `category_id` in (43,59)  group by id 
                        ) AS p 
                        WHERE p.m<>59 GROUP BY p.id 
                       ) AS co");

			$row =  $result->fetch_assoc();//
			$liv = $row['count'];

			// count the Data Htx
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM(
                       SELECT id
                        FROM
                        (
                          SELECT   p0.`patient_id` as id,  max(`a_patient_category`.`category_id`) as m FROM 
                          (
                             SELECT o.* 
                              FROM `a_transplantations` o   
                              LEFT JOIN `a_transplantations` b            
                              ON o.`patient_id` = b.`patient_id` AND o.`fc` < b.`fc`
                              WHERE b.`fc` is NULL   
                          ) AS p0
                         INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id=p0.`patient_id`
                         WHERE  `category_id` in (65,68)  group by id 
                        ) AS p 
                        WHERE p.m<>68 GROUP BY p.id 
                       ) AS co");

			$row =  $result->fetch_assoc();//
			$htx = $row['count'];

			// count the Data Kd
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM(
                       SELECT id
                        FROM
                        (
                          SELECT   p0.`patient_id` as id,  max(`a_patient_category`.`category_id`) as m FROM 
                          (
                             SELECT o.* 
                              FROM `a_transplantations` o   
                              LEFT JOIN `a_transplantations` b            
                              ON o.`patient_id` = b.`patient_id` AND o.`fc` < b.`fc`
                              WHERE b.`fc` is NULL   
                          ) AS p0
                         INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id=p0.`patient_id`
                         WHERE  `category_id` in (44,57)  group by id 
                        ) AS p 
                        WHERE p.m<>57 GROUP BY p.id 
                       ) AS co");

			$row =  $result->fetch_assoc();//
			$kd = $row['count'];

			   $total = $liv + $htx + $kd;

			  $temp_record[0] = array(
				"name" => "LivTx ღვიძლი",
				"value" => $liv,
				"percent" =>	number_format( $liv/$total * 100, 2 )
			  );
			   $temp_record[1] = array(
				 "name" => "KdTx თირკმელი",
				 "value" => $kd,
				 "percent" =>	number_format( $kd/$total * 100, 2 )
			   );

			    $temp_record[2] = array(
				  "name" => "HTx გული",
				  "value" => $htx,
				  "percent" =>	number_format( $htx/$total * 100, 2 )
			    );



				//$r2->free();
				$response=array('items'=>$temp_record);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));

		break;
	   }


}else{
	$response=array('success'=>false,'data'=>false);	
}
echo  json_encode($response);
?>