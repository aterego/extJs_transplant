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
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_labaratory` l
                                      inner join  `a_labaratory_analysis` la on la.`labaratory_id`=l.`labaratory_id`
                                      where l.`patient_id` = ".$_POST['param_id']." and l.`reg_id` = ".$_POST['reg_id']);

			$row =  $result->fetch_assoc();
			$count = $row['count'];


			$query= $mysqli->query("
                                    select l.reg_id,l.date, la.*,a.name as analysis
                                    from `a_patient_labaratory` l
                                    inner join  `a_labaratory_analysis` la on la.`labaratory_id`=l.`labaratory_id`
                                    left join `a_analysis` a on a.`analysis_id`=la.`analysis_id`
                                    where l.`patient_id` = ".$_POST['param_id']." and l.`reg_id` = ".$_POST['reg_id']."   order by l.`date` DESC, a.name  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
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


			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;

				$query = $mysqli->query("insert into a_patient_labaratory (`patient_id`,`reg_id`,`date`) 
                                                values(" . $_POST['param_id'] . "," . $_POST['reg_id'] . "," . $date . ")");

			   $temp_record[]=array(
				"patient_id"=>$_POST['param_id'],
				"reg_id"=>$_POST['reg_id'],
				"date"=>date('d.m.Y', $date),
				"labaratory_id"=>$mysqli->insert_id

			  );


			if($query){
				$response = array( 'success'=>true, 'data'=>$temp_record);
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;

		case "Update":

			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;

/*
			$file = 'd:\people.txt';
			file_put_contents($file, $_POST['labaratory_id']);
*/

			$query = $mysqli->query("update a_patient_labaratory  set `date`=".$date."
                                            where patient_id=".$_POST['param_id']." and labaratory_id=".$_POST['labaratory_id']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_labaratory_analysis la where la.`patient_id` = ".$_POST['param_id']." and la.`labaratory_id` = ".$_POST['labaratory_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_labaratory where labaratory_id=".$_POST['labaratory_id']." and patient_id =" .$_POST['param_id']);



			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Close":

			$result= $mysqli->query("select COUNT(*)  AS count from a_labaratory_analysis la where la.`patient_id` = ".$_POST['param_id']." and la.`labaratory_id` = ".$_POST['labaratory_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0) {
				$query = $mysqli->query("delete from a_patient_labaratory where labaratory_id=" . $_POST['labaratory_id'] . " and patient_id =" . $_POST['param_id']);


				if ($query) {
					$response = array('success' => true, 'data' => true);
				} else {
					$response = array('success' => false, 'data' => false);
				}
			}

			break;

		case "Delete":

			$query=$mysqli->query("delete from a_patient_labaratory where patient_id=".$_POST['param_id']." and labaratory_id=".$_POST['labaratory_id']);

			$query2=$mysqli->query("delete from a_labaratory_analysis where labaratory_id=".$_POST['labaratory_id']." and patient_id =" .$_POST['param_id']);


			if($query && $query2){
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