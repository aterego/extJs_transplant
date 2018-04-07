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

            if(isset($_GET['donor'])){
                $where1 = " t.dn<>1 and ";
                $where2 = " where t.dn<>1 and  t.`patient_id` = ".$_POST['param_id']." order by t.`date` DESC  LIMIT $start, $limit";
            }else{
                $where1 = "";
                $where2 = " where  t.`patient_id` = ".$_POST['param_id']." and t.`reg_id` = ".$_POST['reg_id']."   order by t.`date` DESC  LIMIT $start, $limit";
            }

			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_transplantations` t where $where1  t.`patient_id` = ".$_POST['param_id']);


			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                             select t.*, d.`doctorname` as dname,d.`doctorlastname` as dlastname, o.`doctorname` as oname ,o.`doctorlastname` as olastname,  di.txt as diagnosis, dt.`name` as donor, c.`clinicdesc` as clinic
                             from `a_transplantations` t
                             left join `a_doctor` d on `d`.doctor_id=t.`doctor_id`
                             left join `a_doctor` o on `o`.doctor_id=t.`operator_id`
                             left join `a_diagnosis` di on `di`.diagnosis_id=t.`diagnosis_id`
                             left join `a_donor_types` dt on `dt`.donor_type_id=t.`donor_type_id`
                             left join `a_clinic` c on `c`.clinic_id=t.`clinic_id`
                             ".$where2);


			if($query){
				while($r = $query->fetch_array()){
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

					$dnameFull = "";
					if(!empty($r['dname']))
						$dnameFull.=$r['dname'];
					if(!empty($r['dlastname']))
						$dnameFull.= " " . $r['dlastname'];
					$onameFull = "";
					if(!empty($r['oname']))
						$onameFull.=$r['oname'];
					if(!empty($r['olastname']))
						$onameFull.= " " . $r['olastname'];



					$temp_record[]=array(
						"fc"=>$r['fc'],
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
						"date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"donor_type_id"=>$r['donor_type_id'],
						"donor_info"=>$r['donor_info'],
						"doctor_id"=>$r['doctor_id'],
						"dname"=>$r['dname'],
						"dlastname"=>$r['dlastname'],
						"dnameFull"=>$dnameFull,
						"operator_id"=>$r['operator_id'],
					    "oname"=>$r['oname'],
		                "olastname"=>$r['olastname'],
						"onameFull"=>$onameFull,
						"diagnosis_id"=>$r['diagnosis_id'],
						"diagnosis"=>$r['diagnosis'],
		                "donor"=>$r['donor'],
						"clinic"=>$r['clinic'],
						"clinic_id"=>$r['clinic_id'],
						"con_date"=>$con_date,
						"condition"=>$condition

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
			if(!empty($_POST['donor_type_id']))
				$donor_type_id = $_POST['donor_type_id'];
			else
				$donor_type_id = 0;
			if(!empty($_POST['clinic_id']))
				$clinic_id = $_POST['clinic_id'];
			else
				$clinic_id = 0;
			if(!empty($_POST['operator_id']))
				$operator_id = $_POST['operator_id'];
			else
				$operator_id = 0;
			if(!empty($_POST['doctor_id']))
				$doctor_id = $_POST['doctor_id'];
			else
				$doctor_id = 0;
			if(!empty($_POST['diagnosis_id']))
				$diagnosis_id = $_POST['diagnosis_id'];
			else
				$diagnosis_id = 0;


			$query= $mysqli->query("insert into a_transplantations (`patient_id`,`reg_id`,`date`,`donor_type_id`,`donor_info`,
                                                `clinic_id`,`operator_id`,`doctor_id`,`diagnosis_id`) 
                                                values(".$_POST['param_id']."," .$_POST['reg_id'].",".$date.",".$donor_type_id.
				",'".$_POST['donor_info']."',".$clinic_id.",".$operator_id.",".$doctor_id.",".$diagnosis_id.")");


			//***AVA*** determine if patient in transplantations category only
			$query2= $mysqli->query("select parent_category_id as parent from categories as c
                                      left join a_patient_category as pc on pc.category_id=c.category_id
                                      where pc.reg_id=".$_POST['reg_id']);
			$r2 = $query2->fetch_array();
			if($r2["parent"] != 29 && $r2["parent"] != 45 && $r2["parent"] != 30 && $r2["parent"] != 39) {

				$query3=$mysqli->query("delete from a_transplantations where patient_id=".$_POST['param_id']." and reg_id=".$_POST['reg_id']);
			}

			
			
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
			if(!empty($_POST['donor_type_id']))
				$donor_type_id = $_POST['donor_type_id'];
			else
				$donor_type_id = 0;
			if(!empty($_POST['clinic_id']))
				$clinic_id = $_POST['clinic_id'];
			else
				$clinic_id = 0;
			if(!empty($_POST['operator_id']))
				$operator_id = $_POST['operator_id'];
			else
				$operator_id = 0;
			if(!empty($_POST['doctor_id']))
				$doctor_id = $_POST['doctor_id'];
			else
				$doctor_id = 0;
			if(!empty($_POST['diagnosis_id']))
				$diagnosis_id = $_POST['diagnosis_id'];
			else
				$diagnosis_id = 0;


			$query=$mysqli->query("update a_transplantations set `date`=".$date.", `donor_type_id`=".$donor_type_id.",
			                              donor_info='".$_POST['donor_info']."',clinic_id=".$clinic_id.",operator_id=".$operator_id.",
			                              doctor_id=".$doctor_id.",diagnosis_id=".$diagnosis_id."
					                      where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
			break;

		case "Delete":
			$query=$mysqli->query("delete from a_transplantations where patient_id=".$_POST['param_id']." and fc=".$_POST['fc']);
			
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