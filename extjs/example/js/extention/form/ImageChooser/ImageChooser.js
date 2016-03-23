/********************************************
 * 玉琴蝶园之ExtJs例子资料
 * 作者：迷蝶
 * 创建时间：2010-05-18
 * 联系方式：
 * 		E-Mail：leader1212@sina.com.cn
 * 		  CSDN：http://hi.csdn.net/leadergg
 * 说明：如需直接使用本站的例子代码，请保留此说明
 * 
 ******************************************/
ImageChooser = function (){
	ImageChooser.superclass.constructor.call(this, {
		hideId     : 'graphicsURL',
		fieldLabel : '图标',
		url        : 'images.php',
		height     : 85,
		width      : 250,
	});
}
Ext.extend(ImageChooser, Ext.ux.ImageChooser);