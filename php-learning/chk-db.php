<?php
$url = "localhost";
$user = "root";
$pass = "root";
$db = "image-site";

$link = mysqli_connect($url,$user,$pass,$db) or die("MySQLへの接続に失敗しました。");
$sdb = mysqli_select_db($link,$db) or die("データベースの選択に失敗しました。");
$result = mysqli_query($link,"SELECT * FROM `Images` ORDER BY `id`");//登録順（古い順）用SQL
$result_desc = mysqli_query($link,"SELECT * FROM `Images` ORDER BY `id` DESC");//新着順用SQL
$result_rand = mysqli_query($link,"SELECT * FROM `Images` ORDER BY RAND()");//ランダム順用SQL


?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
	<title></title>
</head>
<body>
	接続ID確立 <? mysqli_connect($url,$user,$pass,$db) or die("MySQLへの接続に失敗しました。"); ?><br />
	選択の成否:<?if($sdb) echo "True"; else echo "False"; ?><br />
	データベース内情報の出力：<br><br>
	昇順：<br>
	<?
		while ($data = mysqli_fetch_array($result)) {//あるだけ表示（書き換えれば個数指定可能）
			echo $data['pass'];
			echo "<br>";
		}
	?>
	<br><br>
	降順：<br>
	<?
		while ($data = mysqli_fetch_array($result_desc)) {
			echo $data['pass'];
			echo "<br>";
		}
	?>
	<br><br>
	ランダム：<br>
	<?
		echo mysqli_fetch_array($result_rand)['pass'];//一回のみ表示
	?>
	<br><br>
</body>
</html>
