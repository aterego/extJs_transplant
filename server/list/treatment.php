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
	$mod="tab-group_";
	switch($act){
		case "View":
			$limit = $_POST['limit']; //the pagesize
			$start = $_POST['start']; //Offset

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_treatment` t
                                      inner join  `a_treatment_medicines` tm on tm.`treatment_id`=t.`treatment_id`
                                      where t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']);


			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                                    select t.reg_id,t.date, tm.*,m.name as med, d.name as dosage
                                    from `a_patient_treatment` t
                                    inner join  `a_treatment_medicines` tm on tm.`treatment_id`=t.`treatment_id`
                                    left join `a_medicines` m on m.`medicine_id`=tm.`medicine_id`
                                    left join `a_medicines_dosage` d on d.`dosage_id`=tm.`dosage_id`
                                    where t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']."   order by t.`date` DESC  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){

					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
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
         /*

			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;
			if(!empty($_POST['medicine_id']))
				$medicine_id = $_POST['medicine_id'];
			else
				$medicine_id = 0;
			if(!empty($_POST['dosage_id']))
				$dosage_id = $_POST['dosage_id'];
			else
				$dosage_id = 0;

			$result= $mysqli->query("select COUNT(*)  AS count, MAX(treatment_id) as tr from a_patient_treatment t where t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']."  and t.`date` = ".$date);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count > 0)
			{
				$query2= $mysqli->query("insert into a_treatment_medicines (`treatment_id`,`patient_id`,`medicine_id`,`dosage_id`) 
                                                values(".$row['tr'].",".$_POST['param_id']."," .$medicine_id.",".$dosage_id.")");
			}
			else
			{

				$query = $mysqli->query("insert into a_patient_treatment (`patient_id`,`reg_id`,`date`) 
                                                values(" . $_POST['param_id'] . "," . $_POST['reg_id'] . "," . $date . ")");

				$query2 = $mysqli->query("insert into a_treatment_medicines (`treatment_id`,`patient_id`,`medicine_id`,`dosage_id`) 
                                                values(" . $mysqli->insert_id . "," . $_POST['param_id'] . "," . $medicine_id . "," . $dosage_id . ")");
			}
			
			if($query && $query2){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;
          */

			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;

			$query = $mysqli->query("insert into a_patient_treatment (`patient_id`,`reg_id`,`date`) 
                                                values(" . $_POST['param_id'] . "," . $_POST['reg_id'] . "," . $date . ")");

			$temp_record[]=array(
				"patient_id"=>$_POST['param_id'],
				"reg_id"=>$_POST['reg_id'],
				"date"=>date('d.m.Y', $date),
				"treatment_id"=>$mysqli->insert_id

			);


			if($query){
				$response = array( 'success'=>true, 'data'=>$temp_record);
			}else{
				$response=array('success'=>false,'data'=>false);
			}

			break;

		case "Update":

			/*
			if(!empty($_POST['date'])) {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', $_POST['date']."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}
			else
				$date = 0;
			if(!empty($_POST['medicine_id']))
				$medicine_id = $_POST['medicine_id'];
			else
				$medicine_id = 0;
			if(!empty($_POST['dosage_id']))
				$dosage_id = $_POST['dosage_id'];
			else
				$dosage_id = 0;


			$result= $mysqli->query("select *  from `a_treatment_medicines` tm where tm.`patient_id` =".$_POST['param_id']." and tm.`fc` = ".$_POST['fc']);
			$row =  $result->fetch_assoc();
			$t_idt = $row['treatment_id'];

			$query = $mysqli->query("update a_patient_treatment  set `date`=".$date."
                                            where patient_id=".$_POST['param_id']." and treatment_id=".$t_idt);

			$query2 = $mysqli->query("update a_treatment_medicines set `medicine_id`=".$medicine_id.", `dosage_id`=". $dosage_id."  
                                                 where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);

			if($query && $query2){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;
        */
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

			$query = $mysqli->query("update a_patient_treatment  set `date`=".$date."
                                            where patient_id=".$_POST['param_id']." and treatment_id=".$_POST['treatment_id']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_treatment_medicines tm where tm.`patient_id` = ".$_POST['param_id']." and tm.`treatment_id` = ".$_POST['treatment_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query2=$mysqli->query("delete from a_patient_treatment where treatment_id=".$_POST['treatment_id']." and patient_id =" .$_POST['param_id']);



			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Close":

			$result= $mysqli->query("select COUNT(*)  AS count from a_treatment_medicines tm where tm.`patient_id` = ".$_POST['param_id']." and tm.`treatment_id` = ".$_POST['treatment_id']);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0) {
				$query = $mysqli->query("delete from a_patient_treatment where treatment_id=" . $_POST['treatment_id'] . " and patient_id =" . $_POST['param_id']);


				if ($query) {
					$response = array('success' => true, 'data' => true);
				} else {
					$response = array('success' => false, 'data' => false);
				}
			}

			break;

		case "Delete":

			/*
			$result= $mysqli->query("select *  from `a_treatment_medicines` tm where tm.`patient_id` =".$_POST['param_id']." and tm.`fc` = ".$_POST['fc']);
			$row =  $result->fetch_assoc();
			$t_idt = $row['treatment_id'];

			$query=$mysqli->query("delete from a_treatment_medicines where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);

			$result= $mysqli->query("select COUNT(*)  AS count from a_treatment_medicines tm where tm.`patient_id` = ".$_POST['param_id']." and tm.`treatment_id` = ".$t_idt);
			$row =  $result->fetch_assoc();
			$count = $row['count'];

			if($count == 0)
				$query=$mysqli->query("delete from a_patient_treatment where treatment_id=".$t_idt." and patient_id =" .$_POST['param_id']);


			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;
		*/
			$query=$mysqli->query("delete from a_patient_treatment where patient_id=".$_POST['param_id']." and treatment_id=".$_POST['treatment_id']);

			$query2=$mysqli->query("delete from a_treatment_medicines where treatment_id=".$_POST['treatment_id']." and patient_id =" .$_POST['param_id']);


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