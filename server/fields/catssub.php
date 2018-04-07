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
			$query= $mysqli->query("SELECT * FROM categories WHERE parent_category_id=". $_POST['parent_category_id']);
			if($query){
				while($r = $query->fetch_array()){
					$temp_record[]=array(
						"category_id"=>$r['category_id'],
                        "parent_category_id"=>$_POST['parent_category_id'],
						"category_name"=>$r['category_name'],
						"prefix"=>$r['prefix']
					);
				}

				$response=$temp_record;
			}
		break;
        case "Add":

            if(isset($_POST['parent_category_id'])) {
                if($_POST['parent_category_id'] > 0)
                    $parentCat = $_POST['parent_category_id'];
                else
                    $parentCat = 0;
            }
            else
                $parentCat = 0;

            $query= $mysqli->query("insert into categories (`parent_category_id`, `category_name`, `prefix`) 
                                     values(".$parentCat.",'".$_POST['category_name']. "','". $_POST['prefix']."')");
            if($query){
                $response = array( 'success'=>true, 'data'=>true );
            }else{
                $response=array('success'=>false,'data'=>false);
            }
            break;

        case "Update":
            $query=$mysqli->query("update categories set `parent_category_id`=".$_POST['parent_category_id'].",  `category_name`='".$_POST['category_name']."',
			                     `prefix`='".$_POST['prefix']."' where category_id=".$_POST['category_id']);
            if($query){
                $response = array( 'success'=>true, 'data'=>true );
            }else{
                $response=array('success'=>false,'data'=>false);
            }
            break;

        case "Delete":
            $query=$mysqli->query("delete from categories where category_id=".$_POST['param_id']);
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