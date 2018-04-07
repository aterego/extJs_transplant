<?php
$myArray=array(array('Ball','Small','Troll'),
                    array('Triangle','MTriangle'),
                    array('Cube', 'Mube'));
					
			foreach($myArray as $m)
              {
              	foreach($m as $key=>$value)
                 echo $value . ";" .$key. "<br/><br/>";
              }
					
?>
