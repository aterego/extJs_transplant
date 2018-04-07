<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
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
	$mod="tab-group_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_dialysis` t where t.`patient_id` = ".$_POST['param_id']);


			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                             select *
                             from `a_patient_dialysis`
                             where `patient_id` = ".$_POST['param_id']."  order by `date` DESC  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					if($r['dialysis_id'] == 70)
					 $dialysis = "პერიტონიალური";
					elseif($r['dialysis_id'] == 71)
					 $dialysis = "ჰემოდიალიზი";


					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"dialysis_id"=>$r['dialysis_id'],
						"dialysis"=>$dialysis
					);

				}
				//$r2->free();
				$response=array('items'=>$temp_record, 'totalCount' => $count);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));


			}
		break;


		case "Add":
			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y', $_POST['date'], new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;


			$query= $mysqli->query("insert into a_patient_dialysis (`patient_id`,`dialysis_id`,`date`) 
                                                values(".$_POST['param_id']."," .$_POST['dialysis_id'].",".$date.")");

			
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Update":

			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y', $_POST['date'], new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;


			$query=$mysqli->query("update a_patient_dialysis set `date`=".$date.", `dialysis_id`=".$_POST['dialysis_id']."
					                      where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":
			$query=$mysqli->query("delete from a_patient_dialysis where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			
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