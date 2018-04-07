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
	$mod="tab-group_";
	switch($act){
		case "View":


			// count the Data
			$result = $mysqli->query("SELECT COUNT(*) AS count FROM(
                       SELECT id
                        FROM
                        (
                          SELECT   p0.`patient_id` as id,  max(`a_patient_category`.`category_id`) as m FROM 
                          (
                             SELECT o.* 
                              FROM `a_transplantations` o   
                              LEFT JOIN `a_transplantations` b            
                              ON o.`patient_id` = b.`patient_id` AND o.`fc` < b.`fc`
                              WHERE b.`fc` is NULL   
                          ) AS p0
                         INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id=p0.`patient_id`
                         WHERE  `category_id` in (44,57)  group by id 
                        ) AS p 
                        WHERE p.m<>57 GROUP BY p.id 
                       ) AS co");

			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			$query= $mysqli->query("
                             select  p.*
                             from
                             (
                              SELECT  pat.*, p0.`patient_id` as id, pc.reg_id, p0.`date` as mdate,  p0.`donor_type_id` as mdonor, p0.clinic_id as clinic, max(pc.`category_id`) as m,  max(t.treatment_id) as t FROM 
                              (SELECT o.* 
                                FROM `a_transplantations` o   
                                LEFT JOIN `a_transplantations` b            
                                ON o.`patient_id` = b.`patient_id` AND o.`fc` < b.`fc`
                                WHERE b.`fc` is NULL   ) as p0

                              inner join `a_patient_category` pc on pc.patient_id=p0.`patient_id`
                              inner join `a_patient` pat on p0.patient_id=pat.`patient_id`
                              left join `a_patient_treatment` t on t.patient_id =p0.`patient_id` 
                              WHERE  `category_id` in (44,57)   group by id 
                             ) as p 

                            where p.m<>57 group by p.id order by p.`patientlastname`  LIMIT $start, $limit");


			if($query){
				while($r = $query->fetch_array()){
					$query2 = $mysqli->query("SELECT * FROM a_patient WHERE `patient_id`= ". $r['id']);
					if($query2){
						$r2 = $query2->fetch_array();
					    $patientname = $r2['patientname'];
						$birthday = (abs($r2['birthday'])< 1000)? "-" : date('d.m.Y', $r2['birthday']);
						$phone = $r2['phone2'];

					}
					$query2 = $mysqli->query("SELECT clinicdesc FROM a_clinic WHERE `clinic_id`= ". $r['clinic']);
					if($query2){
						$r2 = $query2->fetch_array();
						$clinic = $r2['clinicdesc'];
					}
					$query2 = $mysqli->query("SELECT name FROM a_donor_types WHERE `donor_type_id`= ". $r['mdonor']);
					if($query2){
						$r2 = $query2->fetch_array();
						$donor = $r2['name'];
					}
					$query2 = $mysqli->query("SELECT o.* , c.condition as con
                       FROM `a_patient_history` o   
                        LEFT JOIN `a_patient_history` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date`
                        INNER JOIN `a_patient_condition` c 
                         ON c.condition_id=o.condition_id
                        WHERE b.`date` is NULL and o.`patient_id`=" .$r['id']." and o.`reg_id`=".$r['reg_id']);
					if($query2){
						$r2 = $query2->fetch_array();
						$condition = $r2['con'];
					}
					else
						$condition = "-";

					$query2 = $mysqli->query("SELECT o.* , c.medicine_id as med, c.dosage_id as dos
                       FROM `a_patient_treatment` o   
                        LEFT JOIN `a_patient_treatment` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date`
                        INNER JOIN `a_treatment_medicines` c 
                         ON c.treatment_id=o.treatment_id
                        WHERE b.`date` is NULL and o.`patient_id`=" .$r['id']." and o.`reg_id`=".$r['reg_id']);

					$med1 = "-";
					$med2 = "-";
					$med3 = "-";
					if($query2){
						while($r2 = $query2->fetch_array()){

						  if($r2['med'] == 355 || $r2['med'] == 93 || $r2['med'] == 132){
								$query3 = $mysqli->query("SELECT name FROM `a_medicines_dosage` WHERE dosage_id=". $r2['dos']);
								if($query3){
									$r3 = $query3->fetch_array();
									switch ($r2['med']) {
										case 355:
											$med1 = $r3['name'];
											break;
										case 93:
											$med2 = $r3['name'];
											break;
										case 132:
											$med3 = $r3['name'];
											break;
									}
								}
						  }
						}
					}


					$temp_record[]=array(
						"id"=>$r['id'],
						"patientlastname"=>$r['patientlastname'],
						"patientname"=>$patientname,
						"birthday"=>$birthday,
						"phone"=>$phone,
						"transdate"=>(abs($r['mdate'])< 1000)? "-" : date('d.m.Y', $r['mdate']),
						"clinic"=>$clinic,
						"donor"=>$donor,
						"condition"=>$condition,
						"med1"=>$med1,
						"med2"=>$med2,
						"med3"=>$med3
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