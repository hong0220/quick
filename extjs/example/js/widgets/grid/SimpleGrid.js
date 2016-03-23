/****** 简单Grid，以本地数组数据作为数据源 *******/
var SimpleGrid = function() {
	//定义数据
	var data = [
	     ["00001","male","张三","05级三班",'88'],
	     ["00002","male","李四","05级四班",'58'],
	     ["00003","female","王五","06级一班",'78'],
	     ["00004","male","小张","06级三班",'98'],
	     ["00006","male","小李","05级一班",'68']
	];
    SimpleGrid.superclass.constructor.call(this, {
		title     : '简单Grid - 数组数据作为数据源',
		renderTo  : 'simpleGrid',   //指定组件渲染目的对象
		autoScroll: true,
		width     : '100%', //grid的宽度，如果用像素值就直接用数字，百分比则用'99%'
		autoHeight: true,
		enableDragDrop   : true, // 激活GridPanel行的拖动
		autoExpandColumn : 'id', //用此列填充宽度
		/** proxy告诉我们从哪里获得数据，reader告诉我们如何解析这个数据。
		 * Ext.data.MemoryProxy将内存中的数据data作为参数传递
		 * Ext.data.ArrayReader专门用来解析数组,并且告诉我们它会按照定义的规范进行解析，
		 * 每行按顺序读取四个数据，第一个叫id，第二个叫sex，第三个叫name，第四个descn。
		 * 这些是跟cm定义中的dataIndex对应的。这样cm就知道哪列应该显示那条数据了。
		 */
	    ds        : new Ext.data.Store({
			// 用于访问数据对象。
			proxy : new Ext.data.MemoryProxy(data),
			/**
			 * 数据列映射关系
			 * name   ：在cm中的名称
			 * mapping：指定数组下标
			 */
			reader: new Ext.data.ArrayReader({}, [
				{name: "id",mapping: 0},
				{name: "sex",mapping: 1},
				{name: "name",mapping: 2},
				{name: "class",mapping: 3},
				{name: "scroll",mapping: 4}
			]),
			autoLoad : true // 自动加载数据
		}),
		/** 
		 * 列定义，即定义表头ColumnModel，可以通过width来设置宽
		 * header   ：表头
		 * dataIndex： 对应数据索引项
		 * sortable ： 是否此列进行排序
		 * width    ：设置此列宽度
		 * fixed    ：此列宽度是否固定
		 * resizable：此列宽度是否可以改变
		 */
	    cm       : new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(), //自动行号
		    {id:"id",header:"学号",width:50,dataIndex:"id",fixed: true,sortable : true},
		    {header:"姓名",dataIndex:"name",sortable : true,resizable:false},
			{header:"成绩",dataIndex:"scroll",sortable : true},
		    {header:"性别",dataIndex:"sex",sortable : true},
		    {header:"班级",dataIndex:"class",sortable : true}
		]),
		viewConfig : {
			forceFit : true,
			enableRowBody : true,
			// 添加对行颜色的控制
			getRowClass :function(record, rowIndex, p, ds) {
				// 这里是拿到数据集后根据分数来进行颜色的改变。
				// 在你的Grid中，可以选择自己的列进行条件判断后改变行的颜色
				var scroll = record.data.scroll;
				var cls;
				if(scroll < 60 || scroll == 60) cls = "red-row";
				else if(scroll > 60 && scroll<80) cls = "green-row";
				else if(scroll > 80 || scroll == 80) cls = "yellow-row";
				return cls;
			}	
		}
	});
};

Ext.extend(SimpleGrid, Ext.grid.GridPanel);
/** 初始化组件 */
new SimpleGrid();

/****** 简单Grid，以本地JSON数据作为数据源 *******/
var SimpleJsonDataGrid = function() {
	//定义数据
	var data = {
		totalProperty:4,
	    "students": [
	        { "id": "00001", "sex": "male", "name":"学生A", "class": "05级一班", "scroll": "88" },
	        { "id": "00002", "sex": "male","name":"学生B", "class": "05级三班", "scroll": "58" },
	        { "id": "00003", "sex": "female","name":"学生C", "class": "05级五班", "scroll": "98" },
	        { "id": "00004", "sex": "male","name":"学生D", "class": "05级一班", "scroll": "78" }
	    ],
	    "musicians": [
	        { "id": "00001", "sex": "male", "name":"学生A", "scroll": "88" },
	        { "id": "00002", "sex": "male","name":"学生B", "scroll": "58" }
	    ]
	};
    SimpleJsonDataGrid.superclass.constructor.call(this, {
		title     : '简单Grid - JSON格式数据作为数据源',
		renderTo  : 'simpleJsonDataGrid',
		autoScroll: true,
		width     : '100%',
		autoHeight: true,
		width     : 480,
		/** Ext.data.JsonReader专门用来解析JSON数组,并且告诉我们它会按照定义的规范进行解析，
		 * root：指定JSON数据读取根节点
		 * name：Json数组的key
		 */
	    ds        : new Ext.data.Store({
	        proxy: new Ext.data.MemoryProxy(data),
	        reader: new Ext.data.JsonReader({root: "students"}, [
	            {name: "id"},
	            {name: "sex"},
	            {name: "name"},
	            {name: "class"},
				{name: "scroll"}
	        ]),
			autoLoad : true
		}),
	    cm       : new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
		    {header:"学号",width:50,dataIndex:"id"},
		    {header:"姓名",dataIndex:"name"},
			{header:"成绩",dataIndex:"scroll"},
		    {header:"性别",dataIndex:"sex"},
		    {header:"班级",dataIndex:"class"}
		])
	});
};

Ext.extend(SimpleJsonDataGrid, Ext.grid.GridPanel);
new SimpleJsonDataGrid();

/****** 简单Grid，以服务器JSON数据作为数据源 *******/
var SimpleGridByRemoteData = function() {
	/** url：数据来源地址 */
	var jsonDs = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url:"js/widgets/grid/GridData.php"}),
        reader: new Ext.data.JsonReader({
            root: "students",
			totalProperty: 'totalProperty',
			fields:[{
				name: "id"},
	            {name: "name"},
	            {name: "sex"},
	            {name: "classs"},
	            {name: "scroll"
			}]
		}),
		autoLoad : true
    });
	
    SimpleGridByRemoteData.superclass.constructor.call(this, {
		title     : '简单Grid - 服务器JSON格式数据作为数据源',
		renderTo  : 'simpleGridByRemoteData',
		autoScroll: true,
		width     : '100%',
		autoHeight: true,
		width     : 480,
		loadMask  : true,
	    ds        : jsonDs,
	    cm       : new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
		    {header:"学号",width:50,dataIndex:"id",sortable : true},
		    {header:"姓名",dataIndex:"name"},
			{header:"成绩",dataIndex:"scroll",sortable : true},
		    {header:"性别",dataIndex:"sex",sortable : true},
		    {header:"班级",dataIndex:"classs"}
		])
	});
};

Ext.extend(SimpleGridByRemoteData, Ext.grid.GridPanel);
new SimpleGridByRemoteData();

/****** 简单Grid，以服务器XML数据作为数据源 *******/
var SimpleGridByRemoteXmlData = function() {
	
    SimpleGridByRemoteXmlData.superclass.constructor.call(this, {
		title     : '简单Grid - 服务器XML格式数据作为数据源',
		renderTo  : 'simpleGridByRemoteXmlData',
		autoScroll: true,
		width     : '100%',
		autoHeight: true,
		width     : 500,
		loadMask  : true,
	    ds        : new Ext.data.Store({
	        proxy: new Ext.data.HttpProxy({url:"js/widgets/grid/grid-data.xml"}),
	        reader: new Ext.data.XmlReader({
				totalRecords: "total",
				record: "studente"},[
				{name: "id"},
	            {name: "sex"},
	            {name: "name"},
	            {name: "class"},
				{name: "scroll"}
			]),
			autoLoad : true
	    }),
	    cm       : new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
		    {header:"学号",dataIndex:"id"},
		    {header:"姓名",dataIndex:"name"},
			{header:"成绩",dataIndex:"scroll"},
		    {header:"性别",dataIndex:"sex"},
		    {header:"班级",dataIndex:"class"}
		])
	});
};

Ext.extend(SimpleGridByRemoteXmlData, Ext.grid.GridPanel);
new SimpleGridByRemoteXmlData();