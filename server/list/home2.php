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
			$result = $mysqli->query("SELECT COUNT(*) AS count
                                        FROM
                                        (
                                          SELECT pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                           `a_patient_category` pc
                                           GROUP BY id
                                        ) AS p
                                        INNER JOIN `a_transplantations` o ON o.patient_id=p.id
                                        LEFT JOIN `categories` cat ON cat.category_id = p.m
                                        LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
                                        
                                        WHERE c.`country_id`=4302 and cat.`category_id` in (43,59)");

			$row =  $result->fetch_assoc();//
			$liv = $row['count'];

			// count the Data Htx
			$result = $mysqli->query("SELECT COUNT(*) AS count
                                        FROM
                                        (
                                          SELECT pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                           `a_patient_category` pc
                                           GROUP BY id
                                        ) AS p
                                        INNER JOIN `a_transplantations` o ON o.patient_id=p.id
                                        LEFT JOIN `categories` cat ON cat.category_id = p.m
                                        LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
                                        
                                        WHERE c.`country_id`=4302 and cat.`category_id` in (65,68)");

			$row =  $result->fetch_assoc();//
			$htx = $row['count'];

			// count the Data Kd
			$result = $mysqli->query("SELECT COUNT(*) AS count
                                        FROM
                                        (
                                          SELECT pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                           `a_patient_category` pc
                                           GROUP BY id
                                        ) AS p
                                        INNER JOIN `a_transplantations` o ON o.patient_id=p.id
                                        LEFT JOIN `categories` cat ON cat.category_id = p.m
                                        LEFT JOIN `a_clinic` c ON c.`clinic_id` = o.`clinic_id`
                                        
                                        WHERE c.`country_id`=4302 and cat.`category_id` in (44,57)");

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