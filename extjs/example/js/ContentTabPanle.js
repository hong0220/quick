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
var UpdateInfoTabPanle = function() {
    UpdateInfoTabPanle.superclass.constructor.call(this, {
		activeTab   : 0,
		plain       : true,
		style       : 'padding:5px 5px 0 5px',
		frame       : true,
		border      : true,
		tabPosition : 'top',
		defaults    : { autoScroll: true },
		enableTabScroll : true,
		
		activeTab: 0,
		plain: true,
		frame: true,
		tabPosition: 'top',
		border: true,
		enableTabScroll : true,
		defaults: { autoScroll: true },
		
		items : [{
			xtype:"panel",
			title: '关于',
			style:'padding:5px 5px 0 5px',
			layout:'form',
			autoLoad: {
				url: "common/about.html",
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
			title: '更新信息',
			xtype:"panel",
			autoLoad: {
				url: "common/updateInfo.html",
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
			title: '例子使用说明',
			xtype:"panel",
			style:'padding:5px 5px 0 5px',
			autoLoad: {
				url: "common/exampleDescription.html",
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
			title: '其他说明',
			xtype:"panel",
			autoLoad: {
				url: "common/description.html",
			    text: "页面载入中...",
			    callback : function(el, success, response, options) {
			    	if (success != true) {
			    		Ext.Msg.alert("提示","页面加载出错！");
			    		return;
			    	}
				},
				scripts : true
			}
		}]
	});
};
Ext.extend(UpdateInfoTabPanle, Ext.TabPanel);
var updateInfoTabPanle = new UpdateInfoTabPanle();
updateInfoTabPanle.setHeight(document.body.clientHeight-145);

var ContentTabPanle = function() {
    ContentTabPanle.superclass.constructor.call(this, {
		activeTab: 0,
		plain: false,
		tabPosition: 'top',
		border: false,
		enableTabScroll : true,
		defaults: { autoScroll: true },
		items: [{
			title:"关于",
			xtype:"panel",
			items:[
				updateInfoTabPanle
			]
		}],
		/** 监听事件 */
		listeners : {"contextmenu":function(tabPanel, activeTab, e){
			var menu = new Ext.menu.Menu({
				items : [{
					text    : '关闭当前页',
					handler : function () {
						tabPanel.remove(activeTab);
					}
				}, {
					text : "关闭其他页",
					handler : function () {
						tabPanel.items.each(function (item) {
							if(item.closable && item != activeTab) {
								tabPanel.remove(item);
							}
						});
					}
				}, {
					text : "关闭所有",
					handler : function () {
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
};

Ext.extend(ContentTabPanle, Ext.TabPanel,{
	addTab : function (id,url,title, flag) {
		//判断此tab页是否已经存在，存在则只是激活显示。否则才新建一个tab页。
		if(Ext.get(id)){
			this.setActiveTab(id);
			return;
		}
		if(flag == true) {
			var url = '<iframe src=' +url+ ' name=center scrolling="auto" width=99% height="98%" frameborder=0  style="margin:5px 5px 5px 5px" align="center"></iframe>';
	        this.add({
				id: id,
			    title: title,
	            iconCls: 'tabs',
	            html: url,
	            closable:true
	        }).show();
		} else {
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
	}
});