Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL="../../../../../resources/images/default/s.gif";
	var PropertyGrid = function() {
		var jsonSource = {   
			"样式" : {
				"宽度" : 200,   
				"高度" : 600,
				"字体" : "宋体",
				"字体大小" : 12,
				"字体颜色" : "red",
				"自动滚动" : true
			},
			"属性" : {
				"ID" : "text",
				"编码" : "content",
				"标题" : "详细信息",
				"Tab键顺序" : 2
			},
			"鼠标事件" : {
				"单击事件" : "click",
				"双击事件" : "douleClick",
				"鼠标滑过" : "mouseOver"
			},
			"其他" : {
				"允许收缩" : true,
				"默认收缩" : false
			}
		};
    	PropertyGrid.superclass.constructor.call(this, {
    		title: '分组属性表格',
	        autoHeight: true,
	        width: 500,
	        heught : 500,
	        renderTo: 'groupPropertyGrid',
			tbar:[{
					text:'分组',
					tooltip:'分组显示属性',
					scope : this,
					handler: this.enableGroup
				},'-',{
					text:'不分组显示',
					tooltip:'不分组显示属性',
					scope : this,
					handler: this.disableGroup
				}
			],
	        source: jsonSource
       	});
	};
	Ext.extend(PropertyGrid, Ext.ux.grid.GroupPropertyGrid);
	new PropertyGrid();
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});