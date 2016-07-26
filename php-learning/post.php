<?php
require('set-db.php');

if(mysqli_query($link, "INSERT INTO `Images` (`id`, `pass`, `data`, `creater`, `date`) VALUES (NULL, 'pass', 'data', 'creater', CURRENT_TIMESTAMP)")){
	header("location: chk-db.php");
	exit();
}else{
	echo "Failure";
}

