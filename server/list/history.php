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
	$mod="tab-history_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_history` h where h.`patient_id` = ".$_POST['param_id']);


			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                             select h.*, c.`condition` as cond
                             from `a_patient_history` h
                             left join `a_patient_condition` c on `c`.condition_id=h.`condition_id`
                             where h.`patient_id` = ".$_POST['param_id']." and h.`reg_id` = ".$_POST['reg_id']."   order by h.`date` DESC  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){
					/*
					$query2 = $mysqli->query("SELECT o.* , c.condition as con
                       FROM `a_patient_history` o   
                        LEFT JOIN `a_patient_history` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date`
                        INNER JOIN `a_patient_condition` c 
                         ON c.condition_id=o.condition_id
                        WHERE b.`date` is NULL and o.`patient_id`=" .$r['patient_id']);
					if($query2){
						$r2 = $query2->fetch_array();
						$con_date = (abs($r2['date'])< 1000)? "-" : date('d.m.Y', $r2['date']);
						$condition = $r2['con'];
					}
					else
						$condition = "-";
					*/

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"condition_id"=>$r['condition_id'],
						"txt"=>$r['txt'],
						"cond"=>$r['cond']
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
			if(!empty($_POST['condition_id']))
				$condition_id = $_POST['condition_id'];
			else
				$condition_id = 0;


			$query= $mysqli->query("insert into `a_patient_history` (`patient_id`,`reg_id`,`date`,`condition_id`,`txt`) 
                                                values(".$_POST['param_id'].",".$_POST['reg_id'].",".$date.",".$condition_id.
				                                 ",'".$_POST['txt']."')");

			
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
			if(!empty($_POST['condition_id']))
				$condition_id = $_POST['condition_id'];
			else
				$condition_id = 0;



			$query=$mysqli->query("update `a_patient_history` set `date`=".$date.", `condition_id`=".$condition_id.",
			                              txt='".$_POST['txt']."'
					                      where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":

			$query=$mysqli->query("delete from `a_patient_history` where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			
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