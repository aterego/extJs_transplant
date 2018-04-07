<?php
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");



//date_default_timezone_set('Asia/Tbilisi');
$act="";
$response=array();
$temp_record=array();


// count the Dates
//AND YEAR( FROM_UNIXTIME( t.`date` ) ) > YEAR( DATE_SUB( NOW( ) , INTERVAL 12 YEAR ) )
$result = $mysqli->query("SELECT DISTINCT YEAR( FROM_UNIXTIME( dt ) ) AS year
                                FROM
                                (
                                  SELECT pc.date as dt, pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                   `a_patient_category` pc
                                   GROUP BY id
                                ) AS p
                                LEFT JOIN `categories` c ON c.category_id = p.m
                                WHERE c.parent_category_id Not in(30,45,51)
                                GROUP BY year ORDER BY year ASC");



while($y = $result->fetch_array()){
	$years_array[]=array(
		"year"=>$y['year'],
	);

}



		$j=0;

		foreach ($years_array as $y) {


               $query = $mysqli->query("SELECT DISTINCT COUNT( id ) AS count
                                          FROM
                                          (
                                              SELECT  pc.`patient_id` as id,  max(pc.`category_id`) as m FROM
                                               `a_patient_category` pc
                                              WHERE YEAR( FROM_UNIXTIME( pc.`date` ) ) = " . $y['year']
                                            . " GROUP BY id
                                          ) AS p
                                          LEFT JOIN `categories` c2 ON c2.category_id = p.m
                                            WHERE c2.parent_category_id Not in(30,45,51)"
                                        );

              $row = $query->fetch_assoc();
              $count = $row['count'];



                $temp_record[$j] = array(
                    "year" => $y['year'],
                    "count" => $count

                );


                // $file = 'd:\people.txt';
                // file_put_contents($file, $kd."<br>",FILE_APPEND);


                $j++;


		}

		$ccount = 0;
		$ccount += $temp_record[0]['count'];
        $temp_record[0]['year'] = "1995";
        $temp_record[0]['count'] = 0;
        $temp_record[0]['tcount'] = $ccount;

        for($i=1;$i<5;$i++){
          $ccount += $temp_record[$i]['count'];
        }
        $temp_record[1]['year'] = "1996 - 2011";
        $temp_record[1]['count'] = $ccount;
        $temp_record[1]['tcount'] = $ccount;

         array_splice($temp_record, 2, 4);
         //   unset($temp_record[$i]);


         for($i=2;$i<count($temp_record);$i++) {
             $ccount += $temp_record[$i]['count'];
             $temp_record[$i]['tcount'] = $ccount;
         }


	//$r2->free();
	$response = array('items' => $temp_record);
	//$response=$temp_record;
	//array_push($response,array('totalCount' => 1421));




//print_r($response);

    echo  json_encode($response);



?>