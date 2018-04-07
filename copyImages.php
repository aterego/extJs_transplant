<?php
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
//$d = DateTime::createFromFormat('m/d/Y/H:i:s', "05/15/2016/11:00:00", new DateTimeZone('Asia/Tbilisi'));
//$date = $d->getTimestamp();

include("server/inc/connection.php");
include("server/inc/function.php");




//echo $date;
$id = 22222;

$path = "tempImages/";
/*
if ($handle = opendir($path)) {
    while (false !== ($file = readdir($handle))) {

        if ('.' === $file) continue;
        if ('..' === $file) continue;
*/

$query= $mysqli->query("SELECT patient_id, image FROM a_photos");

 if($query) {
     while ($r = $query->fetch_array()) {

         $id = $r['patient_id'];
         $file = $r['image'];
         echo "id: ". $id . ", image: " .$file . "<br>";



         //do your work here
         $fileName = $file;

         $image = $file;
         copy($path . "/" . $file, "uploads/" . $fileName);
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


         $query2 = $mysqli->query("INSERT INTO a_patient_photo (patient_id, image)
                        VALUES(" . $id . ",'" . mysql_escape_string(file_get_contents("uploads/" . $fileName)) . "')");


         $id++;
         unlink("uploads/" . $fileName);
     }
     /*
     closedir($handle);
 }
 */

 }
