<?php
	$name=$_POST['name'];
	$pwd=$_POST['pwd'];
	if($name == "admin" && $pwd == "admin")
		echo "{success:true,msg:'ok',data:'".$name."'}";
	else echo "{success:true,msg:'failer',data:'用户名：".$name."，密码：".$pwd."登录失败！'}";
?>