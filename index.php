<?php
	ob_start();
	session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Example</title>
<link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css" />
<script type="text/javascript" src="ext/ext-all.js"></script>
<?php 
		if(isset($_SESSION['user'])){
			if(!empty($_SESSION['user'])){
?>
			<script type="text/javascript" src="app.js"></script>
			<script type="text/javascript" >
				var acc = "<?php echo $_SESSION['user']; ?>";
				

			</script>
<?php
			}else{?>
				<script type="text/javascript" src="login.js"></script>
<?php	}
	}else{?>
    	<script type="text/javascript" src="login.js"></script>
<?php	
	}
?>
</head>

<body>
</body>
</html>