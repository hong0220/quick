Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL="../../../../resources/images/default/s.gif";
	
	// 内容显示区的tabpanel
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
				html: "这里当你需要放的信息"
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
		addTab : function (id,url,title) {
			//判断此tab页是否已经存在，存在则只是激活显示。否则才新建一个tab页。
			if(Ext.get(id)){
				this.setActiveTab(id);
				return;
			}
			// 新建tab页并加载页面内容
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
	});
	// 西部区域树
	var WidgetsTree = function(config) {
		var contentEl = config.contentEl;
		
	    WidgetsTree.superclass.constructor.call(this, {
			/** 是否自动显示滚动条 */
			autoScroll : true,
			/** 渲染到目标DIV中 */
			split 	   : true,
			border	   : false,
			/** 是否显示动画效果 */
			animate    : true,
			rootVisible : true,
			containerScroll : true,
			/** 设置样式 */
			layoutConfig : {
				fill : true,
				activeOnTop : false,
				autoWidth   : true,
				titleCollapse : true,
				collapseFirst : false,
				hideCollapseTool : false
			},
			/** 根设置 */
			root : new Ext.tree.AsyncTreeNode({
				/** id可以不要 */
				id       : 'all',
				text     : '所有组件',
				/** 是否展开根目录 */
				expanded : true,
				draggable: false
			}),
			/** 数据加载 */
			dataUrl : "Treedata.php",
			/** 右键菜单 */
			contextmenu : new Ext.menu.Menu({
				id: 'contextMenu',
	        	items: [{
	            	text: '查看组件',
					scope: this,
					handler: function() {
						/** 得到选中节点的句柄 */
						var selectedNode = this.getSelectionModel().getSelectedNode();
						this.addTabToContentPanel(selectedNode,null,contentEl);
					}
				}]
			})
		});
		/** 定义单击事件 */
		this.on('click',function(node,e){this.addTabToContentPanel(node,e,contentEl)}, this);
		/** 定义右键菜单 */
		this.on("contextmenu", this.setMenu,this);
	
	};
	
	Ext.extend(WidgetsTree, Ext.tree.TreePanel,{
		/**
		 * 增加树节点例子到内容显示区
		 * @param {Object} node
		 * @param {Object} e
		 * @param {Object} contentEl 内容面板句柄
		 */
		addTabToContentPanel : function (node, e, contentEl) {
			if(node.isLeaf()){
				// 停止浏览器事件及阻止事件冒泡
				if(e) e.stopEvent();
				var path = node.attributes.path;
				if(path) {
					contentEl.addTab("tab-" + node.attributes.code, path, node.attributes.text);
				}
			}
		},
		/**
		 * 设置右键菜单
		 * @param {Object} node
		 * @param {Object} e
		 */
		setMenu : function(node, e) {
			// 阻止浏览器事件
			e.preventDefault();
			//结点进入选择状态
	        node.select();
	        this.contextmenu.showAt(e.getXY());
		},
		/**
		 * 设置详细信息的显示窗口
		 * @param {Object} title
		 * @param {Object} html
		 */
		showDetailWin : function (title,html) {
			if(!html) html = "暂无信息！";
			new Ext.Window({
				title : "查看" + title + "的详细信息",
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
	});
	var contentTabPanle = new ContentTabPanle();
	var widgetsTree =  new WidgetsTree({contentEl:contentTabPanle});
	
	// 用ViewPort方式布局，如用Panel方式布局则注释掉new Ext.Viewport({
	// 再去掉下面注释部分
	new Ext.Viewport({
		/** 去掉注释部分则可以改为Panel布局，效果和ViewPort一样。但是得指定渲染的DIV。 */
		/**
	new Ext.Panel({
		renderTo : "simpleLayout",
		,border : false
		,height : 500
		*/
		enableTabScroll: true
		// 改变布局方式，有不同的效果，具体的有：absolute、accordion、anchor、border、card、column、fit、form、table
		,layout: "border"
		,items: [{
			// 北部
			region: "north"
			,border: false
			,height: 60
			,html:'<h1 id=logo><a href="http://leadergxg.25291.84g.com/Extjs/">玉琴蝶园(YuQinDieYuan) －－ 研究各种技术（lucene、extjs、ajax、web）</a> </h1><div class="quote">等候环境对他的事业完全有利才动手的人，将永远不会成功。<br>[在温室中想象南极，谁都可以做到！！] </div>'
		},{
			title: "例子"
			// 西部
			,region: "west"
			,split: true
			// 是否允许折叠
			,collapsible: false
			// 折叠按钮样式，不设置这个则为在面板右上角有个<<折叠符号
			,collapseMode:'mini'
			,width: 250
			,items: [widgetsTree]
		},{
			// 中部，此面板必须。如果不设置则会出错
			region  : "center"
			,items  : [contentTabPanle]
		},{
			region : "south"
			,height: 50
			,autoLoad: {
				url: "../../../common/footer.html",
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
	
	// 去掉蒙版
	var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
	
	widgetsTree.setHeight(document.body.clientHeight-115);
	contentTabPanle.setHeight(document.body.clientHeight-115);
});