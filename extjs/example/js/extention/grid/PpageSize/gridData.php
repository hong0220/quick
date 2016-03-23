<?php
	$start=$_GET['start'];
	$limit=$_GET['limit'];
	
	$json = "{totalCount:1000,data:[";
	$i = $start;
	for($j=$start;$j<(($limit+$start)/2);$j++) {
		$json = $json.'{ "title": "再别康桥", "author": "徐志摩", "number":"BOOKCN_'.$j.'", "publish": "XX出版社", "count": '.$j.', "publishDate":"1273500743","dynasty":"当代","content":"轻轻的我走了，正如我轻轻的来； 我轻轻的招手，作别西天的云彩。 那河畔的金柳，是夕阳中的新娘； 波光里的艳影，在我的心头荡漾。 软泥上的青荇，油油的在水底招摇； 在康河的柔波里，我甘心做一条水草！ 那榆荫下的一潭，不是清泉， 是天上虹揉碎在浮藻间，沉淀着彩虹似的梦。 寻梦？撑一支长篙，向青草更青处漫溯， 满载一船星辉，在星辉斑斓里放歌。 但我不能放歌，悄悄是别离的笙箫； 夏虫也为我沉默，沉默是今晚的康桥。 悄悄的我走了，正如我悄悄的来； 我挥一挥衣袖，不带走一片云彩。"},{ "title": "武陵春", "author": "李清照", "number":"BOOK_CN_'.$j.'", "publish": "XXXX出版社", "count": '.(25+$j).', "publishDate":"1273501743","dynasty":"南宋","content":"风住尘香花已尽，日晚倦梳头。物是人非事事休，欲语泪先流。闻说双溪春尚好，也拟泛轻舟。只恐双溪舴艋舟，载不动、许多愁。"},';
	}
	$json = $json."]}";
	$json = strtr($json,array('},]'=>'}]'));
	echo $json;
?>