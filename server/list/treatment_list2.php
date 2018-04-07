<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');


$file = 'd:\people.txt';
file_put_contents($file, "pid: ". $_GET['pid'] . ", rid: ". $_GET['rid']);

// count the Data
$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_treatment` t  where t.`patient_id` = ".$_GET['pid']."  and t.`reg_id` = ". $_GET['rid']);

$row =  $result->fetch_assoc();//
$d_count = $row['count'];


// count the Dates

$result = $mysqli->query("SELECT t.*  FROM `a_patient_treatment` t  where t.`patient_id` = ".$_GET['pid']." and t.`reg_id` = ". $_GET['rid'] . " ORDER BY `date` DESC");
while($d = $result->fetch_array()){
	$dates_array[]=array(
		"treatment_id"=>$d['treatment_id'],
		"udate"=>$d['date'],
		"date"=>(abs($d['date'])< 1000)? "-" : date('d.m.Y', $d['date']),
	);

}




$query= $mysqli->query("
                      SELECT tm.*, m.name as medicines, md.name as dosage
                      FROM a_treatment_medicines tm
                      LEFT JOIN a_patient_treatment t ON t.treatment_id = tm.treatment_id
                      Inner join a_medicines m on m.medicine_id = tm.medicine_id
                      Inner join a_medicines_dosage md on md.dosage_id = tm.dosage_id
                      WHERE t.patient_id =".$_GET['pid']."
                      AND t.reg_id =". $_GET['rid']."
                      GROUP BY `medicine_id`");


$t_record[] = array();


if($query) {
	$i = 0;
	while ($r = $query->fetch_array()) {



		$j=0;

		foreach ($dates_array as $date) {


			$query2 = $mysqli->query("
                                   SELECT md.name as value
                                   FROM `a_treatment_medicines` tm
                                   INNER JOIN `a_patient_treatment` pt ON pt.treatment_id = tm.treatment_id
                                   INNER JOIN `a_medicines_dosage` md on md.dosage_id = tm.dosage_id
                                   WHERE pt.`date` = " . $date['udate'] . "
                                   AND tm.medicine_id = " . $r['medicine_id'] . "
                                   AND	pt.patient_id =".$_GET['pid']." 	AND pt.reg_id = ".$_GET['rid']);



			if ($query2) {


				$r2 = $query2->fetch_array();

				$temp_record[$j][$i] = array(
					"medicines" => $r['medicines'],
					"value" => $r2['value']
				);
			}


			$j++;

		}

		$i++;

	}

	//$r2->free();
	$response = array('items' => $temp_record, 'totalCount' => $d_count, 'dates' => $dates_array);
	//$response=$temp_record;
	//array_push($response,array('totalCount' => 1421));


}

//print_r($response);

//echo  json_encode($response);

$columndata = array();
$columndata[0] =array('header' => 'დასახელება', 'width' => 150, 'sortable' => true, 'dataIndex' => 'medicines');
$i=1;
foreach ($dates_array as $date)
{
	$columndata[$i] =array('header' => $date['date'], 'width' => 100, 'sortable' => true, 'dataIndex' => $date['date']);
	$i++;
}

$fielddata = array();
$fielddata[0] =array('name' => 'medicines', 'type' => 'string' );
$i=1;
foreach ($dates_array as $date)
{
	$fielddata[$i] =array('name' => $date['date'], 'type' => 'string');
	$i++;
}

$values = array();
$i = 0;
foreach ($temp_record[0] as $record) {
	$j = 0;
	$values[$i] = array($record['medicines']);
	foreach ($dates_array as $date) {
		array_push($values[$i],$temp_record[$j][$i]['value']);
		$j++;
	}

	$i++;
}

//print_r($values);


echo json_encode(
	array(
		'columndata' => $columndata,
		'fielddata' => $fielddata ,
		'values' => $values
	)

);


?>