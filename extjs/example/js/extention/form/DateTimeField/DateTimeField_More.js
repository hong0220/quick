var formatArray = ['d-m-Y H:i','d-m-Y H:i:s','d-m-Y h:i:s A'];
var cmArray = [];
var fieldArray = [];

for(var i=0;i<formatArray.length;i++) {
	var f = formatArray[i];
	var n = 'f'+i;
	cmArray.push({
       header: 'Format "'+f+'"',
       dataIndex: n,
       width: 180,
       renderer: Ext.util.Format.dateRenderer(f),
       editor: new Cls.form.DateTimeField({format: f})//设置EditorField
    });
	fieldArray.push({name: n, mapping: n, type: 'date', dateFormat: f});
}

var cm = new Ext.grid.ColumnModel(cmArray);
cm.defaultSortable = true;

var Row = Ext.data.Record.create(fieldArray);

var store = new Ext.data.Store({
    url: '',
    reader: new Ext.data.XmlReader({
       record: 'row'
   }, Row),
    sortInfo:{field:'f1', direction:'ASC'}
});

var grid = new Ext.grid.EditorGridPanel({
    store : store,
	region: 'center',
	cm    : cm,
    title : '时间字段',
    frame : false,
    clicksToEdit:1,
    tbar: [{
        text: '增加列',
        handler : function(){
            var p = new Row({});
			for(var i=0;i<formatArray.length;i++) {
				p.data['f'+i]=new Date();
			};
            grid.stopEditing();
            store.insert(0, p);
            grid.startEditing(0, 0);
        }
    }]
});

new Ext.Window({
	title  : "时间选择-时分秒分别选择",
	width  : 630,
	height : 450,
	closeAction : 'close',
	layout : 'border',
	layoutConfig: {
        titleCollapse: false,
        animate     : true,
        activeOnTop : true
    },
	items: [{
		xtype : 'form',
		region: 'north',
		height: 215,
		border: true,
		title : 'Form samples',
		labelWidth : 200,
		labelAlign : 'left',
		items : [{
	        xtype: 'datetimefield',
			fieldLabel: '普通时分秒选择',
			id   : 'datetimefield'
	    }, {
			xtype : 'datefield',
			fieldLabel: '普通时间选择',
			name  : 'name',
			width : 250,
			value : '2009-03-04 11:23:45',
			format: 'Y-m-d H:i:s'
		}, {
			xtype : 'datetimefield',
			fieldLabel: '"d-m-Y H:i:s" 格式',
			name  : 'time1',
			width : 250,
			value : '04-03-2009 11:23:45',
			format: 'd-m-Y H:i:s'				
		},{
			xtype : 'datetimefield',
			fieldLabel: '"d-m-Y H:i" 格式',
			name  : 'time3',
			width : 250,
			value : '04-03-2009 11:23',
			format: 'd-m-Y H:i'						
		}, {
			xtype : 'datetimefield',
			fieldLabel: '"d-m-Y H:i" 格式',
			name  : 'time4',
			width : 250,
			value : '04-03-2009 11:23:45',
			minValue: '02-03-2009 03:15:20',
			maxValue: '20-03-2009 17:28:45',
			format: 'd-m-Y H:i:s'						
		}, {
			xtype : 'datetimefield',
			fieldLabel: 'Format "d-m-Y H:i:s A" 格式',
			name  : 'time2',
			width : 250,
			value : '04-03-2009 08:00:00',
			format : 'd-m-Y h:i:s',
			timeFields:'H'			
		}]
	},
	grid]
}).show();