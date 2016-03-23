var CheckboxTree = function() {
    CheckboxTree.superclass.constructor.call(this, {
		renderTo  : 'checkboxTree',
        title     : '所有部门 - ExtJs自带的例子',
        height    : 300,
        width     : 400,
        frame     : false,
        useArrows : true, //是否使用箭头样式
        autoScroll: true,
        animate   : true,
        enableDD  : true,
        containerScroll: true,
        rootVisible    : false,
        root: {
            nodeType : 'async',
			text     : '所有部门',
			expanded : true,
			draggable: false
        },
        dataUrl : "js/widgets/tree/CheckboxTree.php",
        /** 事件监听 */
        listeners: {
            'checkchange': function(node, checked){
                if(checked) node.getUI().addClass('complete');
                else node.getUI().removeClass('complete');
            }
        },
		/** 按钮组 */
        buttons: [{
            text: '得到选中节点值',
			scope  : this,
            handler: function(){
                var msg = '', selNodes = this.getChecked();
                Ext.each(selNodes, function(node){
                    if(msg.length > 0){
                        msg += '<br>';
                    }
                    msg += node.text;
                });
                Ext.Msg.show({
                    title: '选中内容', 
                    msg: msg.length > 0 ? msg : '无选中',
                    icon: Ext.Msg.INFO,
                    minWidth: 200,
                    buttons: Ext.Msg.OK
                });
            }
        }]
	});
};
Ext.extend(CheckboxTree, Ext.tree.TreePanel);

new CheckboxTree();