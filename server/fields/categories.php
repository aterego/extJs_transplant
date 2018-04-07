<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");
$act="";
$response=array();
$temp_record=array();

date_default_timezone_set('Asia/Tbilisi');

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
	$mod="tab-categories_";
	switch($act){
		case "View":

		    //if arch
		  $result= $mysqli->query(" SELECT COUNT(*) AS count
                                          FROM ( SELECT pc.`patient_id` as id, max(pc.`category_id`) as m
                                            FROM `a_patient_category` pc GROUP BY id )
                                             AS ac 
                                            
                                            WHERE ac.id=".$_POST['param_id']." AND ac.m in(57,58,59,60,61,62)");


            $row =  $result->fetch_assoc();//
			$count = $row['count'];

		    if($count>0) {

		        if(isset($_POST['reg_id']))
		            $whereClause = " WHERE ac.id=" . $_POST['param_id'] . " AND ac.reg_id =" . $_POST['reg_id'];
		        else
		            $whereClause = " WHERE ac.id=" . $_POST['param_id'];

                $query = $mysqli->query("SELECT ac.m,ac.reg_id,c.parent_category_id,c.category_name, c.prefix, ac.md, ac.id 
                                            FROM ( SELECT pc.`patient_id` as id, max(pc.`category_id`) as m, reg_id, max(date) as md
                                            FROM `a_patient_category` pc GROUP BY id )
                                             AS ac 
                                             inner join categories as c on c.category_id=ac.m ".$whereClause);

                if($query){
                    $c = 0;
                    while($r = $query->fetch_array()){
                        $temp_record[]=array(
                            "category_id"=>$r['m'],
                            "reg_id"=>$r['reg_id'],
                            "parent_category_id"=>$r['parent_category_id'],
                            "category_name"=>$r['category_name'],
                            "prefix"=>$r['prefix'],
                            "patient_id"=>$r['id'],
                            "date"=>(abs($r['md'])< 1000)? "-" : date('d.m.Y', $r['md']),
                        );
                    }
                    $response=$temp_record;
                }


            }
            else{
                    $query= $mysqli->query("SELECT * FROM `categories` c inner join a_patient_category as ac on ac.category_id= c.`category_id` WHERE ac.patient_id=".$_POST['param_id']. " AND ac.reg_id =".$_POST['reg_id']);
                    if($query){
                        $c = 0;
                        while($r = $query->fetch_array()){
                            $temp_record[]=array(
                                "category_id"=>$r['category_id'],
                                "reg_id"=>$r['reg_id'],
                                "parent_category_id"=>$r['parent_category_id'],
                                "category_name"=>$r['category_name'],
                                "prefix"=>$r['prefix'],
                                "patient_id"=>$r['patient_id'],
                                "date"=>(abs($r['date'])< 1000)? "-" : date('d.m.Y', $r['date']),
                            );
                        }
                        $response=$temp_record;
                    }
            }


		break;
		
		case "Add":

			$d = DateTime::createFromFormat('m/d/Y/H:i:s', date("m/d/Y")."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
			$date = $d->getTimestamp();

			$query= $mysqli->query("insert into a_patient_category (`patient_id`,`category_id`, `date`) 
               values(".$_POST['patient_id'].",".$_POST['category_id']."," .$date. ")");
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
			else {
				$d = DateTime::createFromFormat('m/d/Y/H:i:s', date("m/d/Y")."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$date = $d->getTimestamp();
			}

			$query=$mysqli->query("update a_patient_category set `date`='".$date."' where patient_id=".$_POST['param_id']." and category_id=".$_POST['category_id']);
			
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=$mysqli->query("delete from a_patient_category where patient_id=".$_POST['param_id']." and reg_id=".$_POST['reg_id']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "AddModule":
			$query=mysql_query("Update tb_group set privilege='".$_POST['param_module']."' where group_id='".$_POST['param_id']."'")or die (mysql_error());
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