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
	$mod="tab-lab_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_instrumental_procedures` ip
                                      inner join  `a_patient_instrumental` i on ip.`instrumental_id`=i.`instrumental_id`
                                      where ip.`instrumental_id` = ".$_POST['instrumental_id']);

			$row =  $result->fetch_assoc();
			$count = $row['count'];


			$query= $mysqli->query("
                                    SELECT i.reg_id, i.date, ip.* , p.name AS `procedure`
                                     FROM `a_instrumental_procedures` ip
                                     INNER JOIN `a_patient_instrumental` i ON ip.`instrumental_id` = i.`instrumental_id` 
                                     LEFT JOIN `a_procedures` p ON p.`procedure_id` = ip.`procedure_id`
                                     WHERE ip.`instrumental_id` = ".$_POST['instrumental_id']."
                                     ORDER BY p.name LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"instrumental_id"=>$r['instrumental_id'],
						"procedure"=>$r['procedure'],
						"procedure_id"=>$r['procedure_id'],
						"value"=>$r['value']
					);


				}
				//$r2->free();
				$response=array('items'=>$temp_record, 'totalCount' => $count);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));
			}
		break;


		case "Add":

			if(!empty($_POST['procedure_id']))
				$procedure_id = $_POST['procedure_id'];
			else
				$procedure_id = 0;

			$query= $mysqli->query("insert into a_instrumental_procedures (`instrumental_id`,`patient_id`,`procedure_id`,`value`) 
                                                values(".$_POST['instrumental_id'].",".$_POST['patient_id']."," .$procedure_id.",'".$_POST['value']."')");

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;

		case "Update":

			if(!empty($_POST['procedure_id']))
				$procedure_id = $_POST['procedure_id'];
			else
				$procedure_id = 0;


			$query = $mysqli->query("update a_instrumental_procedures set `procedure_id`=".$procedure_id.", `value`='". $_POST['value']."'  
                                                 where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":

			$query=$mysqli->query("delete from a_instrumental_procedures where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_instrumental_procedures ip where ip.`patient_id` = ".$_POST['patient_id']." and ip.`instrumental_id` = ".$_POST['instrumental_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_instrumental where instrumental_id=".$_POST['instrumental_id']." and patient_id =" .$_POST['patient_id']);


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