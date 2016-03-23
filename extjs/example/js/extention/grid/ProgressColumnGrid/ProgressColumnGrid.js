Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL="../../../../../resources/images/default/s.gif";
  	var ProgressColumnGrid = function() {
		/** 设置性别显示 */
		function sexChange(val){
	        if(val == "female"){
	            return '<span style="color:green;">女</span>';
	        } else {
	            return '<span style="color:red;">男</span>';
	        }
	    }
		/** 如要去掉CheckBox，去掉三个地方的sm，
		 * 1、var sm = new Ext.grid.CheckboxSelectionModel();
		 * 2、cm里面的 sm,//也可以放在其他位置，如编号之后。
		 * 3、grid里面的 sm: sm, //添加CheckBox
		 */
		var sm = new Ext.grid.CheckboxSelectionModel();
		
		var jsonDs = new Ext.data.Store({
	        proxy: new Ext.data.HttpProxy({url:"pageGridData.php"}),
	        reader: new Ext.data.JsonReader({
	            root: "students",
				totalProperty: 'totalProperty'
			},this.getPlant()),
			autoLoad : true
	    });
	    
	    /** 设置列进度条组件 */
	    var growthColumn = new Ext.ux.grid.ProgressColumn({
			header : "成绩",
			dataIndex : 'scroll',
			width : 85,
			textPst : '%', // 设置后缀
			actionEvent: 'click', 
			colored : true, // 颜色标记
			editor : new Ext.form.TextField()
		});
		
	    ProgressColumnGrid.superclass.constructor.call(this, {
			title     : '复杂Grid',
			renderTo  : 'progressColumnGrid',
			autoScroll: true,
			height    : 300,
			width     : 600,
			loadMask  : true,
		    ds        : jsonDs,
			sm        : sm,
			autoExpandColumn : "name",
			// 设置这里后方可编辑成绩
			plugins : [growthColumn],
		    cm        : new Ext.grid.ColumnModel([
				new Ext.grid.RowNumberer(),
				sm,
			    {header:"学号",width:100,dataIndex:"id",sortable : true},
			    {id:"name",header:"姓名",dataIndex:"name",editor: new Ext.form.TextField({allowBlank: true})},
				growthColumn,
			    {header:"性别",dataIndex:"sex",sortable : true,renderer : sexChange,editor: new Ext.form.ComboBox({
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
				})},
			    {header:"班级",dataIndex:"classs",editor: new Ext.form.TextField({allowBlank: true})}
			]),
			/** 设置右键菜单 */
			rightClickMenu : new Ext.menu.Menu({
				scope : this,
			    items : [{
					scope : this,
		            handler : this.viewInfo,//点击后触发的事件
		            iconCls : "view",
		            text: "查看"
		        }, {
		            text: "编辑",
		            scope : this,
					iconCls : "edit",
		            handler : this.editInfo
		        }, {
		            text: "删除",
		            scope : this,
					iconCls : "delete",
		            handler : this.delInfo
		        }]
			}),
			/** 顶部工具栏 */
			tbar : [{
				text : '数据操作',
				iconCls : "option",
				scope : this,
				menu : [{
					text : '新增',
					scope : this,
					iconCls : 'add',
					handler : this.addColumn
				},'-',{
					text : '删除所选',
					scope : this,
					iconCls : 'delete',
					handler : this.deleteChecked
				}]
			},'->',{
				text : '打印',
				scope : this,
				iconCls : 'print'
			}],
			/** 分页工具栏 */
			bbar : new Ext.PagingToolbar({
	            pageSize: 10, //每页的数据
	            store: jsonDs,
	            displayInfo: true,
	            displayMsg: "显示第 {0} 条到 {1} 条记录，一共 {2} 条",
	            emptyMsg: "没有记录"
	        })
		});
		jsonDs.load({params:{start:0,limit:10}});//开始的数据和每次取得的数据条数
		// 右键菜单
		this.addListener("rowcontextmenu", this.rightClickFn,this);
	};
	
	Ext.extend(ProgressColumnGrid, Ext.grid.EditorGridPanel,{
		/**
		 * 列选中事件
		 * @param {Object} grid
		 * @param {Object} rowIndex
		 * @param {Object} columnIndex
		 * @param {Object} e
		 */
		cellclickFn : function (grid, rowIndex, columnIndex, e) {
			var record = grid.getStore().getAt(rowIndex);   //得到数据集,这里也可以用ds.getAt(rowIndex);
			if (columnIndex > 1) {
				var fieldName = grid.getColumnModel().getDataIndex(columnIndex); //得到要显示的内容，也可以用索引01234……表示。
				var data = record.get(fieldName);
				Ext.MessageBox.alert("信息", "当前选中数据：" + data);
			}
		},
		/**
		 * 右键菜单事件
		 * @param {Object} grid
		 * @param {Object} rowindex
		 * @param {Object} e
		 */
		rightClickFn : function(grid,rowIndex,e){
		    e.preventDefault();
			this.gridCtxRecord = this.store.getAt(rowIndex);
			this.rowIndex = rowIndex;
		    this.rightClickMenu.showAt(e.getXY());
		},
		/** 
		 * 得到列设置
		 */
		getPlant : function () {
			return Ext.data.Record.create([{
				name : 'id',
				type : 'string'
			}, {
				name : 'name',
				type : 'string'
			}, {
				name : 'sex',
				type : 'string'
			}, {
				name : 'classs',
				type : 'string'
			}, {
				name : 'scroll',
				type : 'string'
			}]);
		},
		/**
		 * 查看信息
		 */
		viewInfo : function () {
			var name = this.gridCtxRecord.get("name");
			var html = "学号：" + this.gridCtxRecord.get("id") + "<br/>"
						+ "姓名：" + name + "<br/>"
						+ "班级：" + this.gridCtxRecord.get("classs") + "<br/>"
						+ "性别：" + this.gridCtxRecord.get("sex") + "<br/>"
						+ "成绩：" + this.gridCtxRecord.get("scroll") + "<br/>";
			this.showDetailWin(name,html);
		},
		/**
		 * 编辑信息，这里没有提取信息出来后编辑。直接在Grid上编辑的
		 */
		editInfo : function () {
			this.stopEditing();
			this.startEditing(this.rowIndex, 3);
		},
		/** 新增信息 */
		addColumn : function () {
	    	var Plant = this.getPlant();
	    	var ds = this.getStore();
			this.maxColIndex = ds.getCount() + 1;
			var p = new Plant({
				id: '000' + this.maxColIndex,
				name : 'Z',
				sex : 'male',
				classs : '班级',
				scroll : '60'
			});
			this.stopEditing();
			ds.insert(0, p);
			this.startEditing(0, 3);
		},
		/** 删除数据 */
		delInfo : function () {
			var id = this.gridCtxRecord.get("id");
			var scope = this;
			Ext.MessageBox.confirm("提示", "是否真的要删除ID为" +id+ "的数据？", function(ret) {
				if (ret == "yes") {
					scope.getStore().remove(scope.gridCtxRecord);
					// 注释部分是在服务器上操作
					/**
					Ext.Ajax.request({
						url : url,
						method : 'POST',
						params : {
							id : id
						},
						success : function(response, options) {
							var responseStr = response.responseText;
							if (responseStr == "success") {
								store.remove(scope.gridCtxRecord);
							} else {
								Ext.Msg.alert('失败','删除失败！');
							}
						}
					});
					*/
				}
			});
		},
		/**
		 * 删除选中数据
		 */
		deleteChecked : function () {
			var scope = this;
               var rowselects = scope.getSelectionModel().getSelections();
               var deleteIds="";
               if (rowselects.length <= 0) 
				Ext.Msg.alert('提示', '请选择要删除的数据！');
			else {
				Ext.MessageBox.confirm("提示", "是否真的要删除选中的数据？", function(ret) {
					if (ret == "yes") {
						for (i = 0; i < rowselects.length; i++) {
							scope.getStore().remove(rowselects[i]);
						}
					}
				});
			}
		},
		/**
		 * 设置详细信息的显示窗口
		 * @param {Object} title
		 * @param {Object} html
		 */
		showDetailWin : function (title,html) {
			if(!html) html = "暂无信息！";
			new Ext.Window({
				title : "查看 " + title + " 学生的详细信息",
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
	new ProgressColumnGrid();
	
	var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});