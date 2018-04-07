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

            $donorsArray=array(array('მეუღლე','სიძე (დის ქმარი)'),
                                array('მეგობარი','ნათლია', 'არანათესავი','ემოციური სიახლოვე'),
                                array('გვამი'));

            $m = array();

            foreach($donorsArray as $donor)
             {
                 $i=0;
              	foreach($donor as $key=>$value)
              	{
              	    if($i == 0)
                     $whereClause = " WHERE cat.parent_category_id IN(39) AND d.name='".$value."'";
              	    else
              	     $whereClause .= " OR d.name='".$value."'";

                    $i++;
                }

                    $sql = "SELECT  DISTINCT COUNT(t.patient_id) AS count 
                            FROM
                            ( SELECT pc.`patient_id` as id, max(pc.`category_id`) as m 
                            FROM `a_patient_category` pc GROUP BY id ) AS tr 
                            LEFT JOIN  `a_transplantations`  t ON t.`patient_id` = tr.id  
                            LEFT JOIN `categories` cat ON cat.category_id = tr.m                                                     
                            LEFT JOIN `a_donor_types` d on d.`donor_type_id`=t.`donor_type_id`".
                            $whereClause;
                    // count the Data სელსეპტი
                    $result = $mysqli->query($sql);



                    $row = $result->fetch_assoc();//
                    $m[] = $row['count'];

            }


            $whereClause = " WHERE cat.parent_category_id IN(39) AND ";
            $i=0;
            foreach($donorsArray as $donor)
             {
              	foreach($donor as $key=>$value)
              	{
              	    if($i == 0)
                     $whereClause .= "d.name!='".$value."'";
              	    else
              	     $whereClause .= " AND d.name!='".$value."'";

                    $i++;
                }

            }
            $whereClause .= " OR d.`donor_type_id`IS NULL";
            $sql = "SELECT  DISTINCT COUNT(t.patient_id) AS count 
                    FROM
                    ( SELECT pc.`patient_id` as id, max(pc.`category_id`) as m 
                   FROM `a_patient_category` pc GROUP BY id ) AS tr 
                    LEFT JOIN  `a_transplantations`  t ON t.`patient_id` = tr.id  
                    LEFT JOIN `categories` cat ON cat.category_id = tr.m                                             
                    LEFT JOIN `a_donor_types` d on d.`donor_type_id`=t.`donor_type_id`".
                    $whereClause;
            // count the Data სელსეპტი
            $result = $mysqli->query($sql);
            $row = $result->fetch_assoc();//
            $m[] = $row['count'];




            $total = 0;
            $i = 0;
            foreach($donorsArray as $donor) {
                    $total += $m[$i];
                    $i++;
            }
            $total += $m[$i];


            $i = 0;
            $names = array('არაგენეტიკური ნატესავი','ემოციური სიახლოვე','გვამი','გენეტიკური ნათესავი');
            foreach($donorsArray as $donor) {
                $temp_record[$i] = array(
                    "name" => $names[$i],
                    "value" => $m[$i],
                    "percent" => number_format($m[$i] / $total * 100, 2)
                );
                $i++;
            }
            $temp_record[$i] = array(
                "name" => $names[$i],
                "value" => $m[$i],
                "percent" => number_format($m[$i] / $total * 100, 2)
            );

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