var SimpleTabpanel = function() {
    SimpleTabpanel.superclass.constructor.call(this, {
    	renderTo   : "simpleTabpanel",
		activeTab  : 0, // 默认激活那一个tab标签
		height     : 500,
		plain      : true,
		tabPosition: 'top', // tab显示位置，top表示在顶部
		border     : true,
		frame      : true,
		defaults   : { autoScroll: true },
		enableTabScroll : true, //标签页超出TabPanel的整体宽度时出现标签页可滚动。
		items      : [{
			title   :"美人赋",
			closable:true, // 是否可被关闭
			style   : "padding: 5px 5px 5px 5px;",
			/** 加载页面 */
			autoLoad: {
				url: "common/meirenfu.html",
			    text: "页面载入中...",
			    callback : function(el, success, response, options) {
			    	if (success != true) {
			    		Ext.Msg.alert("提示","页面加载出错！");
			    		return;
			    	}
				},
				scripts : true
			}
		},{
			title   : "明月光",
			closable: true,
			style   : "padding: 5px 5px 5px 5px;",
			html    : "床前明月光，疑是地上霜。<br><br>举头望明月，低头思故乡。"
		},{
			title   : "Grid",
			closable: true,
			style   : "padding: 5px 5px 5px 5px;",
			items   : [new SimpleGridExmple()]
		}],
		/** 监听事件，这里只监听了右键事件 */
		listeners : {"contextmenu":
		/**
		 * 右键执行事件
		 * @param {Object} tabPanel		当前的TabPanel句柄
		 * @param {Object} currentTab  当前选中的tab页
		 * @param {Object} e
		 */
		function(tabPanel, currentTab, e){
			var menu = new Ext.menu.Menu({
				items : [{
					text    : '关闭当前页',
					handler : function () {
						tabPanel.remove(currentTab);
					}
				}, {
					text : "关闭其他页",
					handler : function () {
						// 遍历所有的tab页，如果可以关闭则关闭（当前选中页除外）
						tabPanel.items.each(function (item) {
							if(item.closable && item != currentTab) {
								tabPanel.remove(item);
							}
						});
					}
				}, {
					text : "关闭所有",
					handler : function () {
						// 遍历所有的tab页，如果可以关闭则关闭
						tabPanel.items.each(function (item) {
							if(item.closable) {
								tabPanel.remove(item);
							}
						});
					}
				}]
			});
			menu.showAt(e.getPoint());
		}}
	});
	this.on("tabchange",this.tabChange);
};
Ext.extend(SimpleTabpanel, Ext.TabPanel,{
	/** 增加Tab标签 */
	addTab : function (id,url,title) {
		//判断此tab页是否已经存在，存在则只是激活显示。否则才新建一个tab页。
		if(Ext.get(id)){
			this.setActiveTab(id);
		} else{
	        this.add({
				id: id,
			    title: title,
	            iconCls: 'tabs',
	            autoLoad: {
					url: url,
				    text: "页面载入中...",
				    callback : function(el, success, response, options) {
				    	if (success != true) {
				    		Ext.Msg.alert("提示","页面加载出错！");
				    		return;
				    	}
					},
					scripts : true
				},
	            closable:true
	        }).show();
		}
	},
	/** 标签页改变事件 */
	tabChange : function () {
		Ext.Msg.alert("提示","标签改变，当前标签的Title是："+simpleTabpanel.getActiveTab().title);
	}
});
var simpleTabpanel = new SimpleTabpanel();

var SimpleTabpanelButton = Ext.extend(Ext.Panel, {
	width: 500,
    height: 150,
    style: 'margin-top:15px',
    bodyStyle: 'padding:10px',
    autoScroll: true
});
new SimpleTabpanelButton({
	title     : "对下面TabPanel的操作",
	renderTo  : 'simpleTabpanelButton',
    contentEl : "simpleTabpanelInfo",
    tbar      : [{
    	text  : "TabPanel操作",
    	menu  :[{
			text : "禁用",
			handler : function () {
				if(simpleTabpanel) simpleTabpanel.disable();
			}
		}, '-',{
			text : "启用",
			handler : function () {
				if(simpleTabpanel) simpleTabpanel.enable();
			}
		}, '-',{
			text : "创建/销毁",
			handler : function () {
				if(simpleTabpanel) {
					simpleTabpanel.destroy();
					simpleTabpanel = null;
				} else {
					simpleTabpanel = new SimpleTabpanel();
				}
			}
		}, '-',{
			text : "隐藏/显示",
			handler : function () {
				if(simpleTabpanel) simpleTabpanel.isVisible() ? simpleTabpanel.hide() : simpleTabpanel.show();
			}
		}]
	}, '-',{
		text : "新建Tab",
		menu : [{
			text : "新建洛神赋",
			handler : function () {
				if(simpleTabpanel) {
					simpleTabpanel.addTab("simpleTabpanel_lsf","common/luoshenfu.html","洛神赋");
				}
			}
		},'-',{
			text : "新建Tab",
			handler : function () {
				if(simpleTabpanel) {
					var id = Ext.id();
					simpleTabpanel.addTab(id,"common/luoshenfu.html",id);
				}
			}
		}]
	}, '-',{
		text : "激活Tab",
		menu  :[{
			text : "得到激活的Tab",
			handler : function () {
				if(simpleTabpanel) Ext.Msg.alert("提示","得到当前激活Tab的Title是："+simpleTabpanel.getActiveTab().title);
			}
		},'-',{
			text : "激活第一个Tab",
			handler : function () {
				if(simpleTabpanel) simpleTabpanel.setActiveTab(0);;
			}
		},{
			text : "激活第二个Tab",
			handler : function () {
				if(simpleTabpanel) simpleTabpanel.setActiveTab(1);;
			}
		}]
	}]
});