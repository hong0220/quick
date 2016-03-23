var GroupingGrid = function() {
	// 定义数据源，这里使用的是GroupingStore。
	var jsonDs = new Ext.data.GroupingStore({
		url    : "js/widgets/grid/GridData.php",
        reader : new Ext.data.JsonReader({
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
		// 默认排序字段
		sortInfo   : {field: 'id', direction: "ASC"},
		// 分组字段
    	groupField : 'sex',
		autoLoad   : true
    });
	
    GroupingGrid.superclass.constructor.call(this, {
		renderTo  : 'groupingGrid',
        frame     : true,
        width     : 700,
        height    : 450,
        collapsible : true,
        animCollapse: false,
        title: '分组表格例子',
		store     : jsonDs,
        columns   : [
			new Ext.grid.RowNumberer(),
		    {header:"学号",width:50,dataIndex:"id",sortable : true},
		    {header:"姓名",dataIndex:"name"},
			{header:"成绩",dataIndex:"scroll",sortable : true},
		    {header:"性别",dataIndex:"sex",sortable : true},
		    {header:"班级",dataIndex:"classs"}
		],
		/** 分组显示信息设置 */
        view      : new Ext.grid.GroupingView({
            forceFit : true,
			// 表头下拉框定义文字（例子中是英文）
			showGroupsText : '分组展示',
			groupByText    : "以此列分组展示",
			// 定义分组显示格式:{text}本组的分组字段的值；{[values.rs.length]}本组数据条数
            groupTextTpl : '{text}  (共 <span style="color:red;">{[values.rs.length]} </span> 条数据)'
        })
	});
};

Ext.extend(GroupingGrid, Ext.grid.GridPanel);
/** 初始化组件 */
new GroupingGrid();