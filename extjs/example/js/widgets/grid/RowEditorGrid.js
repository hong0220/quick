var RowEditorGrid = function() {
	// 定义列格式
	var Student = Ext.data.Record.create([
		{name: "id"},
        {name: "name"},
        {name: "sex"},
        {name: "classs"},
        {name: "scroll",type: 'int'}
	]);
	// 定义数据源，这里也是用了GroupingStore
	var store = new Ext.data.GroupingStore({
		url    : "js/widgets/grid/GridData.php",
        reader : new Ext.data.JsonReader({
            root: "students",
			totalProperty: 'totalProperty',
			fields:Student
		}),
		autoLoad   : true
    });
	// 定义编辑行
	var editor = new Ext.ux.grid.RowEditor({
        saveText: '确定',
		cancelText : '取消',
		commitChangesText : '你必须确定或者取消编辑'
    });
	
    RowEditorGrid.superclass.constructor.call(this, {
		title     : '对整行进行编辑的Grid',
		renderTo  : 'rowEditorGrid',
		autoScroll: true,
		autoHeight: true,
		width     : 600,
		loadMask  : true,
        margins   : '0 5 5 5',
        autoExpandColumn : 'name',
		store     : store,
		// 定义编辑行
        plugins   : [editor],
		// 定义展示
        view     : new Ext.grid.GroupingView({
            markDirty: false,
			// 表头下拉框定义文字（例子中是英文）
			showGroupsText : '分组展示',
			groupByText    : "以此列分组展示",
			// 定义分组显示格式:{text}本组的分组字段的值；{[values.rs.length]}本组数据条数
            groupTextTpl : '{text}  (共 <span style="color:red;">{[values.rs.length]} </span> 条数据)'
        }),
        tbar: [{
            text    : '增加',
			scope   : this,
            handler : function(){
                var student = new Student({
					id   : "students0001",
                    name : "姓名",
                    sex  : "male",
                    scroll : 76,
                    classs : "XX班"
                });
                editor.stopEditing();
                store.insert(0, student);
                this.getView().refresh();
                this.getSelectionModel().selectRow(0);
                editor.startEditing(0);
            }
        },{
            ref: '../removeBtn',
            text: '删除',
            disabled: true,
			scope  : this,
            handler: function(){
				var scope = this;
                editor.stopEditing();
				Ext.MessageBox.confirm("提示", "是否真的要删除数据？", function(ret) {
					if (ret == "yes") {
		                var s = scope.getSelectionModel().getSelections();
		                for(var i = 0, r; r = s[i]; i++){
		                    store.remove(r);
		                }
					}
				})
			}
        }],
		// 定义编辑列，和editGrid差不多
        columns: [
			new Ext.grid.RowNumberer(),
		    {
				header : "学号",
				width  : 50,
				dataIndex: "id",
				sortable : true,
				editor : {
	                xtype : 'textfield',
	                allowBlank : false
            	}
			}, {
				id : "name",
				header : "姓名",
				dataIndex : "name",
				editor : {
	                xtype : 'textfield',
	                allowBlank : false
            	}
			}, {
				xtype: 'numbercolumn',
				header:"成绩",
				dataIndex:"scroll",
				sortable : true,
				editor: {
	                xtype     : 'numberfield',
	                allowBlank: false,
	                minValue  : 0,
	                maxValue  : 100
            	}
			}, {
				header:"性别",
				dataIndex:"sex",
				sortable : true,
				editor: new Ext.form.ComboBox({
					store: new Ext.data.SimpleStore({
					 	fields: ["value", "name"],
						data: [["male", "male"],["famale", "famale"]],
						sortInfo:{field:"name"}
					}),
					valueField :"value",
					displayField: "name",
					mode: 'local',
					forceSelection: true,
					editable: true,
					selectOnFocus:true,
					triggerAction: 'all',
					typeAhead: true
				})
			}, {
				header:"班级",
				dataIndex:"classs",
				editor: {
	                xtype: 'textfield',
	                allowBlank: false
            	}
			}
        ]
	});
};
Ext.extend(RowEditorGrid, Ext.grid.GridPanel);
var rowEditorGrid = new RowEditorGrid();
// 定义选中后删除按钮可用
rowEditorGrid.getSelectionModel().on('selectionchange', function(sm){
    rowEditorGrid.removeBtn.setDisabled(sm.getCount() < 1);
});