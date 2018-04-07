<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



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
	$mod="tab-trt_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_treatment_medicines` tm
                                      inner join  `a_patient_treatment` t on tm.`treatment_id`=t.`treatment_id`
                                      where tm.`treatment_id` = ".$_POST['treatment_id']);

			$row =  $result->fetch_assoc();
			$count = $row['count'];


			$query= $mysqli->query("
                                    SELECT t.reg_id, t.date, tm.* , m.name AS med, d.name as dosage
                                     FROM `a_treatment_medicines` tm
                                     INNER JOIN `a_patient_treatment` t ON tm.`treatment_id` = t.`treatment_id` 
                                     LEFT JOIN `a_medicines` m ON m.`medicine_id` = tm.`medicine_id`
                                     LEFT JOIN `a_medicines_dosage` d on d.`dosage_id`=tm.`dosage_id`
                                     WHERE tm.`treatment_id` = ".$_POST['treatment_id']."
                                     ORDER BY m.name LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"treatment_id"=>$r['treatment_id'],
						"med"=>$r['med'],
						"medicine_id"=>$r['medicine_id'],
						"dosage_id"=>$r['dosage_id'],
						"dosage"=>$r['dosage']
					);


				}
				//$r2->free();
				$response=array('items'=>$temp_record, 'totalCount' => $count);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));
			}
		break;


		case "Add":

			if(!empty($_POST['medicine_id']))
				$medicine_id = $_POST['medicine_id'];
			else
				$medicine_id = 0;

			$query= $mysqli->query("insert into a_treatment_medicines (`treatment_id`,`patient_id`,`medicine_id`,`dosage_id`) 
                                                values(".$_POST['treatment_id'].",".$_POST['patient_id']."," .$medicine_id.",'".$_POST['dosage_id']."')");

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;

		case "Update":

			if(!empty($_POST['medicine_id']))
				$medicine_id = $_POST['medicine_id'];
			else
				$medicine_id = 0;


			$query = $mysqli->query("update a_treatment_medicines set `medicine_id`=".$medicine_id.", `dosage_id`='". $_POST['dosage_id']."'  
                                                 where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":

			$query=$mysqli->query("delete from a_treatment_medicines where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_treatment_medicines tm where tm.`patient_id` = ".$_POST['patient_id']." and tm.`treatment_id` = ".$_POST['treatment_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_treatment where treatment_id=".$_POST['treatment_id']." and patient_id =" .$_POST['patient_id']);


			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

	}
}else{
	$response=array('success'=>false,'data'=>false);	
}
echo  json_encode($response);
?>