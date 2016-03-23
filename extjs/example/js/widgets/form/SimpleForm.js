function showWin (form) {
	var values = form.form.getValues();
	var html = "";
	for(var i in values) {
		html += i + ":" + values[i] + "<br>";
	}
		
	if(!html) html = "暂无信息！";
	new Ext.Window({
		title : "查看填写的信息",
		width : 320,
		height: 180,
		plain : true,
		layout:'fit',
		modal : true,
		items : [{
			xtype : "panel",
			style : "padding:2px 3px 3px 2px",
			html  : html
		}]
	}).show();
}
	
/*************** 简单的Form ********************/	
var birthday = new Ext.form.DateField({
	fieldLabel: '出生日期',
	name:'sremindDateE',    
    id:'sremindDateE',
    width: 179
});
var simpleForm = new Ext.form.FormPanel({
	title: '最简单的Form',
	labelAlign: 'right', //lab的位置
	labelWidth: 55, //lab的宽度
	width: '50%', //写成数字就是绝对的宽度
	frame: true, //具体作用不清楚，true的时候界面都是一体色的，而且加的按钮也在里面。false时按钮在外面。
	renderTo: "simpleForm", //绘制此Form到页面上，如果是绘制到一个div或其它的DOM中，这里应该是他们的id。
	bodyStyle: 'padding:10px 0 10px 5px;', //form里面主体的样式
	style: 'padding:5px 0 10px 5px;', //整个Form的样式
	width: '95%',
	buttonAlign : "center",
	items: [{
		xtype: 'textfield',
		fieldLabel: '姓名',
        name: 's-name',
		allowBlank: false,//不允许为空
		blankText: '姓名不能为空哦！ ^v^', //为空时的提示文字
        width: '97%'
	},{
		xtype: 'textfield',
		inputType: 's-password', //输入值的显示样式
		fieldLabel: '密码',
        name: 's-password',
		allowBlank: false,//不允许为空
		blankText: '密码不能为空哦！ ^v^', //为空时的提示文字
        width: '97%'
	},new Ext.form.ComboBox({
		 store: new Ext.data.SimpleStore({
		 	fields: ["retrunValue", "displayText"],
			data: [[1,'男'],[2,'女']]
		}),
		valueField :"retrunValue",
		displayField: "displayText",
		mode: 'local',
		forceSelection: true,
		blankText:'-- 请选择 --',
		emptyText:'-- 请选择 --',
		hiddenName:'taskSort',
		editable: false,
		triggerAction: 'all',
		fieldLabel: '性别',
		name: 's-sex',
		width:181
	}),birthday,{
		xtype: 'textfield',
		fieldLabel: '住址',
        name: 's-address',
		value: '地球.中国',
        width: '97%'
	}],
	buttons:[{
		id:'submit',  
		text:'确定',
        handler:function(){
			showWin(simpleForm);
		}
	},{    
        text:'重置',
        handler:function(){
			simpleForm.getForm().reset(); //清空输入内容
		}
	},{
     text:'显示下面的Form',
	 handler:function(){
		columnForm.show(); //显示横排的Form
	}},{ 
     text:'隐藏下面的Form',
	 handler:function(){ 
		columnForm.hide(); //隐藏横排的Form
	}}]
});

/*************** 横排的Form（带输入格式验证） ********************/
var columnForm = new Ext.form.FormPanel({
	title: '横排的Form（带输入格式验证）',
	labelAlign: 'right',
	labelWidth: 35,
	width: '50%',
	frame: true,
	renderTo: "simpleForm",
	bodyStyle: 'padding:10px 0 10px 5px;',
	style: 'padding:5px 0 10px 5px;',
	width: '95%',
	buttonAlign : "center",
	items: [{
		layout:'column',
		items: [{
			columnWidth:.5,
            layout: 'form',
			items:[{
				xtype: 'textfield',
				fieldLabel: '姓名',
	            name: 'c-name',
				allowBlank: false,
				blankText: '姓名不能为空哦！ ^v^',
	            width: '90%'
			},{
				xtype: 'textfield',
				inputType: 'password',
				fieldLabel: '密码',
	            name: 'c-password',
				allowBlank: false,
				blankText: '密码不能为空哦！ ^v^',
	            width: '90%'
			},{
				xtype: 'textfield',
				fieldLabel: '住址',
	            name: 'c-address',
				value: '地球.中国',
	            width: '90%'
			}]},{
			columnWidth:.5,
            layout: 'form',
			items:[{
				xtype: 'textfield',
				fieldLabel: 'QQ',
				vtype: 'alphanum',
				vtypeText: '只允许输入数字、字母和_',
	            name: 'c-QQ',
				allowBlank: true,
	            width: '90%'
			},{
				xtype: 'textfield',
				fieldLabel: 'Email',
				vtype: 'email',
				vtypeText: '邮件格式不正确！<br/>正确的格式应该是：username@163.com',
	            name: 'c-Email',
				allowBlank: false,
				blankText: 'Email不能为空哦！ ^v^',
	            width: '90%'
			},{
				xtype: 'textfield',
				fieldLabel: '主页',
				vtype: 'url',
				vtypeText: '网址格式不正确！<br/>正确格式：http://www.baidu.com',
	            name: 'c-Homepage',
	            width: '90%'
			}]
		}]
	}],
	buttons:[{
		id:'submit',  
		text:'确定',
        handler:function(){
			showWin(columnForm);
		}
	},{    
    text:'重置',    
    handler:function(){ 
		columnForm.getForm().reset(); //清空输入内容
	}},{    
    text:'关闭',    
    handler:function(){ 
		columnForm.hide(); //隐藏此Form
	}}]
});
/**************** 加入了FieldSet的Form ********************/

var fieldsetForm = new Ext.form.FormPanel({
	title: '加入了FieldSet的Form',
	labelAlign: 'right',
	labelWidth: 55,
	width: '50%',
	frame: true,
	renderTo: "simpleForm",
	bodyStyle: 'padding:10px 0 10px 5px;',
	style: 'padding:5px 0 10px 5px;',
	width: '95%',
	buttonAlign : "center",
	items: [{
		layout:'column',
		items: [{
			columnWidth:.5,
            layout: 'form',
			items:[{
				xtype: 'fieldset', //声明类型为fieldset
				title: '基本信息', //fieldset的标题
				width: '95%',     //fieldset的宽度
				height: '100%',   //fieldset的高度，100%才会把包含的所有控件都包含，不然只会包含一部分。可试试50%。
				items: [{
					xtype: 'textfield',
					fieldLabel: '姓名',
		            name: 'c-name',
					allowBlank: false,
					blankText: '姓名不能为空哦！ ^v^',
		            width: '90%'
				},{
					xtype: 'textfield',
					inputType: 'password',
					fieldLabel: '密码',
		            name: 'c-password',
					allowBlank: false,
					blankText: '密码不能为空哦！ ^v^',
		            width: '90%'
				},{
					xtype: 'textfield',
					fieldLabel: '住址',
		            name: 'c-address',
					value: '地球.中国',
		            width: '90%'
				}]
			}]
		},{
			columnWidth:.5,
            layout: 'form',
			items:[{
				xtype: 'fieldset',
				title: '联系方式',
				width: '95%',
				height: '100%',
				items: [{
					xtype: 'textfield',
					fieldLabel: 'QQ',
					vtype: 'alphanum',
					vtypeText: '只允许输入数字、字母和_',
		            name: 'c-QQ',
					allowBlank: true,
		            width: '90%'
				},{
					xtype: 'textfield',
					fieldLabel: 'Email',
					vtype: 'email',
					vtypeText: '邮件格式不正确！<br/>正确的格式应该是：username@163.com',
		            name: 'c-Email',
					allowBlank: false,
					blankText: 'Email不能为空哦！ ^v^',
		            width: '90%'
				},{
					xtype: 'textfield',
					fieldLabel: '主页',
					vtype: 'url',
					vtypeText: '网址格式不正确！<br/>正确格式：http://www.baidu.com',
		            name: 'c-Homepage',
		            width: '90%'
				}]
			}]
		}]
	},{
		xtype: 'fieldset',
		title: '在我展示',
		width: '97%',
		height: '100%',
		items: [{
			xtype: 'textarea',
			fieldLabel: '自我介绍',
            name: 'c-name',
			allowBlank: false,
			blankText: '自我介绍不能为空哦！ ^v^',
            width: '90%'
		},{
			xtype: 'textarea',
			fieldLabel: '自我评论',
            name: 'c-password',
            width: '90%'
		}]
	}],
	buttons:[{
		id:'submit',  
		text:'确定',
        handler:function(){
			showWin(fieldsetForm);
		}
	},{    
    text:'重置',    
    handler:function(){ 
		fieldsetForm.getForm().reset(); //清空输入内容
	}},{    
    text:'关闭',    
    handler:function(){ 
		fieldsetForm.hide(); //隐藏此Form
	}}]		
});