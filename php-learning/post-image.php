<?php
require('set-db.php');

if(is_uploaded_file($_FILES["image"]["tmp_name"])){
	if(mysqli_query($link, "INSERT INTO `Images` (`id`, `pass`, `data`, `creater`, `date`) VALUES (NULL, 'image_test', 'data', 'creater', CURRENT_TIMESTAMP)")){
		$data = mysqli_fetch_array(mysqli_query($link, "SELECT * FROM `Images` ORDER BY `id` DESC"));
		if(move_uploaded_file($_FILES["image"]["tmp_name"], "images/" .$data['id'] .".jpg")){
			echo "uploaded";
			header("location: chk-db.php");
			exit();
		}else{
			echo "upload error";
		}
	}else{
		echo "database error";
	}

}else{
	echo "file select error";
}
