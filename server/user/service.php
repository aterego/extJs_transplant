<?php
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
	$mod="tab-user_";
	switch($act){
		case "View":
			$sql=mysql_query("select * from tb_user");
			if($sql){
				while($r=mysql_fetch_array($sql)){
					//$response[]=$fetch;
					$temp_record[]=array(
						"user_id"=>$r['user_id'],
						"user_name"=>$r['user_name'],
						"group_id"=>$r['group_id'],
						"group_name"=>_get_group_name($r['group_id'])
					);	
				}
				$response=$temp_record;
			}
		break;
		
		case "Add":
			$query=mysql_query("insert into tb_user(user_name,user_password,group_id)value('".$_POST[$mod.'txtUserName']."','".$_POST[$mod.'txtPassword']."','".$_POST[$mod.'cmbGroup']."')");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=mysql_query("update tb_user set user_name='".$_POST[$mod.'txtEditUserName']."',group_id='".$_POST[$mod.'cmbEditGroup']."' where user_id='".$_POST['param_id']."'");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=mysql_query("delete from tb_user where user_id='".$_POST['param_id']."'");
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