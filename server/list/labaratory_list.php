<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');



// count the Data
$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_labaratory` pl  where pl.`patient_id` = ".$_GET['pid']."  and pl.`reg_id` = ". $_GET['rid']);

$row =  $result->fetch_assoc();//
$d_count = $row['count'];


// count the Dates

$result = $mysqli->query("SELECT pl.*  FROM `a_patient_labaratory` pl  where pl.`patient_id` = ".$_GET['pid']." and pl.`reg_id` = ". $_GET['rid'] . " ORDER BY `date` DESC");
while($d = $result->fetch_array()){
	$dates_array[]=array(
		"labaratory_id"=>$d['labaratory_id'],
		"udate"=>$d['date'],
		"date"=>(abs($d['date'])< 1000)? "-" : date('d.m.Y', $d['date']),
	);

}




$query= $mysqli->query("
                      SELECT pl.*, a.name as analysis
                      FROM a_labaratory_analysis pl
                      LEFT JOIN a_patient_labaratory l ON l.labaratory_id = pl.labaratory_id
                      Inner join a_analysis a on a.analysis_id = pl.analysis_id
                      WHERE l.patient_id =".$_GET['pid']."
                      AND l.reg_id =". $_GET['rid']."
                      GROUP BY `analysis_id`");


$t_record[] = array();


if($query) {
	$i = 0;
	while ($r = $query->fetch_array()) {



		$j=0;

		foreach ($dates_array as $date) {


			$query2 = $mysqli->query("
                                   SELECT value
                                   FROM `a_labaratory_analysis` la
                                   INNER JOIN `a_patient_labaratory` pl ON pl.labaratory_id = la.labaratory_id
                                   WHERE pl.`date` = " . $date['udate'] . "
                                   AND la.analysis_id = " . $r['analysis_id'] . "
                                   AND	pl.patient_id =".$_GET['pid']." 	AND pl.reg_id = ".$_GET['rid']);



			if ($query2) {


				$r2 = $query2->fetch_array();

				$temp_record[$j][$i] = array(
					"analysis" => $r['analysis'],
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
$columndata[0] =array('header' => 'დასახელება', 'width' => 150, 'sortable' => true, 'dataIndex' => 'analysis');
$i=1;
foreach ($dates_array as $date)
{
	$columndata[$i] =array('header' => $date['date'], 'width' => 100, 'sortable' => true, 'dataIndex' => $date['date']);
	$i++;
}

$fielddata = array();
$fielddata[0] =array('name' => 'analysis', 'type' => 'string' );
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
	$values[$i] = array($record['analysis']);
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