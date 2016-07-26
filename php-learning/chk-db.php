<?php
require('set-db.php');
$result = mysqli_query($link, "SELECT * FROM `Images` ORDER BY `id`");//登録順（古い順）用SQL
$result_desc = mysqli_query($link, "SELECT * FROM `Images` ORDER BY `id` DESC");//新着順用SQL
$result_rand = mysqli_query($link, "SELECT * FROM `Images` ORDER BY RAND()");//ランダム順用SQL


?>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=SHIFT-JIS">
	<title></title>
</head>
<body>
	接続ID確立 <? mysqli_connect($url, $user, $pass, $db) or die("MySQLへの接続に失敗しました。"); ?><br />
	選択の成否:<?if($sdb) echo "True"; else echo "False"; ?><br />
	データベース内情報の出力：<br><br>
	昇順：<br>
	<?
		$i = 0;
		while ($i < 10) {//あるだけ表示（書き換えれば個数指定可能）
			$data = mysqli_fetch_array($result);
			echo $data['pass'];
			echo "<br>";
			$i++;
		}
	?>
	<br><br>
	降順：<br>
	<?
		$i = 0;
		while ($i < 10) {
			$data = mysqli_fetch_array($result_desc);
			echo $data['pass'];
			echo "<br>";
			$i++;
		}
	?>
	<br><br>
	ランダム：<br>
	<?
		echo mysqli_fetch_array($result_rand)['pass'];//一回のみ表示
	?>
	<br><br>

	ボタン制御(php)
	<form action="post.php" method="post">
		<input type="submit">
	</form>

</body>
</html>
