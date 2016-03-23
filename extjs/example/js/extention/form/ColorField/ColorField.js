
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
var cf = new Ext.form.ColorField({
	fieldLabel: '颜色',
	id: 'colorField',
	width : 150,
	showHexValue:true
});
var colorFieldForm = new Ext.form.FormPanel({
	title: '颜色选择器',
	labelAlign: 'right',
	labelWidth: 55,
	width: 400,
	frame: true,
	renderTo: "colorFieldForm",
	bodyStyle: 'padding:10px 0 10px 5px;',
	buttonAlign : "center",
	items: [cf],
	buttons:[{
		id:'submit',
		text:'确定',
        handler:function(){
			var values = colorFieldForm.form.getValues();
			alert(values.colorField);
		}
	}]		
});