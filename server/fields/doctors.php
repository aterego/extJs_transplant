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
			$query= $mysqli->query("SELECT d.*,c.clinicdesc as clinic
                                    FROM a_doctor d 
                                    left join a_clinic c on c.clinic_id=d.clinic_id ORDER BY doctorlastname, doctorname");
			if($query){
				while($r = $query->fetch_array()){

					$dnameFull = "";
					if(!empty($r['doctorlastname']))
						$dnameFull.=$r['doctorlastname'];
					if(!empty($r['doctorname']))
						$dnameFull.= " " . $r['doctorname'];

					$temp_record[]=array(
						"doctor_id"=>$r['doctor_id'],
						"doctorname"=>$r['doctorname'],
						"doctorlastname"=>$r['doctorlastname'],
						"dnameFull"=>$dnameFull,
						"clinic_id"=>$r['clinic_id'],
						"clinic"=>$r['clinic'],
						"phone1"=>$r['phone1'],
						"email"=>$r['email']
					);
				}
				$response=$temp_record;
			}
		break;
		
		case "Add":

			if(!empty($_POST['clinic_id']))
				$clinic_id = $_POST['clinic_id'];
			else
				$clinic_id = 0;


			$query= $mysqli->query("insert into a_doctor (`doctorname`,`doctorlastname`,`clinic_id`,`phone1`,`email`)
                                    values('".$_POST['doctorname']."','".$_POST['doctorlastname']."',".$clinic_id.",'"
			                               .$_POST['phone1']."','".$_POST['email']."')");


			if($query){
				$response = array( 'success'=>true, 'data'=>true );	
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":
			$query=$mysqli->query("update a_doctor set `doctorname`='".$_POST['doctorname']."', `doctorlastname` ='".$_POST['doctorlastname']."',
			                              `clinic_id` = ".$_POST['clinic_id'].", `phone1`='".$_POST['phone1']."', `email`='".$_POST['email']."' 
			                               where doctor_id=".$_POST['param_id']);
			if($query){
				$response = array( 'success'=>true, 'data'=>true );
			}else{
				$response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Delete":
			$query=$mysqli->query("delete from a_doctor where doctor_id=".$_POST['param_id']);
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