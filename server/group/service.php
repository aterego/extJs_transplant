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
	$mod="tab-group_";
	switch($act){
		case "View":
			$query=mysql_query("select * from tb_group");
			if($query){
				while($r=mysql_fetch_array($query)){
					$temp_record[]=array(
						"group_id"=>$r['group_id'],
						"group_name"=>$r['group_name'],
						"privilege"=>$r['privilege']
					);	
				}
				$response=$temp_record;
			}
		break;
		
		case "Add":
			$id= _kd_auto("group_id","tb_group","G");
			$query=mysql_query("insert tb_group (group_id,group_name)value('".$id."','".$_POST[$mod.'txtGroupName']."')");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=mysql_query("update tb_group set group_name='".$_POST[$mod.'txtEditGroupName']."' where group_id='".$_POST['param_id']."'");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=mysql_query("delete from tb_group where group_id='".$_POST['param_id']."'");
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