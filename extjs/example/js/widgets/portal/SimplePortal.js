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
		autoScroll: true,
		height:250,
        width:360,
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
		])
	});
};

Ext.extend(SimpleGrid, Ext.grid.GridPanel);


var SimplePortal = function() {
    SimplePortal.superclass.constructor.call(this, {
		region:'center',
        margins:'5 5 5 5',
		items:[{
			columnWidth:.5,
		    style:'padding:10px 0 10px 10px',
		    items:[{
		        title : '美人赋',
				id    : 'simplePortal_mrf',
		        layout: 'fit',
				height: 200,
				autoScroll: true,
				autoLoad : {
					url  : "js/widgets/panel/meirenfu.html",
					scripts : true
				}
		    },{
		        title: '洛神赋',
				id    : 'simplePortal_lsf',
				height: 250,
				autoScroll: true,
				autoLoad : {
					url  : "js/widgets/panel/content.html",
					scripts : true
				}
		    }]
		},{
		    columnWidth:.5,
		    style:'padding:10px',
		    items:[{
		        title : 'Grid',
				id    : 'simplePortal_grid',
		        items : [new SimpleGrid()]
		    }]
		}]
	});
};
Ext.extend(SimplePortal, Ext.ux.Portal);
var simplePortal = new SimplePortal();


var panel = new Ext.Panel({
	renderTo : "simplePortal",
	width : 800,
	height: 600,
	layout:'border',
	items : [simplePortal]
});