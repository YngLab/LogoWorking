<?php

$url = "localhost";
$user = "root";
$pass = "root";
$db = "image-site";

$link = mysqli_connect($url,$user,$pass,$db) or die("MySQLへの接続に失敗しました。");
$sdb = mysqli_select_db($link,$db) or die("データベースの選択に失敗しました。");
