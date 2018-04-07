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
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_labaratory_analysis` la
                                      inner join  `a_patient_labaratory` l on la.`labaratory_id`=l.`labaratory_id`
                                      where la.`labaratory_id` = ".$_POST['labaratory_id']);

			$row =  $result->fetch_assoc();
			$count = $row['count'];


			$query= $mysqli->query("
                                    SELECT l.reg_id, l.date, la . * , a.name AS analysis
                                     FROM `a_labaratory_analysis` la
                                     INNER JOIN `a_patient_labaratory` l ON la.`labaratory_id` = l.`labaratory_id` 
                                     LEFT JOIN `a_analysis` a ON a.`analysis_id` = la.`analysis_id`
                                     WHERE la.`labaratory_id` = ".$_POST['labaratory_id']."
                                     ORDER BY a.name LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"labaratory_id"=>$r['labaratory_id'],
						"analysis"=>$r['analysis'],
						"analysis_id"=>$r['analysis_id'],
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

			if(!empty($_POST['analysis_id']))
				$analysis_id = $_POST['analysis_id'];
			else
				$analysis_id = 0;

			$query= $mysqli->query("insert into a_labaratory_analysis (`labaratory_id`,`patient_id`,`analysis_id`,`value`) 
                                                values(".$_POST['labaratory_id'].",".$_POST['patient_id']."," .$analysis_id.",'".$_POST['value']."')");

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;

		case "Update":

			if(!empty($_POST['analysis_id']))
				$analysis_id = $_POST['analysis_id'];
			else
				$analysis_id = 0;


			$query = $mysqli->query("update a_labaratory_analysis set `analysis_id`=".$analysis_id.", `value`='". $_POST['value']."'  
                                                 where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":

			$query=$mysqli->query("delete from a_labaratory_analysis where patient_id=".$_POST['patient_id']." and fc=".$_POST['fc']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_labaratory_analysis la where la.`patient_id` = ".$_POST['patient_id']." and la.`labaratory_id` = ".$_POST['labaratory_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_labaratory where labaratory_id=".$_POST['labaratory_id']." and patient_id =" .$_POST['patient_id']);


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