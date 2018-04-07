<?php
ob_start();
session_start();
include("../inc/connection.php");
$response=array();
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
		$response=0;
		$data_ar=array();
		$data=explode("|",$_SESSION['user']);
		if(!empty($data[3])){
			$sql=mysql_query("select privilege from tb_group where group_id='".$data[3]."'")or die(mysql_error());
			if($sql){
				$result=mysql_fetch_array($sql);
				$data_j=json_decode($result['privilege']);
				foreach($data_j as $v){
					if($v->module_id==$_POST['param_id']){
						$response=1;
					}
				}
			}
		
		}
		break;

		case "Acc":
			$response=0;
			$data_ar=array();
			$data=explode("|",$_SESSION['user']);
			if(!empty($data[3])){
				$sql=mysql_query("select privilege from tb_group where group_id='".$data[3]."'")or die(mysql_error());
				if($sql){
					$result=mysql_fetch_array($sql);
					$data_j=json_decode($result['privilege']);
					$acc = '3';
					foreach($data_j as $v){
						//***AVA*** rw access
						if($v->module_id=='r'){
							$acc = 'r';
							$_SESSION['acc'] = 'r';
						}
						if($v->module_id=='w'){
							$acc = 'w';
							$_SESSION['acc'] = 'w';
						}
						if($v->module_id=='f'){
							$acc = 'f';
							$_SESSION['acc'] = 'f';
						}

					}
				}
				$response = $acc;

			}
			break;
	}
	
}

echo  json_encode($response);

?>