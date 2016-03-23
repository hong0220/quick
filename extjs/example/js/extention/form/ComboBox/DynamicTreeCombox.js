var DynamicTreeCombox = function() {
	DynamicTreeCombox.superclass.constructor.call(this, {
		//是否在点击combox时将树全部展开
		expandAll   : false
		//点击树节点时，将节点的哪个字段设置为combox的值
		,displayField: "text"
		,fieldLabel  : "下拉树"
		,readOnly    : true
		,width       : 180  
		,loaderConfig : {   
			dataUrl  : "position.php",//加载树的URL 
			//传递给后台的参数，其中parentFuncId是必须的，而且初始化为第一次加载时parentFuncId为空，即加载的是后台数据库的根节点   
			baseParams : {parentFuncId:""}
		}
		// 定义字段映射，
		// 如果后台程序返回的没有text qtip字段，则加上fieldMapping进行映射
		// 如果后台返回的json有这几个字段，此属性可省略
		/*
		fieldMapping:{ 
			text:"nameLabelCode",//映射node的text字段   
			qtip:"descriptionLabelCode",//映射node的qtip字段   
			parentFuncId:"funcId"//映射动态请求后台时使用node的funcId字段作为请求参数   
		}
		*/
	});
}
Ext.extend(DynamicTreeCombox, Ext.ux.form.DynamicTreeCombox);