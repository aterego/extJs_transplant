<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");

$limit = 3000; //$_POST['limit']; //the pagesize
$start = 0;// $_POST['start']; //Offset



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

			$sel = "";
			$whereclause = "";
			$whereclause0 = "";
			$whereclause2 = "";
			if(isset($_GET['catvalues']) && !empty($_GET['catvalues'])) {
				$pieces = explode(",", $_GET['catvalues']);
				if (count($pieces) > 0) {
					for ($i = 0; $i < count($pieces); $i++) {
						if ($i == 0)
							$whereclause = " WHERE pc.category_id in (" . $pieces[0];
						else
							$whereclause = $whereclause . "," . $pieces[$i];

						if ($i == (count($pieces) - 1))
							$whereclause = $whereclause . ")";
					}
				}
			}

			if(!empty($whereclause)) {
				$whereclause2 = " where j.m<>57 and j.m<>58 and j.m<>59 and j.m<>60 and j.m<>68";
				$arcArr = array(57, 58, 59, 60, 68);
				if (isset($_GET['archvalues']) && !empty($_GET['archvalues'])) {
					$pieces = explode(",", $_GET['archvalues']);
					//***AVA*** remove cats from array
					$newArray = array_merge(array_diff($arcArr, $pieces));
					if (count($newArray) > 0) {
						for ($i = 0; $i < count($newArray); $i++) {
							if ($i == 0)
								$whereclause2 = " where j.m<>" . $newArray[0];
							else
								$whereclause2 = $whereclause2 . " and j.m<>" . $newArray[$i];
						}
					}

				}

                if(isset($_GET['donvalues']) && !empty($_GET['donvalues'])) {
                    $pieces = explode(",", $_GET['donvalues']);
                    if (count($pieces) > 0) {
                        for ($i = 0; $i < count($pieces); $i++) {
                            if ($i == 0)
                                $whereclause = $whereclause ." OR pc.category_id in (" . $pieces[0];
                            else
                                $whereclause = $whereclause . "," . $pieces[$i];

                            if ($i == (count($pieces) - 1))
                                $whereclause = $whereclause . ")";
                        }
                    }
                }


			}
			else{
				if(isset($_GET['archvalues']) && !empty($_GET['archvalues'])) {
					$pieces = explode(",", $_GET['archvalues']);
					if (count($pieces) > 0) {
						for ($i = 0; $i < count($pieces); $i++) {
							if ($i == 0)
								$whereclause = " WHERE pc.category_id in (" . $pieces[0];
							else
								$whereclause = $whereclause . "," . $pieces[$i];

							if ($i == (count($pieces) - 1))
								$whereclause = $whereclause . ")";
						}
					}
				}

                if(isset($_GET['donvalues']) && !empty($_GET['donvalues'])) {
                    $pieces = explode(",", $_GET['donvalues']);
                    if (count($pieces) > 0) {
                        for ($i = 0; $i < count($pieces); $i++) {
                            if ($i == 0)
                                $whereclause = " WHERE pc.category_id in (" . $pieces[0];
                            else
                                $whereclause = $whereclause . "," . $pieces[$i];

                            if ($i == (count($pieces) - 1))
                                $whereclause = $whereclause . ")";
                        }
                    }
                }

			}

			if (!empty($_GET['cpatient']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and p.patient_id=".$_GET['cpatient'];
				else
					$whereclause = " where p.patient_id=".$_GET['cpatient'];

			if (!empty($_GET['ccountry']))
			 if(!empty($whereclause))
				$whereclause = $whereclause. " and p.country_id=".$_GET['ccountry'];
			 else
			    $whereclause = " where p.country_id=".$_GET['ccountry'];

			if (!empty($_GET['cCcountry']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and cln.country_id=".$_GET['cCcountry'];
				else
					$whereclause = " where cln.country_id=".$_GET['cCcountry'];

			if (!empty($_GET['ccity']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and p.city_id=".$_GET['ccity'];
				else
					$whereclause = " where p.city_id=".$_GET['ccity'];

			if (!empty($_GET['cclinic']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.clinic_id=".$_GET['cclinic'];
				else
					$whereclause = " where t.clinic_id=".$_GET['cclinic'];

			if (!empty($_GET['cdoctor']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.doctor_id=".$_GET['cdoctor'];
				else
					$whereclause = " where t.doctor_id=".$_GET['cdoctor'];

			if (!empty($_GET['cdiagnosis']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.diagnosis_id=".$_GET['cdiagnosis'];
				else
					$whereclause = " where t.diagnosis_id=".$_GET['cdiagnosis'];

			if (!empty($_GET['cdonor']))
				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.donor_type_id=".$_GET['cdonor'];
				else
					$whereclause = " where t.donor_type_id=".$_GET['cdonor'];

            if (!empty($_GET['chistoryid']))
                if(!empty($whereclause))
                    $whereclause = $whereclause. " and p.history_id=".$_GET['chistoryid'];
                else
                    $whereclause = " where p.history_id=".$_GET['chistoryid'];

            if (!empty($_GET['ccondition']))
                if(!empty($whereclause))
                    $whereclause = $whereclause. " and ph.condition_id=".$_GET['ccondition'];
                else
                    $whereclause = " where ph.condition_id=".$_GET['ccondition'];

            if (!empty($_GET['cdialysis']))
                if(!empty($whereclause))
                    $whereclause = $whereclause. " and pd.dialysis_id=".$_GET['cdialysis'];
                else
                    $whereclause = " where pd.dialysis_id=".$_GET['cdialysis'];

			if (!empty($_GET['cmeds'])) {

				$meds = explode(",", $_GET['cmeds']);
				if (count($meds) > 0) {

					if (!empty($_GET['cmedC'])) {

                        if ($_GET['cmedC'] == 1) {

							for ($i = 0; $i < count($meds); $i++) {
								if ($i != 0) {
									$sel = $sel . " , am" . ($i + 1) . ".name as medicine" . ($i + 1);
									$whereclause0 = $whereclause0 . "\n left join a_treatment_medicines m".($i +1)." on (t.patient_id = m".($i +1).".patient_id and tr.treatment_id = m".($i +1).".treatment_id)  \n";
									$whereclause0 = $whereclause0 . " left join a_medicines am". ($i + 1) ." on am". ($i + 1) . ".medicine_id=m". ($i + 1) .".medicine_id \n";
								}
							}

							for ($i = 0; $i < count($meds); $i++) {
								if ($i == 0) {
									if (!empty($whereclause))
										$whereclause = $whereclause . " and m.medicine_id =" . $meds[0];
									else
										$whereclause = $whereclause . " where m.medicine_id =" . $meds[0];
								}
								else
									$whereclause = $whereclause . " and m".($i +1).".medicine_id =" . $meds[$i];

							}


						}

					}

				} else {
					if (!empty($whereclause))
						$whereclause = $whereclause . " and m.medicine_id =" . $_GET['cmeds'];
					else
						$whereclause = " where m.medicine_id in =" . $_GET['cmeds'];
				}

			}




			if (!empty($_GET['cdate1'])) {

				$d1 = DateTime::createFromFormat('m/d/Y/H:i:s', $_GET['cdate1']."/11:00:00");
				$date1 = $d1->getTimestamp();

				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.date >=".$date1;
				else
					$whereclause = " where t.date >= ".$date1;
			}

			if (!empty($_GET['cdate2'])) {

				$d2 = DateTime::createFromFormat('m/d/Y/H:i:s', $_GET['cdate2']."/11:00:00");
				$date2 = $d2->getTimestamp();

				if(!empty($whereclause))
					$whereclause = $whereclause. " and t.date <=".$date2;
				else
					$whereclause = " where t.date <= ".$date2;
			}


			if (!empty($_GET['sw'])){

				$sw = urldecode($_GET['sw']);

				if(!empty($whereclause))
					$whereclause = $whereclause. " and ";
				else
					$whereclause = " where ";

					$whereclause .= "  p.patientname like '%".$sw."%' or
					                   p.patientlastname like '%".$sw."%' or
	                                   p.phone2 like '%".$sw."%' or
	                                   cnt.name like '%".$sw."%' or 
	                                   cts.name like '%".$sw."%' or 
                                       p.personalid like '%".$sw."%' or
					                   p.history_id like '%".$sw."%' or
					                   p.phone1 like '%".$sw."%' or
					                   p.email like '%".$sw."%' or
					                   p.address1 like '%".$sw."%' or
					                   p.address2 like '%".$sw."%' or
					                   p.work_phone like '%".$sw."%' or
					                   p.work like '%".$sw."%' or	 
					                   cln.clinicdesc like '%".$sw."%' or
					                   don.name like '%".$sw."%' or
					                   doc.doctorname like '%".$sw."%' or
					                   doc.doctorlastname like '%".$sw."%' or
					                   op.doctorname like '%".$sw."%' or
					                   op.doctorlastname like '%".$sw."%' or
					                   di.txt like '%".$sw."%' or
					                   inf.info like '%".$sw."%' 
					                   ";
             }

            /*
			// count the Data
			$result = $mysqli->query("
                     SELECT COUNT(*) AS count FROM(
                       SELECT p.patient_id,  max(pc.`category_id`) as m
                            from `a_patient` p
                            left join a_patient_category pc on pc.patient_id = p.patient_id
                            inner join a_transplantations t on t.patient_id = p.patient_id
                            ".$whereclause."  group by p.patient_id, t.reg_id
                        ) AS j 
                        ".$whereclause2);



			$row =  $result->fetch_assoc();//
			$count = $row['count'];

			*/

			$sql = "select  j.*
                     from
					 (
						 select p.*, cnt.name as country_name, cln.country_id as ccountry_id, ccnt.name as ccountry_name, cts.name as city_name,t.reg_id, t.`date`,t.donor_type_id, t.donor_info, t.clinic_id,t.operator_id,t.doctor_id,t.diagnosis_id, m.medicine_id, am.name as medicine,
                              cln.clinicdesc as clinic, doc.doctorname as docname, doc.doctorlastname as doclastname, op.doctorname as opname, op.doctorlastname as oplastname, don.name as donor, di.txt as diagnosis,
                              inf.blood_type_id,inf.rhesus, inf.info, max(pc.category_id) as m, pc.category_id, pc.date as regdate, pr.date as removaldate, r.name as removal " . $sel ."

                            from `a_patient` p
                            left join a_countries cnt on  cnt.country_id=p.country_id
                            left join a_cities cts on cts.city_id=p.city_id
                            inner join a_transplantations t on t.patient_id = p.patient_id
                            
LEFT JOIN (SELECT  a.*
FROM    a_patient_treatment a
        INNER JOIN 
        (
            SELECT `patient_id` , `treatment_id`, MAX(date) mxdate
            FROM    a_patient_treatment 
            GROUP   BY `patient_id`
        ) b ON a.`patient_id` = b.`patient_id`
                AND a.date = b.mxdate) AS tr
   on t.patient_id = tr.patient_id                          
                            
                            left join a_patient_category pc on pc.patient_id = t.patient_id 
                            left join a_patient_removals pr on pr.patient_id = t.patient_id
                            left join a_removals r on r.removal_id = pr.removal_id 
                            left join a_patient_history ph on ph.patient_id = t.patient_id
                            left join a_patient_dialysis pd on pd.patient_id = t.patient_id
                            left join a_diagnosis di on di.diagnosis_id=t.diagnosis_id
                            left join a_clinic cln on cln.clinic_id = t.clinic_id
                            left join a_countries ccnt on  ccnt.country_id=cln.country_id
                            left join a_doctor doc on doc.doctor_id=t.doctor_id
                            left join a_doctor op on op.doctor_id=t.operator_id
                            left join a_donor_types don on don.donor_type_id=t.donor_type_id
                            left join a_treatment_medicines m on (t.patient_id = m.patient_id)  and tr.treatment_id = m.treatment_id
                            left join a_medicines am on am.medicine_id=m.medicine_id
                            left join a_patient_info inf on inf.patient_id=p.patient_id "
				            .$whereclause0
                            .$whereclause." group by patient_id, t.reg_id 
                      ) as j 
                          ".$whereclause2."    LIMIT $start, $limit";


			$totalSQL = $sql;

			$whereclauseC = "";




			if (!empty($_GET['cmeds'])) {

				$sel = '';

				if ($_GET['cmedC'] == 2) {
					for ($i = 0; $i < count($meds); $i++) {

						    $whereclauseC = $whereclause;

							if (!empty($whereclauseC))
								$whereclauseC = $whereclauseC . " and m.medicine_id =" . $meds[$i];
							else
								$whereclauseC = $whereclauseC . " where m.medicine_id =" . $meds[$i];


						$sqlC = "select  j.*
                     from
					 (
						 select p.*, cnt.name as country_name, cln.country_id as ccountry_id, ccnt.name as ccountry_name, cts.name as city_name,t.reg_id, t.`date`,t.donor_type_id, t.donor_info, t.clinic_id,t.operator_id,t.doctor_id,t.diagnosis_id, m.medicine_id, am.name as medicine,
                              cln.clinicdesc as clinic, doc.doctorname as docname, doc.doctorlastname as doclastname, op.doctorname as opname, op.doctorlastname as oplastname, don.name as donor, di.txt as diagnosis,
                              inf.blood_type_id,inf.rhesus, inf.info,  max(pc.category_id) as m,  pc.category_id, pc.date as regdate, pr.date as removaldate, r.name as removal " . $sel ."

                            from `a_patient` p
                            left join a_countries cnt on  cnt.country_id=p.country_id
                            left join a_cities cts on cts.city_id=p.city_id
                            inner join a_transplantations t on t.patient_id = p.patient_id
                            
LEFT JOIN (SELECT  a.*
FROM    a_patient_treatment a
        INNER JOIN 
        (
            SELECT `patient_id` , `treatment_id`, MAX(date) mxdate
            FROM    a_patient_treatment 
            GROUP   BY `patient_id`
        ) b ON a.`patient_id` = b.`patient_id`
                AND a.date = b.mxdate) AS tr
   on t.patient_id = tr.patient_id                            
                            
                            left join a_patient_category pc on pc.patient_id = t.patient_id 
                            left join a_patient_removals pr on pr.patient_id = t.patient_id
                            left join a_removals r on r.removal_id = pr.removal_id 
                            left join a_patient_history ph on ph.patient_id = t.patient_id
                            left join a_patient_dialysis pd on pd.patient_id = t.patient_id                                                        
                            left join a_diagnosis di on di.diagnosis_id=t.diagnosis_id
                            left join a_clinic cln on cln.clinic_id = t.clinic_id
                            left join a_countries ccnt on  ccnt.country_id=cln.country_id
                            left join a_doctor doc on doc.doctor_id=t.doctor_id
                            left join a_doctor op on op.doctor_id=t.operator_id
                            left join a_donor_types don on don.donor_type_id=t.donor_type_id
                            left join a_treatment_medicines m on (t.patient_id = m.patient_id) and tr.treatment_id = m.treatment_id
                            left join a_medicines am on am.medicine_id=m.medicine_id                            
                            left join a_patient_info inf on inf.patient_id=p.patient_id "
							.$whereclause0
							.$whereclauseC." group by patient_id, t.reg_id 
                      ) as j 
                          ".$whereclause2."    LIMIT $start, $limit";


						if($i!=0)
						  $totalSQL = $totalSQL . "\n UNION \n" .$sqlC;
						else
						  $totalSQL = $sqlC;
					}
				}
			}


			$query= $mysqli->query($totalSQL);



			//$file = 'd:\people.txt';
			//file_put_contents($file, $totalSQL);




			if($query){
				while($r = $query->fetch_array()){

					$category ="";
					$category_id =0;
					$mCat = 0;
					/*
					$query2 = $mysqli->query("SELECT image FROM a_patient_photo WHERE `patient_id`= ". $r['patient_id']);
					if($query2){
						$r2 = $query2->fetch_array();
						$pimage = $r2['image'];
					}
					*/

					$query2 = $mysqli->query("SELECT max(pc.category_id) as mCat 
                                               FROM a_patient_category pc 
                                               LEFT JOIN categories c on c.category_id=pc.category_id
                                               WHERE pc.`patient_id`= ". $r['patient_id']);
					if($query2){
						$r2 = $query2->fetch_array();
                        $mCat = $r2['mCat'];

						if($mCat!=57 && $mCat!=58 && $mCat!=59 && $mCat!=60 &&
							$mCat!=61 && $mCat!=62 && $mCat!=63 && $mCat!=64 &&
							$mCat!=68 /*&& $mCat != 31 && $mCat !=33 && $mCat != 34 && $mCat != 35 &&
							$mCat != 66 */) {
							$query3 = $mysqli->query("SELECT c.category_name as category, pc.category_id 
                                               FROM a_patient_category pc 
                                               LEFT JOIN categories c on c.category_id=pc.category_id
                                               WHERE pc.`reg_id`= ". $r['reg_id']);
							if($query3) {
								$r3 = $query3->fetch_array();
								$category = $r3['category'];
								$category_id = $r3['category_id'];

                                if($mCat == 32 || $mCat == 36 || $mCat == 67)
                                    $category = "დონორი ".$category;
							 }
						}
						else {
							$query3 = $mysqli->query("SELECT c.category_name as category
                                               FROM categories c
                                               WHERE c.`category_id`= ". $mCat);
							if($query3) {
								$r3 = $query3->fetch_array();
								$category = $r3['category'];
								$category_id = $mCat;
							}
						}

					}



                    $query2 = $mysqli->query("SELECT o.* , c.condition as con
                       FROM `a_patient_history` o   
                        LEFT JOIN `a_patient_history` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date` 
                        INNER JOIN `a_patient_condition` c 
                         ON c.condition_id=o.condition_id
                        WHERE b.`date` is NULL and o.`patient_id`=" .$r['patient_id']." and o.`reg_id`=".$r['reg_id']);
                    if($query2){
                        $r2 = $query2->fetch_array();
                        $con_date = (abs($r2['date'])< 1000)? "-" : date('d.m.Y', $r2['date']);
                        $condition = $r2['con'];
                    }
                    else {
                        $con_date = "-";
                        $condition = "-";
                    }


                    if(empty($_GET['cmeds'])) {
                       $query2 = $mysqli->query("SELECT o.* , c.medicine_id, m.name  as medicine
                       FROM `a_patient_treatment` o   
                        LEFT JOIN `a_patient_treatment` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date` 
                        INNER JOIN `a_treatment_medicines` c 
                         ON c.treatment_id=o.treatment_id
                        LEFT JOIN `a_medicines` m 
                         ON c.medicine_id=m.medicine_id                         
                        WHERE b.`date` is NULL and o.`patient_id`=" . $r['patient_id'] . " and o.`reg_id`=" . $r['reg_id']);
                        if ($query2) {
                            $r2 = $query2->fetch_array();
                            $medicine_id = $r2['medicine_id'];
                            $medicine = $r2['medicine'];
                        } else {
                            $medicine_id = "-";
                            $medicine = "-";
                        }
                    }else{
                        $medicine_id = $r['medicine_id'];
                        $medicine = $r['medicine'];
                    }

                    if(empty($_GET['cmeds'])) {
                        $query2 = $mysqli->query("SELECT o.* , c.dosage_id, d.name AS dosage
                       FROM `a_patient_treatment` o   
                        LEFT JOIN `a_patient_treatment` b            
                         ON o.`patient_id` = b.`patient_id` AND o.`date` < b.`date` 
                        INNER JOIN `a_treatment_medicines` c 
                         ON c.treatment_id = o.treatment_id
                        INNER JOIN `a_medicines_dosage` d 
                         ON c.dosage_id = d.dosage_id 
                        WHERE b.`date` is NULL and c.medicine_id =" . $medicine_id . " and  o.`patient_id`=" . $r['patient_id'] . " and o.`reg_id`=" . $r['reg_id']);
                        if ($query2) {
                            $r2 = $query2->fetch_array();
                            $dosage = $r2['dosage'];
                        } else {
                            $dosage = "-";
                        }
                    }
                    else{
                        $query2 = $mysqli->query("SELECT c.dosage_id, d.name AS dosage
                       FROM `a_patient_treatment` o   
                        INNER JOIN `a_treatment_medicines` c 
                         ON c.treatment_id = o.treatment_id
                        INNER JOIN `a_medicines_dosage` d 
                         ON c.dosage_id = d.dosage_id 
                        WHERE  c.medicine_id =" . $medicine_id . " and  c.`patient_id`=" . $r['patient_id']." ORDER BY o.date DESC");
                        if ($query2) {
                            $r2 = $query2->fetch_array();
                            $dosage = $r2['dosage'];
                        } else {
                            $dosage = "-";
                        }
                    }




                    $dialysis_date = "-";
                    $dialysis = "-";
                    $query2 = $mysqli->query("SELECT d.* 
                       FROM `a_patient_dialysis` d   
                       WHERE d.`patient_id`=" .$r['patient_id'] . " ORDER by date DESC LIMIT 1");
                    if($query2){
                        $r2 = $query2->fetch_array();
                        $dialysis_date = (abs($r2['date'])< 1000)? "-" : date('d.m.Y', $r2['date']);
                        if($r2['dialysis_id'] == 70)
                            $dialysis = "პერიტონიალური";
                        elseif($r2['dialysis_id'] == 71)
                            $dialysis = "ჰემოდიალიზი";
                    }
                    else {
                        $dialysis_date = "-";
                        $dialysis = "-";
                    }

					$temp_record[]=array(
						"patient_id"=>$r['patient_id'],
						"reg_id"=>$r['reg_id'],
						"patientlastname"=>$r['patientlastname'],
						"patientname"=>$r['patientname'],
						"birthday"=>(abs($r['birthday'])< 1000)? "-" : date('d.m.Y', $r['birthday']),
						"phone2"=>$r['phone2'],
						"patronymic"=>$r['patronymic'],
						"country_id"=>$r['country_id'],
						"country_name"=>$r['country_name'],
						"ccountry_id"=>$r['ccountry_id'],
						"ccountry_name"=>$r['ccountry_name'],
						"city_id"=>$r['city_id'],
						"city_name"=>$r['city_name'],
						"personalid"=>$r['personalid'],
						"history_id"=>$r['history_id'],
						"gendercode"=>$r['gendercode'],
						"gender"=>($r['gendercode']==1)?"მამრობითი":"მდედრობითი",
						"phone1"=>$r['phone1'],
						"email"=>$r['email'],
						"address1"=>$r['address1'],
						"address2"=>$r['address2'],
						"work_phone"=>$r['work_phone'],
						"work"=>$r['work'],
						"editorcode"=>$r['editorcode'],
						"transdate"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
						"clinic_id"=>$r['clinic_id'],
						"clinic"=>$r['clinic'],
						"donor_type_id"=>$r['donor_type_id'],
						"donor"=>$r['donor'],
                        "donor_info"=>$r['donor_info'],
						"doctor_id"=>$r['doctor_id'],
						"operator_id"=>$r['operator_id'],
						"docname"=>$r['docname'],
						"doclastname"=>$r['doclastname'],
						"opname"=>$r['opname'],
						"oplastname"=>$r['oplastname'],
						"diagnosis_id"=>$r['diagnosis_id'],
						"diagnosis"=>$r['diagnosis'],
						//"medicine_id"=>$r['medicine_id'],
						"medicine"=>$medicine,
                        "dosage"=>$dosage,
						"con_date"=>$con_date,
						"condition"=>$condition,
                        "dialysis_date"=>$dialysis_date,
                        "dialysis"=>$dialysis,
						"blood_type_id"=>$r['blood_type_id'],
						"rhesus"=>$r['rhesus'],
						"info"=>$r['info'],
						"category_id"=>$category_id,
						"category"=>$category,
						"regdate"=>(abs($r['regdate'])< 1000)? "-" : date('d.m.Y', $r['regdate']),
						"removaldate"=>(abs($r['removaldate'])< 1000)? "-" : date('d.m.Y', $r['removaldate']),
						"removal"=>$r['removal'],
						//"pimage"=> base64_encode($pimage)

					);

				}
				//$r2->free();
				//$response=array('items'=>$temp_record, 'totalCount' => $count);
				// Unique values
				$i =0 ;
				$tArr = array();
				foreach ($temp_record as $key => $value ) {


					foreach ($temp_record as $key2 => $value2){
						$allow = true;
						if($value2['patient_id'] == $value['patient_id'] && $key!=$key2 && $temp_record[$key]['medicine']!=$temp_record[$key2]['medicine']){

							foreach ($tArr as $v){
								if($v == $key2 || $v == $key) {
									$allow = false;
									break;
								}
							}

							if($allow) {
								$temp_record[$key]['medicine'] = $temp_record[$key]['medicine'] . ", " . $temp_record[$key2]['medicine'];
                                $temp_record[$key]['dosage'] = $temp_record[$key]['dosage'] . ", " . $temp_record[$key2]['dosage'];
								$tArr[$i] = $key2;
								$i++;
								break;
							}
						}
					}

					//break;
					//$file = 'd:\people0.txt';
					//file_put_contents($file, $value['patient_id']);

				}

				//$file = 'd:\people0.txt';
				foreach ($tArr as $value) {
					//file_put_contents($file, $value."\n", FILE_APPEND);
					unset($temp_record[$value]);
					//$temp_record = array_values($temp_record);

				}


				$response=array('items'=>$temp_record);
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