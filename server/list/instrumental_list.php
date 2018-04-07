<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');



// count the Data
$result = $mysqli->query("SELECT COUNT(*) AS count FROM `a_patient_instrumental` pi  where pi.`patient_id` = ".$_GET['pid']."  and pi.`reg_id` = ". $_GET['rid']);

$row =  $result->fetch_assoc();//
$d_count = $row['count'];


// count the Dates

$result = $mysqli->query("SELECT pi.*  FROM `a_patient_instrumental` pi  where pi.`patient_id` = ".$_GET['pid']." and pi.`reg_id` = ". $_GET['rid'] . " ORDER BY `date` DESC");
while($d = $result->fetch_array()){
	$dates_array[]=array(
		"instrumental_id"=>$d['instrumental_id'],
		"udate"=>$d['date'],
		"date"=>(abs($d['date'])< 1000)? "-" : date('d.m.Y', $d['date']),
	);

}





		$j=0;

		foreach ($dates_array as $date) {


			$query2 = $mysqli->query("
                                   SELECT p.name as `procedure`, value
                                   FROM `a_instrumental_procedures` ip
                                   INNER JOIN `a_patient_instrumental` pi ON pi.instrumental_id = ip.instrumental_id
                                   Inner join a_procedures p on p.procedure_id = ip.procedure_id
                                   WHERE pi.`date` = " . $date['udate'] . "
                                   AND	pi.patient_id =".$_GET['pid']." AND pi.reg_id = ".$_GET['rid']);



			if ($query2) {


				$r2 = $query2->fetch_array();

				$temp_record[$j] = array(
					"procedure" => $r2['procedure'],
					"value" => $r2['value']
				);
			}


			$j++;

		}




	//$r2->free();
	$response = array('items' => $temp_record, 'totalCount' => $d_count, 'dates' => $dates_array);
	//$response=$temp_record;
	//array_push($response,array('totalCount' => 1421));




//print_r($response);

//echo  json_encode($response);

$columndata = array();
$i=0;
foreach ($dates_array as $date)
{
	$columndata[$i] =array('header' => $date['date'], 'width' => 150, 'sortable' => true, 'dataIndex' => $date['date'], 'tdCls' => 'myColumnClass');
	$i++;
}

$fielddata = array();
$i=0;
foreach ($dates_array as $date)
{
	$fielddata[$i] =array('name' => $date['date'], 'type' => 'string');
	$i++;
}



$values = array();
$i = 0;
//foreach ($temp_record as $record) {
	$j = 0;
	$values[$i] = array("<strong>".$temp_record[0]['procedure']."</strong>"." - ".$temp_record[0]['value']);
	foreach ($dates_array as $date) {
		if($j>0)
		 array_push($values[$i],"<strong>".$temp_record[$j]['procedure']."</strong>"." - ".$temp_record[$j]['value']);
		$j++;
	}

	//$i++;
//}
//print_r($values);

$json = json_encode(
	array(
		'columndata' => $columndata,
		'fielddata' => $fielddata ,
		'values' => $values
	)

);

// Decode the html entities and end up with unicode again.
echo  html_entity_decode($json);




?>