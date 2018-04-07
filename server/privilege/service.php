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
	switch($act){
		case "View":
			$record[]="";
			$query=$mysqli->query("select * from tb_privilege");
			if($query){
				while($r=$query->fetch_array()){
					$temp_record[]=array(
						"privilege_id"=>$r['privilege_id'],
						"privilege"=>$r['privilege'],
						"module_id"=>$r['module_id']
					);		
				}
				$response=$temp_record;	
			}
		break;
		
		case "Add":
			$id= _kd_auto("privilege_id","tb_privilege","P");
			$query=$mysqli->query("insert tb_privilege (privilege_id,privilege,module_id)value('".$id."','".$_POST['txtPrivilege']."','".$_POST['txtModuleId']."')");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=$mysqli->query("update tb_privilege set privilege='".$_POST['txtEditPrivilege']."',module_id='".$_POST['txtEditModuleId']."' where privilege_id='".$_POST['param_id']."'");
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=$mysqli->query("delete from tb_privilege where privilege_id='".$_POST['param_id']."'");
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