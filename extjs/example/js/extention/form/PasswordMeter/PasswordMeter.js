new Ext.form.FormPanel({
	renderTo : 'passwordMeterFormPanel',
	labelWidth: 75,
	items : [{
		xtype : 'textfield',
        fieldLabel: '用户名',
        name  : 'first',
        width : 175,
        allowBlank:false
    }, {
		xtype : 'passwordmeter',
		fieldLabel: '密码',
        name  : 'password',
        width : 175
	}]
});