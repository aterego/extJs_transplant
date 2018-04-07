<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



date_default_timezone_set('Asia/Tbilisi');
$act="";
$response=array();
$temp_record=array();

/*
// count the Dates
//AND YEAR( FROM_UNIXTIME( t.`date` ) ) > YEAR( DATE_SUB( NOW( ) , INTERVAL 12 YEAR ) )
$result = $mysqli->query("SELECT DISTINCT YEAR( FROM_UNIXTIME( t.`date` ) ) AS year
                          FROM `a_transplantations` t
                          INNER JOIN `a_patient_category` ON `a_patient_category`.patient_id = t.`patient_id`
                          LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                          WHERE `category_id` IN ( 43 ) AND c.country_id =4302
                          
                          ORDER BY year ASC");


while($y = $result->fetch_array()){
	$years_array[]=array(
		"year"=>$y['year'],
	);

}

*/
$j =0 ;
for($y = 1995; $y <= date('Y'); $y++) {
   $years_array[]=array(
		"year"=>$y,
	);
    $j++;
}





$result = $mysqli->query("SELECT COUNT( * ) AS count, c.clinicdesc AS clinic, c.clinic_id
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE  pc.category_id IN (43 ) AND c.country_id =4302
                                     GROUP BY c.clinic_id");


while($c = $result->fetch_array()){
	$clinic_array[]=array(
		"clinic"=>$c['clinic'],
        "clinic_id"=>$c['clinic_id']
	);

}





		$j=0;

		foreach ($years_array as $y) {



                $clinicCount = array();
                for($i=0;$i<12;$i++)
                  $clinicCount[$i] = 0;

                $i = 0;
                foreach ($clinic_array as $c) {

                    $query = $mysqli->query("SELECT COUNT( * ) AS count
                                     FROM `a_transplantations` t
                                     INNER JOIN `a_patient_category` pc ON pc.patient_id = t.`patient_id`
                                     LEFT JOIN `a_clinic` c ON c.clinic_id = t.clinic_id
                                     WHERE YEAR( FROM_UNIXTIME( t.`date` ) ) = " . $y['year']
                        . " AND pc.category_id IN (43) AND c.country_id =4302
                                     AND c.clinic_id =" . $c["clinic_id"]
                    );


                    $row = $query->fetch_assoc();
                    $clinicCount[$i] = $row['count'];


                    $i++;
                }

                $temp_record[$j] = array(
                    "year" => $y['year'],
                    //"liv" =>  array("count" => $tCount,"clinic" => $clinic)
                    "c1" => $clinicCount[0],
                    "c2" => $clinicCount[1],
                    "c3" => $clinicCount[2],
                    "c4" => $clinicCount[3],
                    "c5" => $clinicCount[4],
                    "c6" => $clinicCount[5],
                    "c7" => $clinicCount[6],
                    "c8" => $clinicCount[7],
                    "c9" => $clinicCount[8],
                    "c10" => $clinicCount[9],
                    "c11" => $clinicCount[10],
                    "c12" => $clinicCount[11],
                );

                $j++;


		}


		$cc1 = 0;
        $cc2 = 0;
        $cc3 = 0;
        $cc4 = 0;
        $cc5 = 0;
        $cc6 = 0;
        $cc7 = 0;
        $cc8 = 0;
        $cc9 = 0;
        $cc10 = 0;
        $cc11 = 0;
        $cc12 = 0;


        for($i=0;$i<20;$i++){
          $cc1 += $temp_record[$i]['c1'];
          $cc2 += $temp_record[$i]['c2'];
          $cc3 += $temp_record[$i]['c3'];
          $cc4 += $temp_record[$i]['c4'];
          $cc5 += $temp_record[$i]['c5'];
          $cc6 += $temp_record[$i]['c6'];
          $cc7 += $temp_record[$i]['c7'];
          $cc8 += $temp_record[$i]['c8'];
          $cc9 += $temp_record[$i]['c9'];
          $cc10 += $temp_record[$i]['c10'];
          $cc11 += $temp_record[$i]['c11'];
          $cc12 += $temp_record[$i]['c12'];

        }

        //$temp_record[0]['year'] = "1995 - 2009";
        $temp_record[0]['year'] = "2014";
        $temp_record[0]['c1'] = $cc1;
        $temp_record[0]['c2'] = $cc2;
        $temp_record[0]['c3'] = $cc3;
        $temp_record[0]['c4'] = $cc4;
        $temp_record[0]['c5'] = $cc5;
        $temp_record[0]['c6'] = $cc6;
        $temp_record[0]['c7'] = $cc7;
        $temp_record[0]['c8'] = $cc8;
        $temp_record[0]['c9'] = $cc9;
        $temp_record[0]['c10'] = $cc10;
        $temp_record[0]['c11'] = $cc11;
        $temp_record[0]['c12'] = $cc12;




         array_splice($temp_record, 1, 19);
         //   unset($temp_record[$i]);



	//$r2->free();
	$response = array('items' => $temp_record);
	//$response=$temp_record;
	//array_push($response,array('totalCount' => 1421));



//print_r($response);

    echo  json_encode($response);



?>