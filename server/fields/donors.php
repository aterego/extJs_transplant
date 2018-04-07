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
	$mod="tab-city_";
	switch($act){
		case "View":
			$query= $mysqli->query("SELECT * FROM a_donor_types ORDER BY `name`");
			if($query){
				while($r = $query->fetch_array()){
					$temp_record[]=array(
						"donor_type_id"=>$r['donor_type_id'],
						"name"=>$r['name']
					);
				}
				$response=$temp_record;
			}
		break;
		
		case "Add":

			$query= $mysqli->query("insert into a_donor_types (`name`) values('".$_POST['name']."')");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=$mysqli->query("update a_donor_types set `name`='".$_POST['name']."' where donor_type_id=".$_POST['param_id']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=$mysqli->query("delete from a_donor_types where donor_type_id=".$_POST['param_id']);
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