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
	$mod="tab-clinic_";
	switch($act){
		case "View":
			$query= $mysqli->query("SELECT c.*,ci.name as city, co.name as country
                                    FROM a_clinic c 
                                    left join a_cities ci on ci.city_id=c.city_id 
                                    left join a_countries co on co.country_id=c.country_id ORDER BY clinicdesc");
			if($query){
				while($r = $query->fetch_array()){
					$temp_record[]=array(
						"clinic_id"=>$r['clinic_id'],
						"clinicdesc"=>$r['clinicdesc'],
						"country_id"=>$r['country_id'],
						"country"=>$r['country'],
						"city_id"=>$r['city_id'],
						"city"=>$r['city'],
						"clinicaddressur"=>$r['clinicaddressur'],
						"clinicphone"=>$r['clinicphone']
					);
				}
				$response=$temp_record;
			}
		break;
		
		case "Add":

			if(!empty($_POST['country_id']))
				$country_id = $_POST['country_id'];
			else
				$country_id = 0;
			if(!empty($_POST['city_id']))
				$city_id = $_POST['city_id'];
			else
				$city_id = 0;


			$query= $mysqli->query("insert into a_clinic (`clinicdesc`,`country_id`,`city_id`,`clinicaddressur`,`clinicphone`)
                                    values('".$_POST['clinicdesc']."',".$country_id.",".$city_id.",'"
			                               .$_POST['clinicaddressur']."','".$_POST['clinicphone']."')");


			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=$mysqli->query("update a_clinic set `clinicdesc`='".$_POST['clinicdesc']."', `country_id` =".$_POST['country_id'].",
			                              `city_id`=".$_POST['city_id'].", `clinicaddressur`='".$_POST['clinicaddressur']."',
			                              `clinicphone`='".$_POST['clinicphone']."' where clinic_id=".$_POST['param_id']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=$mysqli->query("delete from a_clinic where clinic_id=".$_POST['param_id']);
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