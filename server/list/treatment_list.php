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
	$mod="tab-tlist_";
	switch($act){
		case "View":


			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_treatment` t  where t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']);

			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                                    select t.*
                                    from `a_patient_treatment` t
                                    where t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']."   order by t.`date` DESC  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){



					$query2 = $mysqli->query("SELECT c.*
                       FROM `a_treatment_medicines` c   
                       WHERE c.`treatment_id`=" .$r['treatment_id']);

					$med1 = "-";
					$med2 = "-";
					if($query2){
						while($r2 = $query2->fetch_array()){

						  if($r2['medicine_id'] == 93 || $r2['medicine_id'] == 132){
								$query3 = $mysqli->query("SELECT name FROM `a_medicines_dosage` WHERE dosage_id=". $r2['dosage_id']);
								if($query3){
									$r3 = $query3->fetch_array();
									switch ($r2['medicine_id']) {
										case 93:
											$med1 = $r3['name'];
											break;
										case 132:
											$med2 = $r3['name'];
											break;
									}
								}
						  }
						}
					}

					$temp_record[]=array(
						"fc"=>$r2['fc'],
						"patient_id"=>$r['patient_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"med1"=>$med1,
						"med2"=>$med2
					);



				}
				//$r2->free();
				$response=array('items'=>$temp_record, 'totalCount' => $count);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));
			}
		break;


	}
}else{
	$response=array('success'=>false,'data'=>false);	
}
echo  json_encode($response);
?>