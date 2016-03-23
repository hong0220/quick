var LoginForm = function() {
	//提交表单触发此方法
	function submit() {
		var scope = this;
		//验证合法后使用加载进度条
		if (scope.form.isValid()) {
			//控制进度速度
			var f = function(v) {
				return function() {
					var i = v / 12;
					pp.updateProgress(i, '正在验证，请稍等…');
				};
			};
	
			for (var i = 1; i < 13; i++) {
				setTimeout(f(i), i * 150);
			}
	
			//提交到服务器操作
			scope.form.doAction('submit', {
				url : 'js/widgets/form/checkLogin.php', //文件路径
				method : 'post',   //提交方法post或get
				params : '',
				//提交成功的回调函数
				success : function(form, action) {
					if (action.result.msg == 'ok') {
						scope.hide();
						detailInfoForm.show();
						loadData();
					} else {
						Ext.Msg.alert('错误提示','用户名或密码错误！请重试！<br/>'+action.result.data+'<br/>用户名和密码都是admin');
						scope.form.reset();
					}
				},
				//提交失败的回调函数
				failure : function() {
					Ext.Msg.alert('错误', '服务器出现错误请稍后再试！');
				}
			});
		}
	}
	var pp = new Ext.ProgressBar({
		text:" ",
		value: 0
	});

    LoginForm.superclass.constructor.call(this, {
		title      : "登陆",
		labelWidth : 45,
		frame      : true,
		plain      : true,
		width      : 300,
		renderTo   : "loginForm",
		defaultType: 'textfield', //默认字段类型
		//定义表单元素
		items: [{
			fieldLabel: '用户名',
			anchor    : '99%',
			name      : 'name', //元素名称,后台获取此控件值标识，也可以用ID
			allowBlank: false, //不允许为空
			tabIndex  : 1,
			blankText : '帐户不能为空' //错误提示内容
		},{
		    inputType : 'password',
			fieldLabel: '密&nbsp;&nbsp;&nbsp;码',
			name      : 'pwd',
			anchor    : '99%',
			tabIndex  : 2,
			allowBlank: false,
			blankText : '密码不能为空'
		},pp],

		buttons: [{
			text: '登陆',
			type: 'submit',
			scope : this,
			//定义表单提交事件
			tabIndex : 3,
			handler  : submit
		},{
			text     : '取消',
			scope  	 : this,
			tabIndex : 4,
			handler  : function(){this.form.reset();}//重置表单
		}],
		// 处理键盘事件
		keys:[{   
			key  : Ext.EventObject.ENTER, // 处理回车事件
			fn   : submit,    
			scope: this
	    }]
  });   
};
Ext.extend(LoginForm, Ext.form.FormPanel);
new LoginForm();

var DetailInfoForm = function() {
    DetailInfoForm.superclass.constructor.call(this, {
		renderTo  : "loginForm",
		hidden    : true,			
		frame     : true,
        title     : '数据回显Form',
        labelAlign: 'right',
        labelWidth: 45,
        width     : 340,
        waitMsgTarget: true,
        defaultType  : 'textfield',
        /** 配置回显数据读取 */
		reader: new Ext.data.JsonReader({root:'formdata'},
            [{name: 'userName',mapping:'name',type:'string'},
             {name: 'sex',mapping:'sex',type:'string'},
             {name: 'interests',mapping:'interests',type:'string'},
             {name:'email',mapping:'email',type:'string'},
             {name:'educational',mapping:'educational',type:'string'}
        ]),
        items: [{
            fieldLabel: '姓名',
            name      : 'userName',
            anchor    : '99%'
        }, {
			xtype     : "radiogroup",
            fieldLabel: '性别',
            name      : 'sex',
            width     : 80,
			items     : [{
				boxLabel : "男",
				inputValue : "male"
			}, {
				boxLabel : "女",
				inputValue : "female"
			}]
        }, {
            xtype     : "checkboxgroup",
            fieldLabel: '爱好',
            name      : 'interests',
            width     : 150,
			items     : [{
				boxLabel : "上网",
				inputValue : "internet"
			}, {
				boxLabel : "打球",
				inputValue : "ball"
			}, {
				boxLabel : "看书",
				inputValue : "book"
			}]
        }, {
            fieldLabel : 'E-Mail',
            name	   : 'email',
            vtype	   : 'email',
            anchor     : '99%'
        }, {
            fieldLabel  : '学历',
			xtype		: 'combo',
			id          : 'educational',
			editable    : false,
			allowBlank  : false,
			/** 配置数据源 */
			store:new Ext.data.Store({ 
				proxy: new Ext.data.HttpProxy({url: 'js/widgets/form/getFormData.php?flag=combo'}), 
				reader: new Ext.data.JsonReader({ 
    				root:'educational' 
    				},[{name: 'name', mapping: 'name'},
                       {name: 'code', mapping: 'code'}
				    ]
                ),
				remoteSort: true
			}),
			valueField   : 'code',
	        displayField : 'name',
			mode         : 'remote',
			hiddenName   : 'educationalCode',
			lazyInit     : true,
			lazyRender   : false,
			forceSelection: true,
			blankText    :  '请选择 ... ',
			emptyText    :'请选择 ... ',
			triggerAction: 'all',
			anchor       : '99%', 
            allowBlank   : false
		}],

		buttons: [{
			text: '保存',
			type: 'submit',
			scope : this,
			//定义表单提交事件
	        handler:function(){
				var values = this.form.getValues();
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
		},{
			text: '重新载入',
			scope : this,
			//定义表单提交事件
			handler: function () {
				loadData();
			}
		},{
			text   : '重置',
			scope  : this,
			handler: function(){this.form.reset();}//重置表单
		}],
		// 处理键盘事件
		keys:[{   
			key  : Ext.EventObject.ENTER, // 处理回车事件
			scope: this
	    }]
  });   
};
Ext.extend(DetailInfoForm, Ext.form.FormPanel);
var detailInfoForm = new DetailInfoForm();
function loadData () {
	detailInfoForm.form.load({
		url:'js/widgets/form/getFormData.php?flag=form',
		waitTitle:'提示',
        waitMsg:'正在处理您的请求,请稍候...',
		success:function(form,action){
			Ext.Msg.alert("提示","加载数据成功！");
		},
		failure:function(){
			Ext.Msg.alert("提示","服务器出现错误！未能获取到属性数据！");
		}
	});
}