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
/**
 * 组件树类
 */
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
		dataUrl : "js/WidgetsTree.php",
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
			}, {
            	text: '查看源代码',
				scope: this,
				handler: function() {
					var selectedNode = this.getSelectionModel().getSelectedNode();
					var path = selectedNode.parentNode.attributes.path;
					var code = selectedNode.attributes.code;
					if (path && code) {
						new CodeWindow({
							url: path + code + ".js",
							title : "查看" + selectedNode.attributes.text + "的源代码",
							annotate: selectedNode.attributes.annotate
						}).show();
					}
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
			var path = node.parentNode.attributes.path;
			var fileName = node.attributes.fileName;
			if(path && fileName) {
				contentEl.addTab("tab-" + node.attributes.code, path + fileName, node.attributes.text, node.attributes.iframe);
			}
		}
	},
	/**
	 * 设置右键菜单
	 * @param {Object} node
	 * @param {Object} e
	 */
	setMenu : function(node, e) {
		if(node.isLeaf()){
			// 阻止浏览器事件
			e.preventDefault();
			//结点进入选择状态
	        node.select();
	        this.contextmenu.showAt(e.getXY());
		}
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