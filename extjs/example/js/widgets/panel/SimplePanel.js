var SimplePanel = function() {
	SimplePanel.superclass.constructor.call(this, {
		id        : "simplePanelDemo",
		renderTo  : 'simplePanel',
	    title     : '洛神赋',
	    height    : 300,
	    width     : 400,
	    autoScroll: true,
	    animate   : true,
		floating  : true, // 设置浮动，否则不能拖动
		x : 50, // 设置初始位置横坐标
		y : 50, // 设置初始位置纵坐标
	
		collapsible    : true, // 是否允许折叠
		titleCollapse  : true, //点击标题栏的任何地方都能收缩，默认为false
		/** 加载内容页面 */
		autoLoad : {
			url: "js/widgets/panel/content.html", 
			nocache: true,
			scripts:true // 设置为true则执行url页面中的js代码
		},
		/** 拖拽设置 */
		draggable: {
			insertProxy: false, //拖动时是否虚线显示原始位置
			onDrag : function(e){
				var pel = this.proxy.getEl();
				this.x = pel.getLeft(true) - 250;
				this.y = pel.getTop(true) - 120;
				// 去掉移动后阴影
				var s = this.panel.getEl().shadow;
				if (s) {
					s.realign(this.x, this.y, pel.getWidth(), pel.getHeight());
				}
			},
			endDrag : function(e){
				// 设置移动最终位置
				this.panel.setPosition(this.x, this.y);
			}
		},
		/** 设置右上角的工具按钮 */
		tools : [{
			id : "minimize",
			scope : this,
			qtip  : "折叠",
			handler : this.collapse
		},{
			id : "maximize",
			scope : this,
			qtip  : "展开",
			handler : this.expand
		},{
			id : "refresh",
			scope : this,
			qtip  : "刷新面板内内容，加载美人赋。",
			handler : function () {
				this.load({
					url:"js/widgets/panel/meirenfu.html",
					scripts:true
				});
			}
		},{
			id : "help",
			scope : this,
			qtip  : "帮助",
			handler : function () {
				Ext.Msg.alert("提示","帮助");
			}
		},{
			id : "search",
			scope : this,
			qtip  : "搜索",
			handler : function () {
				Ext.Msg.alert("提示","搜索");
			}
		},{
			id : "print",
			scope : this,
			qtip  : "打印面板内内容",
			handler : function () {
				Ext.Msg.alert("提示","打印");
			}
		},{
			id : "save",
			scope : this,
			qtip  : "保存面板内内容",
			handler : function () {
				Ext.Msg.alert("提示","保存id="+this.getId()+"的Panel内容");
			}
		},{
			id : "close",
			scope : this,
			qtip  : "关闭面板",
			handler : this.destroy
		}],
		/** 顶部工具栏 */
		tbar : [{
			text : "禁用",
			scope : this,
			handler : this.disable
		}, '-',{
			text : "修改标题",
			handler : function () {
				simplePanel.setTitle("修改后的标题");
			}
		}]
	});
	this.on("titlechange",function(panel,title){
		alert("修改后的新标题为："+title);
	});
	};
	Ext.extend(SimplePanel, Ext.Panel);
	var simplePanel =new SimplePanel();
	
var simplePanelButton = new Ext.Toolbar({
	renderTo : "simplePanelButton",
	width : 400,
	items : [{
		text : "禁用面板",
		handler : function () {
			simplePanel.disable();
		}
	}, '-',{
		text : "启用面板",
		handler : function () {
			simplePanel.enable();
		}
	}, '-',{
		text : "改变位置",
		handler : function () {
			simplePanel.setPosition(200,200);
		}
	}, '-',{
		text : "关闭面板",
		handler : function () {
			simplePanel.destroy();
		}
	}, '-',{
		text : "隐藏面板",
		handler : function () {
			simplePanel.hide();
		}
	}, '-',{
		text : "显示面板",
		handler : function () {
			simplePanel.show();
		}
	}]
});