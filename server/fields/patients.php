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
$pid="";
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
	$mod="tab-patient_";
	switch($act){
		case "View":


		 if(empty($pid)) {

			 // count the Data
			 $result = $mysqli->query("SELECT COUNT(*) AS count FROM a_patient");

			 $row = $result->fetch_assoc();//
			 $count = $row['count'];

			 $where = "";
		 }
		 else {

			 $count = 1;
			 $where =" WHERE patient_id=".$pid;

		 }




			$query= $mysqli->query("SELECT p.*, c.name AS city, co.name AS country FROM `a_patient` p LEFT JOIN a_cities c on c.city_id = p.city_id LEFT JOIN a_countries co on co.country_id = p.country_id".$where. " ORDER BY patientlastname, patientname");
			if($query){
				while($r = $query->fetch_array()){

					$pnameFull = "";
					if(!empty($r['patientlastname']))
						$pnameFull.=$r['patientlastname'];
					if(!empty($r['patientname']))
						$pnameFull.= " " . $r['patientname'];

					$temp_record[]=array(
						"patient_id"=>$r['patient_id'],
						"patientname"=>$r['patientname'],
						"patientlastname"=>$r['patientlastname'],
						"patronymic"=>$r['patronymic'],
						"patientFull"=>$pnameFull,
						"country_id"=>$r['country_id'],
						"country_name"=>$r['country'],
						"city_id"=>$r['city_id'],
						"city_name"=>$r['city'],
						"personalid"=>$r['personalid'],
						"history_id"=>$r['history_id'],
						"birthday"=>(abs($r['birthday'])< 1000)? "-" : date('d.m.Y', $r['birthday']),
						"gendercode"=>$r['gendercode'],
						"gender"=>($r['gendercode']==1)? "მამრობითი" : "მდედრობითი",
						"phone1"=>$r['phone1'],
						"phone2"=>$r['phone2'],
						"email"=>$r['email'],
						"address1"=>$r['address1'],
						"address2"=>$r['address2'],
						"work_phone"=>$r['work_phone'],
						"work"=>$r['work'],
						"editorcode"=>$r['editorcode']
					);
				}
				$response=$temp_record;

			}
		break;
		
		case "Add":

			if(!empty($_POST['birthday'])) {
				$birthd = DateTime::createFromFormat('m/d/Y', $_POST['birthday'], new DateTimeZone('Asia/Tbilisi'));
				$birthday = $birthd->getTimestamp();
			}
		    else {
				$birthd = DateTime::createFromFormat('m/d/Y/H:i:s', date("m/d/Y")."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$birthday = $birthd->getTimestamp();
			}

			if(!empty($_POST['country_id']))
				$country_id = $_POST['country_id'];
			else
				$country_id = 0;
			if(!empty($_POST['city_id']))
				$city_id = $_POST['city_id'];
			else
				$city_id = 0;
			if(!empty($_POST['gendercode']))
				$gendercode = $_POST['gendercode'];
			else
				$gendercode = 2;


			$query= $mysqli->query("insert into a_patient (`patientname`,`patientlastname`,`patronymic`,`country_id`,
                                                `city_id`,`personalid`,`history_id`,`birthday`,`gendercode`,`phone1`,`phone2`,
                                                `email`,`address1`,`address2`,`work_phone`,`work`,`editorcode`) 
                                                values('".$_POST['patientname']."','".$_POST['patientlastname']."','".$_POST['patronymic'].
			                                       "',".$country_id.",".$city_id.",'".$_POST['personalid']."','".$_POST['history_id'].
				                                   "',".$birthday.",".$gendercode.",'".$_POST['phone1']."','".$_POST['phone2'].
				                                   "','".$_POST['email']."','".$_POST['address1']."','".$_POST['address2']."','".$_POST['work_phone'].
				                                   "','".$_POST['work']."','editor')");


            $id = $mysqli->insert_id;

			if(isset($_FILES)) {


				if ($_FILES['image']['size'] > 0) {
					$fileName = $_FILES['image']['name']; // image file name
					$tmpName = $_FILES['image']['tmp_name']; // name of the temporary stored file name
					$fileSize = $_FILES['image']['size']; // size of the uploaded file
					$fileType = $_FILES['image']['type']; // file type


					$image = $tmpName;
					copy($tmpName, "../../uploads/" . $fileName);
					$width = 200; //*** Fix Width & Heigh (Auto calculate) ***//
					$size = GetimageSize($image);
					$height = round($width * $size[1] / $size[0]);
					$image_orig = ImageCreateFromJPEG($image);
					$photoX = ImagesX($image_orig);
					$photoY = ImagesY($image_orig);
					$image_fin = ImageCreateTrueColor($width, $height);
					ImageCopyResampled($image_fin, $image_orig, 0, 0, 0, 0, $width + 1, $height + 1, $photoX, $photoY);
					ImageJPEG($image_fin, "../../uploads/" . $fileName);
					ImageDestroy($image_orig);
					ImageDestroy($image_fin);

					//$fp  = fopen("uploads/".$fileName, 'rb'); // open a file handle of the temporary file
					//$imgContent  = fread($fp, filesize($image_fin)); // read the temp file
					//fclose($fp); // close the file handle




					$rs = $mysqli->query('select * from a_patient_photo where patient_id =' . $id);
					$count = $rs->num_rows;


					if ($count > 0)
						$query2 = $mysqli->query("UPDATE a_patient_photo SET  image='" . mysql_escape_string(file_get_contents("../../uploads/" . $fileName)) . "'
                                     WHERE patient_id=" . $id);
					else
						$query2 = $mysqli->query("INSERT INTO a_patient_photo (patient_id, image)
                        VALUES(" . $id . ",'" . mysql_escape_string(file_get_contents("../../uploads/" . $fileName)) . "')");



					unlink("../../uploads/" . $fileName);


					//header('Location: ' . $root . 'index.php');
					//die();

				} //else die("You have not selected any image");

			}

			$d = DateTime::createFromFormat('m/d/Y/H:i:s', date("m/d/Y")."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
			$date = $d->getTimestamp();

			$query3= $mysqli->query("insert into a_patient_category (`patient_id`,`category_id`, `date`) 
               values(".$id.",".$_POST['category_id']."," .$date. ")");

			$reg_id = $mysqli->insert_id;

			//***AVA*** determine if patient in transplantations category only

			$query33= $mysqli->query("select parent_category_id as parent from categories where category_id=".$_POST['category_id']);
			$r33 = $query33->fetch_array();
            /*
			if($r33["parent"] != 29 && $r33["parent"] != 45 && $r33["parent"] != 30) {
			*/
             if($r33["parent"] == 30) {
                 $query4 = $mysqli->query("insert into a_transplantations (`reg_id`,`patient_id`, `date`, `donor_type_id`, `clinic_id`,`operator_id`,`doctor_id`, `diagnosis_id`, `dn`) 
                  values(" . $reg_id . "," . $id . "," . 0 . ",0,0,0,0,0,1)");

			}
			else{
                $query4 = $mysqli->query("insert into a_transplantations (`reg_id`,`patient_id`, `date`, `donor_type_id`, `clinic_id`,`operator_id`,`doctor_id`, `diagnosis_id`) 
                 values(" . $reg_id . "," . $id . "," . $date . ",0,0,0,0,0)");
            }

			if($query && $query2 && $query3 && $query4){
				$response = array('success'=>true, 'data'=>true );
			}else{
			    $response=array('success'=>false,'data'=>false);
			}
		break;
		
		case "Update":

			if(!empty($_POST['birthday'])) {
				$birthd = DateTime::createFromFormat('m/d/Y', $_POST['birthday'], new DateTimeZone('Asia/Tbilisi'));
				$birthday = $birthd->getTimestamp();
			}
			else {
				$birthd = DateTime::createFromFormat('m/d/Y/H:i:s', date("m/d/Y")."/11:00:00", new DateTimeZone('Asia/Tbilisi'));
				$birthday = $birthd->getTimestamp();
			}
			if(!empty($_POST['country_id']))
				$country_id = $_POST['country_id'];
			else
				$country_id = 0;
			if(!empty($_POST['city_id']))
				$city_id = $_POST['city_id'];
			else
				$city_id = 0;
			if(!empty($_POST['gendercode']))
				$gendercode = $_POST['gendercode'];
			else
				$gendercode = 2;
			if(!empty($_POST['rhesus']))
				$rhesus = $_POST['rhesus'];
			else
				$rhesus = 0;


			$query=$mysqli->query("update a_patient set patientname='".$_POST['patientname']."', patientlastname='".$_POST['patientlastname']."',
			                                         patronymic='".$_POST['patronymic']."',country_id=".$country_id.",city_id=".$city_id.",
			                                         personalid='".$_POST['personalid']."',history_id='".$_POST['history_id']."',
			                                         birthday=".$birthday.",gendercode=".$gendercode.",phone1='".$_POST['phone1']."',
			                                         phone2='".$_POST['phone2']."',email='".$_POST['email']."',address1='".$_POST['address1']."',
			                                         address2='".$_POST['address2']."',work_phone='".$_POST['work_phone']."',work='".$_POST['work']."',
			                                         editorcode='editor' 
						
			                     where patient_id='".$_POST['param_id']."'");


			$query2=$mysqli->query("update a_patient_info set blood_type_id=".$_POST['blood_type_id'].", rhesus=".$rhesus.",
			                                         info='".$_POST['info']."'
			                       where patient_id='".$_POST['param_id']."'");



			if(isset($_FILES)) {


				if ($_FILES['image']['size'] > 0) {

					$fileName = $_FILES['image']['name']; // image file name
					$tmpName = $_FILES['image']['tmp_name']; // name of the temporary stored file name
					$fileSize = $_FILES['image']['size']; // size of the uploaded file
					$fileType = $_FILES['image']['type']; // file type

					$image = $tmpName;
					copy($tmpName, "../../uploads/" . $fileName);
					$width = 200; //*** Fix Width & Heigh (Auto calculate) ***//
					$size = GetimageSize($image);
					$height = round($width * $size[1] / $size[0]);
					$image_orig = ImageCreateFromJPEG($image);
					$photoX = ImagesX($image_orig);
					$photoY = ImagesY($image_orig);
					$image_fin = ImageCreateTrueColor($width, $height);
					ImageCopyResampled($image_fin, $image_orig, 0, 0, 0, 0, $width + 1, $height + 1, $photoX, $photoY);
					ImageJPEG($image_fin, "../../uploads/" . $fileName);
					ImageDestroy($image_orig);
					ImageDestroy($image_fin);

					//$fp  = fopen("uploads/".$fileName, 'rb'); // open a file handle of the temporary file
					//$imgContent  = fread($fp, filesize($image_fin)); // read the temp file
					//fclose($fp); // close the file handle


					$rs = $mysqli->query('select * from a_patient_photo where patient_id =' . $_POST['param_id']);
					$count = $rs->num_rows;


					if ($count > 0)
						$query3 = $mysqli->query("UPDATE a_patient_photo SET  image='" . mysql_escape_string(file_get_contents("../../uploads/" . $fileName)) . "'
                                     WHERE patient_id=" . $_POST['param_id']);
					else
						$query3 = $mysqli->query("INSERT INTO a_patient_photo (patient_id, image)
                        VALUES(" . $_POST['param_id'] . ",'" . mysql_escape_string(file_get_contents("../../uploads/" . $fileName)) . "')");



					unlink("../../uploads/" . $fileName);


					//header('Location: ' . $root . 'index.php');
					//die();

				} //else die("You have not selected any image");

			}



			if($query && $query2){
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