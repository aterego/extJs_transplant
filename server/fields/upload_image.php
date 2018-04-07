<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 20.09.2015
 * Time: 20:46
 */

ob_start();
header("Content-Type: application/json");
include("../inc/connection.php");
include("../inc/function.php");
$act="";
$response=array();
$temp_record=array();

$root = "/list/";



if(isset($_FILES)) {

    if (isset($_REQUEST['submit']) && $_FILES[$imageFile]['size'] > 0) {
        $fileName = $_FILES[$imageFile]['name']; // image file name
        $tmpName = $_FILES[$imageFile]['tmp_name']; // name of the temporary stored file name
        $fileSize = $_FILES[$imageFile]['size']; // size of the uploaded file
        $fileType = $_FILES[$imageFile]['type']; // file type


        $image = $tmpName;
        copy($tmpName, "uploads/" . $fileName);
        $width = 200; //*** Fix Width & Heigh (Auto calculate) ***//
        $size = GetimageSize($image);
        $height = round($width * $size[1] / $size[0]);
        $image_orig = ImageCreateFromJPEG($image);
        $photoX = ImagesX($image_orig);
        $photoY = ImagesY($image_orig);
        $image_fin = ImageCreateTrueColor($width, $height);
        ImageCopyResampled($image_fin, $image_orig, 0, 0, 0, 0, $width + 1, $height + 1, $photoX, $photoY);
        ImageJPEG($image_fin, "uploads/" . $fileName);
        ImageDestroy($image_orig);
        ImageDestroy($image_fin);

        //$fp  = fopen("uploads/".$fileName, 'rb'); // open a file handle of the temporary file
        //$imgContent  = fread($fp, filesize($image_fin)); // read the temp file
        //fclose($fp); // close the file handle

        $rs = mysql_query('select * from person_photos where person_id =' . $_REQUEST['id']);
        $count = mysql_num_rows($rs);


        if ($count > 0)
            $query = "UPDATE a_patient_photo SET  image='" . mysql_escape_string(file_get_contents("uploads/" . $fileName)) . "'
                  WHERE person_id=" . $_REQUEST['id'];
        else
            $query = "INSERT INTO a_patient_photo (patient_id, image)
                  VALUES(" . $_REQUEST['id'] . ",'" . mysql_escape_string(file_get_contents("uploads/" . $fileName)) . "')";


        mysql_query($query) or die('Error, query failed');
        unlink("uploads/" . $fileName);


        header('Location: ' . $root . 'index.php');
        die();

    } else die("You have not selected any image");

}
?>