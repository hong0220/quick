var SimpleWindow = function(config) {
    SimpleWindow.superclass.constructor.call(this, {
		//设置显示位置
		x         : 200,
		y         : 100,
		title     : '简单Window',
		closable  : true,
        width     : 600,
        height    : 350,
		// 点击右上角后触发动作，默认是close
		closeAction : 'hide',
        border    : true,
        layout    : 'border',
        items     : [{
			title : '控制面板',
	        region: 'west',
	        split : true,
	        width : 200,
	        collapsible: true,
	        margins    : '3 0 3 3',
	        cmargins   : '3 3 3 3',
			items      : [{
				xtype      : 'treepanel',
				autoScroll : true,
				split 	   : true,
				border	   : false,
				height     : 200,
				animate    : true,
				rootVisible : true,
				containerScroll : true,
				layoutConfig : {
					fill : true,
					activeOnTop : false,
					autoWidth   : true,
					titleCollapse : true,
					collapseFirst : false,
					hideCollapseTool : false
				},
				root : new Ext.tree.AsyncTreeNode({
					text     : '控制面板',
					expanded : true,
					draggable: false
				}),
				loader : new Ext.tree.TreeLoader({
					dataUrl : "js/widgets/window/SimpleWindow.php"
				})
				
			}]
		}, {
			xtype : 'tabpanel',
	        region: 'center',
	        margins:'3 3 3 0',
	        activeTab: 0,
	        defaults:{autoScroll:true},
	        items:[{
	            title: 'tab1',
	            html: '内容'
	        },{
	            title: 'tab2',
	            html: '内容'
	        },{
	            title: 'tab3',
	            html: '内容',
	            closable:true
	        }]
		}],
		tbar : [{
			text : '新建窗口',
			scope : this,
			handler : this.creatWindow
		}]
	});
	Ext.apply(this,config);
};

Ext.extend(SimpleWindow, Ext.Window, {
	creatWindow : function() {
		Ext.MessageBox.show({
	        title:'确认',
	        msg: '是否新建窗口',
	        buttons: Ext.MessageBox.YESNOCANCEL,
	        fn: function(btn) {
				if(btn == "yes") {
					new SimpleWindow({
						x     : 300,
						y     : 100,
                        title : '我是新建的Window'
                    }).show();
				} else {
					Ext.Msg.alert('提示','你点击了 ' + btn);
				}
	        },
	        animEl: 'dialog'
	    });
	}
});
new SimpleWindow().show();