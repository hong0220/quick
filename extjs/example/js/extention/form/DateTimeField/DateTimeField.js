new Ext.Window({
	title  : '时间空间-带时分秒',
	width  : 300,
	height : 200,
	closeAction : 'close',
    items: [{
        xtype: 'datetimefield',
		id   : 'datetimefield'
    }],
	buttons : [{
		text : '获取值',
		handler : function(){
			Ext.Msg.alert(Ext.getCmp("datetimefield").getValue());
		}
	}]
}).show();