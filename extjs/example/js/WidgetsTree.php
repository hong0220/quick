[{
	text : "ExtJs基本组件",
	children : [{
	    text:'Grid组件'
	    ,path: "js/widgets/grid/"
	    ,qtip: "Grid组件例子"
	    ,children:[{
	        text:'简单Grid'
	        ,qtip: "最常用的简单Grid"
	        ,code: "SimpleGrid"
	        ,fileName: "SimpleGrid.html"
	        ,leaf:true
	    }, {
	        text:'复杂Grid'
	        ,qtip: "最常用的复杂Grid"
	        ,code: "ComplexGrid"
	        ,fileName: "ComplexGrid.html"
	        ,leaf:true
	    }, {
	        text:'属性Grid'
	        ,qtip: "PropertyGrid"
	        ,code: "PropertyGrid"
	        ,fileName: "PropertyGrid.html"
	        ,leaf:true
	    }, {
	        text:'分组Grid'
	        ,qtip: "数据实现分组的Grid"
	        ,code: "GroupingGrid"
	        ,fileName: "GroupingGrid.html"
	        ,leaf:true
	    }, {
	        text:'行编辑Grid'
	        ,qtip: "能对整行进行编辑的Grid"
	        ,code: "RowEditorGrid"
	        ,fileName: "RowEditorGrid.html"
	        ,leaf:true
	    }]
	},{
	    text:'Tree组件'
	    ,path: "js/widgets/tree/"
	    ,qtip: "树组件例子"
	    ,children:[{
	        text:'简单树'
	        ,qtip: "最常用的简单树"
	        ,code: "SimpleTree"
	        ,fileName: "SimpleTree.html"
	        ,leaf:true
	    },{
	        text:'复杂树'
	        ,qtip: "比较复杂的树，包含树的一些简单操作！"
	        ,code: "ComplexTree"
	        ,fileName: "ComplexTree.html"
	        ,leaf:true
	    },{
	        text:'CheckboxTree'
	        ,qtip: "带下拉多选框的树"
	        ,code: "CheckboxTree"
	        ,fileName: "CheckboxTree.html"
	        ,leaf:true
	    },{
	        text:'树拖拽'
	        ,qtip: "两棵树互相拖拽"
	        ,code: "TwoTree"
	        ,fileName: "TwoTree.html"
	        ,leaf:true
	    }]
	},{
	    text:'Form组件'
	    ,path: "js/widgets/form/"
	    ,qtip: "Form组件例子"
	    ,children:[{
	        text:'简单Form'
	        ,qtip: "最常用的简单Form"
	        ,code: "SimpleForm"
	        ,fileName: "SimpleForm.html"
	        ,leaf:true
	    },{
	        text:'交互Form'
	        ,qtip: "与服务器交互的Form"
	        ,code: "InteractiveForm"
	        ,fileName: "InteractiveForm.html"
	        ,leaf:true
	    },{
	        text:'应用Form之创建用户'
	        ,qtip: "创建用户Form例子"
	        ,code: "CreateUserForm"
	        ,fileName: "CreateUserForm.html"
	        ,leaf:true
	    },{
	        text:'应用Form之较复杂的Form'
	        ,qtip: "应用Form之较复杂的Form"
	        ,code: "CreateModelForm"
	        ,fileName: "CreateModelForm.html"
	        ,leaf:true
	    }]
	},{
	    text:'Panel组件'
	    ,path: "js/widgets/panel/"
	    ,qtip: "面板组件例子"
	    ,children:[{
	        text:'简单面板'
	        ,qtip: "最常用的简单面板"
	        ,code: "SimplePanel"
	        ,fileName: "SimplePanel.html"
	        ,leaf:true
	    }, {
	        text:'TabPanel'
	        ,qtip: "TabPanel"
	        ,code: "SimpleTabPanel"
	        ,fileName: "SimpleTabPanel.html"
	        ,leaf:true
	    }]
	},{
	    text:'Window组件'
	    ,path: "js/widgets/window/"
	    ,qtip: "Window组件例子"
	    ,children:[{
	        text:'Window例子'
	        ,qtip: "Window"
	        ,code: "SimpleWindow"
	        ,fileName: "SimpleWindow.html"
	        ,leaf:true
	    }]
	},{
	    text:'Portal组件'
	    ,path: "js/widgets/portal/"
	    ,qtip: "Portal组件例子"
	    ,children:[{
	        text:'Portal'
	        ,qtip: "Portal"
	        ,code: "SimplePortal"
	        ,fileName: "SimplePortal.html"
	        ,leaf:true
	    }]
	}, {
		text:'布局'
	    ,path: "js/widgets/layout/"
	    ,qtip: "ExtJs布局"
	    ,children:[{
	        text:'ViewPort-简单布局例子'
	        ,qtip: "一个很简单的ViewPort布局实例"
	        ,code: "SimpleLayout"
	        ,iframe : true
	        ,fileName: "SimpleLayout.html"
	        ,leaf:true
	    }]
	}, {
		text:'拖拽'
	    ,path: "js/widgets/dd/"
	    ,qtip: "ExtJs拖拽例子"
	    ,children:[{
	        text:'简单拖拽'
	        ,qtip: "一个很简单的拖拽实例"
	        ,code: "SimpleDD"
	        ,iframe : false
	        ,fileName: "SimpleDD.html"
	        ,leaf:true
	    }]
	}]
}, {
	text : "ExtJs扩展组件",
	children : [{
	    text   :'Grid'
	    ,path  : "js/extention/grid/"
	    ,qtip  : "扩展的Grid的相关例子"
	    ,children:[{
	        text   : '分组属性表格'
	        ,iframe: true
	        ,qtip  : "分组属性表格组件例子"
	        ,code  : "GroupPropertyGrid/GroupPropertyGrid"
	        ,fileName: "GroupPropertyGrid/GroupPropertyGrid.html"
	        ,leaf  : true
        },{
	        text   : '表头合并表格'
	        ,iframe: true
	        ,qtip  : "合并表格表头组件例子"
	        ,code  : "GroupHeaderGrid/GroupHeaderGrid"
	        ,fileName: "GroupHeaderGrid/GroupHeaderGrid.html"
	        ,leaf  : true
        },{
	        text   : '进度条列表格'
	        ,iframe: true
	        ,qtip  : "带进度条列的表格组件例子"
	        ,code  : "ProgressColumnGrid/ProgressColumnGrid"
	        ,fileName: "ProgressColumnGrid/ProgressColumnGrid.html"
	        ,leaf  : true
        }]
	}, {
		text  : "Form"
		,path : "js/extention/form/"
		,qtip : "对于Form上的一些控件的扩展"
		,children : [{
			text  : "下拉框"
			,iframe : true
			,qtip   : "对于下拉框的一些扩展"
			,fileName : "ComboBox/ComboboxExtention.html"
			,code     : "ComboBox/ComboboxExtention"
			,leaf     : true
		},{
			text  : "图标选择控件"
			,iframe : true
			,qtip   : "图标选择控件"
			,annotate : false
			,fileName : "ImageChooser/ImageChooser.html"
			,code     : "ImageChooser/ImageChooser"
			,leaf     : true
		},{
			text  : "上传控件"
			,qtip   : "上传控件之UploadDialog"
			,annotate : true
			,iframe   : true
			,fileName : "UploadDialog/UploadDialog.html"
			,code     : "UploadDialog/UploadDialog"
			,leaf     : true
		},{
			text  : "时间选择控件 - 可以选择时分秒"
			,qtip   : "时间选择控件扩展 - 可以选择时分秒"
			,annotate : true
			,fileName : "DateTimeField/DateTimeField.html"
			,code     : "DateTimeField/DateTimeField"
			,leaf     : true
		},{
			text  : "另外一种时间选择控件 - 可以选择时分秒"
			,qtip   : "另外一种时间选择控件 - 可以选择时分秒"
			,annotate : true
			,fileName : "DateTimeField/DateTimeField_More.html"
			,code     : "DateTimeField/DateTimeField_More"
			,leaf     : true
		},{
			text  : "自定义组件之DivField"
			,qtip   : "自定义组件之DivField"
			,annotate : true
			,fileName : "DivField/DivField.html"
			,code     : "DivField/DivField"
			,leaf     : true
		},{
			text  : "颜色选择域"
			,qtip   : "颜色选择域"
			,annotate : true
			,fileName : "ColorField/ColorField.html"
			,code     : "ColorField/ColorField"
			,leaf     : true
		},{
			text  : "多项选择"
			,qtip   : "多项选择扩展例子"
			,annotate : true
			,fileName : "MultiSelect/MultiSelect.html"
			,code     : "MultiSelect/MultiSelect"
			,leaf     : true
		},{
			text  : "密码强度选择控件"
			,qtip   : "密码强度选择控件例子"
			,annotate : true
			,fileName : "PasswordMeter/PasswordMeter.html"
			,code     : "PasswordMeter/PasswordMeter"
			,leaf     : true
		},{
			text  : "可拖拽Tab控件"
			,qtip   : "可拖拽Tab控件例子"
			,annotate : true
			,fileName : "DDTabPanel/DDTabPanel.html"
			,code     : "DDTabPanel/DDTabPanel"
			,leaf     : true
		}]
	}]
}]