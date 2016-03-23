<?php
	$province=$_GET['province'];
	if($province == "hebei")
		echo "{success:true,totalProperty:3,cities:[{code:'shijiazhuang',name:'石家庄'},{code:'handan',name:'邯郸'},{code:'baoding',name:'保定'}]}";
	else if($province == "henan") 
		echo "{success:true,totalProperty:3,cities:[{code:'zhengzhou',name:'郑州'},{code:'kaifeng',name:'开封'},{code:'luoyang',name:'洛阳'}]}";
?>