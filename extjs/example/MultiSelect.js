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
new Ext.Panel({
	title : '多选域例子',
	width : 300,
	height: 300,
	renderTo : 'multiSelPanel',
	items : [ms],
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
	},{
		text:"选择第一、五项",
		handler: function(){
			ms.setValue("1,5");
		}
	}]
});