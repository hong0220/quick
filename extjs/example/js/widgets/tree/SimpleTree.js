var SimpleTree = function() {
    SimpleTree.superclass.constructor.call(this, {
		title      : "部门",
		/** 是否自动显示滚动条 */
		autoScroll : true,
		/** 渲染到目标DIV中 */
		renderTo   : "simpleTree",
		split 	   : true,
		frame 	   : true,
		border	   : true,
		height     : 200,
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
			text     : '所有部门',
			/** 是否展开根目录 */
			expanded : true,
			draggable: false
		}),
		/** 数据加载 */
		loader : new Ext.tree.TreeLoader({
			dataUrl : "js/widgets/tree/FavoriteTree.php"
		}),
		/** 右键菜单 */
		contextmenu : new Ext.menu.Menu({
			id: 'contextMenu',
        	items: [{
            	text: '查看',
				scope: this,
				handler: function() {
					/** 得到选中节点的句柄 */
					var selectedNode = this.getSelectionModel().getSelectedNode();
					this.showDetailWin(selectedNode.text, selectedNode.attributes.desc);
				}
			}]
		})
	});
	/** 定义单击事件 */
	this.on('click',this.onClick, this);
	/** 定义右键菜单 */
	this.on("contextmenu", this.setMenu,this);

};

Ext.extend(SimpleTree, Ext.tree.TreePanel,{
	/**
	 * 单击事件的实现
	 * @param {Object} node
	 * @param {Object} e
	 */
	onClick : function (node, e) {
		if(node.isLeaf()){
			// 停止浏览器事件及阻止事件冒泡
			e.stopEvent();
			this.showDetailWin(node.attributes.text, node.attributes.desc);
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
/** 初始化组件 */
new SimpleTree();