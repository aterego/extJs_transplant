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
	$mod="tab-lab_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_instrumental` i
                                      inner join  `a_instrumental_procedures` ip on ip.`instrumental_id`=i.`instrumental_id`
                                      where i.`patient_id` = ".$_POST['param_id']." and i.`reg_id` = ".$_POST['reg_id']);

			$row =  $result->fetch_assoc();
			$count = $row['count'];


			$query= $mysqli->query("
                                    select i.reg_id,i.date, ip.*,p.name as `procedure`
                                    from `a_patient_instrumental` i
                                    inner join  `a_instrumental_procedures` ip on ip.`instrumental_id`=i.`instrumental_id`
                                    left join `a_procedures` p on p.`procedure_id`=ip.`procedure_id`
                                    where i.`patient_id` = ".$_POST['param_id']." and i.`reg_id` = ".$_POST['reg_id']."   order by i.`date` DESC, p.name  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
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


			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;

				$query = $mysqli->query("insert into a_patient_instrumental (`patient_id`,`reg_id`,`date`) 
                                                values(" . $_POST['param_id'] . "," . $_POST['reg_id'] . "," . $date . ")");

			   $temp_record[]=array(
				"patient_id"=>$_POST['param_id'],
				"reg_id"=>$_POST['reg_id'],
				"date"=>date('d.m.Y', $date),
				"instrumental_id"=>$mysqli->insert_id

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

			$query = $mysqli->query("update a_patient_instrumental  set `date`=".$date."
                                            where patient_id=".$_POST['param_id']." and instrumental_id=".$_POST['instrumental_id']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_instrumental_procedures ip where ip.`patient_id` = ".$_POST['param_id']." and ip.`instrumental_id` = ".$_POST['instrumental_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_instrumental where instrumental_id=".$_POST['instrumental_id']." and patient_id =" .$_POST['param_id']);



			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Close":

			$result= $mysqli->query("select COUNT(*)  AS count from a_instrumental_procedures ip where ip.`patient_id` = ".$_POST['param_id']." and ip.`instrumental_id` = ".$_POST['instrumental_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0) {
				$query = $mysqli->query("delete from a_patient_instrumental where instrumental_id=" . $_POST['instrumental_id'] . " and patient_id =" . $_POST['param_id']);


				if ($query) {
					$response = array('success' => true, 'data' => true);
				} else {
					$response = array('success' => false, 'data' => false);
				}
			}

			break;

		case "Delete":

			$query=$mysqli->query("delete from a_patient_instrumental where patient_id=".$_POST['param_id']." and instrumental_id=".$_POST['instrumental_id']);

			$query2=$mysqli->query("delete from a_instrumental_procedures where instrumental_id=".$_POST['instrumental_id']." and patient_id =" .$_POST['param_id']);


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