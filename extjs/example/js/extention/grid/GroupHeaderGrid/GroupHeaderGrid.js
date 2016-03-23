Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL="../../../../../resources/images/default/s.gif";
	var GroupHeaderGrid = function() {
    	GroupHeaderGrid.superclass.constructor.call(this, {
    		title: '表头合并范例',
    		renderTo : "groupHeaderGrid",
    		height : 200,
			store: new Ext.data.SimpleStore({
				fields: ['name', 'sex', 'position', 'record', 'university', 'middleSchool', 'primarySchool'],
				data: [['张三','男','项目经理','本科','XX大学','XX中学','XX小学'],
					   ['李四','男','技术总监','硕士','XX大学','XX中学','XX小学'],
					   ['刘虹','女','技术架构师','专科','XX大学','XX中学','XX小学']]
			}),
			colModel: new Ext.grid.ColumnModel({
				columns: [
					{header: "姓名", width: 120,  dataIndex: 'name'},
					{header: "性别", width: 120,  dataIndex: 'sex'},
					{header: "职位", width: 120,  dataIndex: 'position'},
					{header: "学历", width: 120,  dataIndex: 'record'},
					{header: "就读大学", width: 120,  dataIndex: 'university'},
					{header: "就读中学", width: 120,  dataIndex: 'middleSchool'},
					{header: "就读小学", width: 120,  dataIndex: 'primarySchool'}
				],
				defaultSortable: true,
				rows: [[
						{},
						{},
						{},
						{},
						{header: '教育经历', colspan: 3, align: 'center'}
						
					]
				]
			}),
			enableColumnMove: false,
			viewConfig: {
				forceFit: true
			},
			plugins: [new Ext.ux.plugins.GroupHeaderGrid()]
       	});
	};
	Ext.extend(GroupHeaderGrid, Ext.grid.GridPanel);
	new GroupHeaderGrid();
	
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});