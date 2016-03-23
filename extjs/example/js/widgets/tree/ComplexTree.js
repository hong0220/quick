var ComplexTree = function() {
	ComplexTree.superclass.constructor.call(this, {
		autoScroll : true,
		split 	   : true,
		frame 	   : false,
		width      : 350,
		border	   : true,
		height     : 250,
		animate    : true,
		enableDD   : true, // 是否允许拖拽
		renderTo   : "complexTree",
		rootVisible : true, // 根节点是否可用
		containerScroll : true,
		/** 设置样式 */
		layoutConfig : {
			activeOnTop : false,
			animate : false,
			autoWidth : true,
			collapseFirst : false,
			fill : true,
			hideCollapseTool : false,
			titleCollapse : true
		},
		/** 顶部工具栏 */
		tbar : [{
			id : "filterTextField",
			xtype : "textfield",
			scope : this,
			enableKeyEvents : true
		},{
			text : "展开",
			handler : function () {
				complexTree.expandAll();
			}
		},'-',{
			text : "折叠",
			handler : function () {
				complexTree.collapseAll();
			}
		}],
		/** 右上角小工具 */
		tools :[{
			id:"save",
			handler:function(){
				Ext.MessageBox.alert("save","保存信息!");
	        }
		},{
			id:"help",
			handler:function(){
				Ext.MessageBox.alert("help","帮助!");
	        }
		},{
			id:"print",
			handler:function(){
				window.print();
	        }
		},{
			id:"close",
			handler:function(){
	            Ext.MessageBox.alert("close","关闭!")
			}
		}],
		root : new Ext.tree.AsyncTreeNode({
			draggable : false,
			expanded : true, 
			id:'all',
			symbol:'all',
			text:'所有部门'
		}),
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
					var selectedNode = this.getSelectionModel().getSelectedNode();
					this.showDetailWin(selectedNode.text, selectedNode.attributes.desc);
				}
			}, {
				text : '添加子节点',
				scope: this,
		        handler : this.addChildNode
			}, {
		        text : '添加兄弟点',
				scope: this,
		        handler : this.addBrotherNode
			}, {
		        text : '删除',
		        scope: this,
		        handler : this.deleteNode
			}, {
		        text : '重命名',
		        scope: this,
		        handler : this.renameNode
			}]
		})
	});
	this.on('click',this.onClick, this);
	this.on("contextmenu", this.setMenu,this);
	
	};
	
	Ext.extend(ComplexTree, Ext.tree.TreePanel,{
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
	 * 设置显示窗口
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
	},
	/**
	 * 得到TreeEditor对象
	 * @param {Object} tree
	 */
	getTreeEditor: function (tree) {
		return new Ext.tree.TreeEditor(tree, {
			allowBlank : false,
			cancelOnEsc : true
		});
	},
	/**
	 * 得到选中节点
	 * @param {Object} tree
	 */
	getSelectedNode: function (tree) {
		return tree.getSelectionModel().getSelectedNode();;
	},
	/**
	 * 增加子节点
	 */
	addChildNode : function () {
		var scope = this;
		var newNode = new Ext.tree.TreeNode({
			text : '新节点'
		});
		var treeEditor = scope.getTreeEditor(scope);
	
		var selectedNode = scope.getSelectedNode(scope);
		selectedNode.leaf = false;
		selectedNode.expand(false, true, function() {
	      // 注意，应该先由expand展开非叶子节点，才能为之插入子节点，否则会出错
			selectedNode.appendChild(newNode);
			scope.getSelectionModel().select(newNode);
			setTimeout(function() {
				treeEditor.editNode = newNode;
				treeEditor.startEdit(newNode.ui.textNode);
			}, 10);
		});
	},
	/**
	 * 增加兄弟节点
	 */
	addBrotherNode : function () {
		var scope = this;
		var newNode = new Ext.tree.TreeNode({
			text : '新建节点'
		});
		var treeEditor = scope.getTreeEditor(scope);
	
		var selectedNode = scope.getSelectedNode(scope);
		
		var selectedParentNode = selectedNode.parentNode;
		
		if (selectedParentNode == null) {
			selectedNode.appendChild(newNode);
		} else {
			selectedParentNode.insertBefore(newNode, selectedNode);
		}
		setTimeout(function() {
			treeEditor.editNode = newNode;
			treeEditor.startEdit(newNode.ui.textNode);
		}, 10);
	},
	/**
	 * 删除节点
	 */
	deleteNode : function () {
		var scope = this;
		Ext.Msg.confirm("提示框","确认要删除此节点？",function(btn){
			if(btn=="yes"){
				scope.getSelectedNode(scope).remove();
			}
		});
	},
	/**
	 * 重命名节点
	 */
	renameNode : function () {
		var selectedNode = this.getSelectedNode(this);
		var treeEditor = this.getTreeEditor(this);
		treeEditor.editNode = selectedNode;
		treeEditor.startEdit(selectedNode.ui.textNode);
	}
	});
	
	var complexTree = new ComplexTree();
	/** 设置过滤器 */
	var complexTreeFilter = new Ext.tree.TreeFilter(complexTree, {
	clearBlank: true,
	autoClear: true
	});
	/**
	* 设置过滤器处理
	*/
	Ext.get('filterTextField').addListener('keyup',function() {
	// 保存上次隐藏的空节点
		var hiddenPkgs = [];
	var text = this.getValue();
	
	// 先要显示上次隐藏掉的节点
	Ext.each(hiddenPkgs, function(n){
	    n.ui.show();
	});
	
	if(!text){
	    complexTreeFilter.clear();
	    return;
	}
	complexTree.expandAll();
	
	// 正则表达式，'i'代表不区分大小写
	var re = new RegExp(Ext.escapeRe(text), 'i');
	complexTreeFilter.filterBy(function(n){
	    // 只过滤叶子节点，这样省去枝干被过滤的时候，底下的叶子都无法显示
	    return !n.isLeaf() || re.test(n.text);
	});
	
	// 非叶子节点且没有子节点，则隐藏
	hiddenPkgs = [];
	complexTree.root.cascade(function(n) {
	    if(!n.isLeaf() && n.ui.ctNode.offsetHeight < 3){
	        n.ui.hide();
	        hiddenPkgs.push(n);
	    }
	});
});