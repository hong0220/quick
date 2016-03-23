<?php
	$start=$_POST['start'];
	$limit=$_POST['limit'];
	
	$json = "{totalProperty:100,students:[";
	$i = $start;
	for($j=$start;$j<($limit+$start);$j++) {
		$json = $json.'{ "id": "000'.$j.'", "sex": "'.($j%3==0?"female":"male").'", "name":"学生'.$j.'", "classs": "05级一班", "scroll": "88" },';
	}
	$json = $json."]}";
	$json = strtr($json,array('},]'=>'}]'));
	echo $json;
?>