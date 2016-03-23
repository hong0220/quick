//这里可以自己定义从服务器取得数据
var store=new Ext.data.Store({
    proxy: new Ext.data.MemoryProxy(),
    reader: new Ext.data.JsonReader({}, ['value','text']),
    data:[{
            value:1,text:'爬山'
        },{
            value:2,text:'打球'
        },{
            value:3,text:'看书'
        },{
            value:4,text:'聊天'
        },{
            value:5,text:'游泳'
        },{
            value:6,text:'唱歌'
        },{
            value:7,text:'逛街'
        },{
            value:8,text:'旅游'
        }]
});
var ms = new Ext.form.MultiSelect({
    store:store
});

var data = [[1,'爬山'],[2,'打球'],[3,'看书'],[4,'聊天'],[5,'游泳'],[6,'唱歌'],[7,'逛街'],[8,'旅游']];
new Ext.TabPanel({
	title : '多选域例子',
	width : 500,
	height: 350,
	activeTab : 0,
	renderTo : 'multiSelPanel',
	bodyStyle : 'padding: 10px;',
	items : [{
		xtype : 'panel',
		title : '多选域例子一',
		border: true,
		frame : false,
		items : [{
			xtype : 'panel',
			border: false
		},ms],
		tbar  : [{
			text : '获取选中的值',
			handler : function(){
		        var recs=ms.getSelectedRecords();
		        var value="选中项的值";
		        Ext.each(recs,function(rec){
		            value+='<br/>text:'+rec.get('text')+", value:"+rec.get('value')
		        })
		        Ext.Msg.alert("提示","选中行索引："+ms.getSelectedIndexes() + "<br/><br/>" + value);
			}
		}]
	}, {
		xtype : 'panel',
		title : '多选域例子二',
		border: true,
		frame : true,
		items : [{
			title : '多选例子二',
			xtype : "multiselect",
			id    : "_multiselect2",
			data  : data,
			width : 250,
			height: 200,
			fieldLabel   : "多选项",
			dataFields   : ["code", "desc"], 
			valueField   : "code",
			displayField : "desc",
			allowBlank   : true,
			legend       : "兴趣爱好"
		}],
		tbar:[{
			text : "重置",
			handler : function(){
				Ext.getCmp("_multiselect2").reset();
			}
		}, {
			text : "得到选中值",
			handler : function(){
				Ext.Msg.alert('提示',Ext.getCmp("_multiselect2").getValue());
			}
		}, {
			text : "选择第1、5项",
			handler : function(){
				Ext.getCmp("_multiselect2").setValue("1,5");
			}
		}, {
			text : "启用/停用",
			handler : function(){
				// 这里只是改变了样式，并没有真正的停用
				var m = Ext.getCmp("_multiselect2");
				m.disabled ? m.enable() : m.disable()
			}
		}, {
			text : "验证",
			handler : function(){
				Ext.getCmp("_multiselect2").markInvalid("验证不通过的样式");
			}
		}]
	}, {
		xtype : 'panel',
		title : '两个多选域选择例子',
		border: true,
		frame : true,
		items : [{
			xtype : "itemselector",
			id    : "_multiselect3",
			fieldLabel : "ItemSelector",
			dataFields : ["code", "desc"],
			fromData   : data,
			// 默认数据
			toData     : [["9", "漫步"]],
			msWidth    : 250,
			msHeight   : 200,
			valueField   : "code",
			displayField : "desc",
			toLegend     : "已选择",
			fromLegend   : "请选择"
		}],
		tbar : [{
			text:"清空已选择",
			handler:function(){
				var i = Ext.getCmp("_multiselect3");
				i.reset.call(i);
			}
		}],
		buttons:[{
			text:"得到值",
			handler: function(){
				alert(Ext.getCmp("_multiselect3").getValue());
			}
		}]
	}]
});