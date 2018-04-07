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


		    $medicines_names =  array('სელსეპტი','პროგრაფი','მიფორტიკი','ნეორალი','სერტიკანი');
            $m = array();

            foreach ($medicines_names as $m_name) {
                // count the Data სელსეპტი
                $result = $mysqli->query("SELECT  DISTINCT COUNT(id) AS count 
                                            FROM 
                                            ( SELECT pc.`patient_id` as id, max(pc.`category_id`) as m 
                                               FROM `a_patient_category` pc GROUP BY id ) AS t 
                                              LEFT JOIN `categories` cat ON cat.category_id = t.m 
                                              LEFT JOIN (SELECT a.* FROM a_patient_treatment a 
                                              INNER JOIN 
                                                ( SELECT `patient_id` , `treatment_id`, MAX(date) mxdate 
                                                           FROM a_patient_treatment GROUP BY `patient_id` ) b 
                                                   ON a.`patient_id` = b.`patient_id` AND a.date = b.mxdate) AS tr 
                                                   ON t.id = tr.patient_id 
                                            INNER join a_treatment_medicines m  ON tr.treatment_id = m.treatment_id
                                            LEFT JOIN a_medicines am  ON am.medicine_id=m.medicine_id
                                            WHERE cat.parent_category_id Not in(29,30,45)  AND am.name LIKE '%".$m_name."%'");

                $row = $result->fetch_assoc();//
                $m[] = $row['count'];
            }

            $total = 0;
            $i = 0;
            foreach ($medicines_names as $m_name) {
               $total += $m[$i];
               $i++;
            }

            $i = 0;
            foreach ($medicines_names as $m_name) {
                $temp_record[$i] = array(
                    "name" => $m_name,
                    "value" => $m[$i],
                    "percent" => number_format($m[$i] / $total * 100, 2)
                );
                $i++;
            }

            //print_r($temp_record);
				//$r2->free();
				$response=array('items'=>$temp_record);
				//$response=$temp_record;
                //array_push($response,array('totalCount' => 1421));

		break;
	   }


}else{
	$response=array('success'=>false,'data'=>false);	
}
echo  json_encode($response);
?>