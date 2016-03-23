Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL="../../../../../resources/images/default/s.gif";
	// 图片选择器
	ImageChooser = function (){
		ImageChooser.superclass.constructor.call(this, {
			hideId     : 'graphicsURL',
			fieldLabel : '图标',
			url        : 'images.php',
			height     : 85,
			width      : 250
		});
	}
	Ext.extend(ImageChooser, Ext.ux.ImageChooser);
	// 图片显示域
	ImageField = function (){
		var imageView = new Ext.DataView({
            store: new Ext.data.JsonStore({
	            url: 'images.php',
	            root: 'images',
	            fields: ['name', 'url']
	        }),
            tpl: new Ext.XTemplate(
		        '<tpl for=".">',
		        '<div class="thumb-wrap" id="{name}">',
		        '<div class="thumb"><img src="{url}" alt="{shortName}" title="{name}" /></div>',
		        '</div>',
		        '</tpl>'
	        ),
            autoHeight: true,
			autoWidth : true,
            overClass :'x-view-over',
            itemSelector:'div.thumb-wrap',
            emptyText : '没有图片',
            loadingText: '图片加载中...',
			singleSelect: true
        });
		ImageField.superclass.constructor.call(this, {
			fieldLabel : '服务器',
			name       : 'service',
			msgTarget  : 'title',
			view       : imageView,
			browserWidth : 300,
			browserHeight: 180,
			windowConfig : {
				cls : 'images-view'
			},
			defaultImage : 'images/Serverh3c.gif'
		});
	}
	Ext.extend(ImageField, Ext.ux.form.ImageField);
	
    var imageChooserForm = new Ext.form.FormPanel({
		renderTo    : "imageChooser",
		title       : '图标展示示例',
		labelAlign  : 'right',
		labelWidth  : 45,
		width       : 350,
		frame       : true,
		bodyStyle   : 'padding:10px 0 10px 5px;',
		style       : 'padding:5px 0 10px 5px;',
		buttonAlign : "center",
		items       : [new ImageField(), new ImageChooser()],
		buttons     : [{
			text : "提交",
			scope   : this,
			handler : function () {
				var values = imageChooserForm.form.getValues();
				var html = "";
				for(var i in values) {
					html += "选中图标名: " + values[i] + "<br>";
				}
				Ext.Msg.alert("提示",html);
			}
		}]
	});
	var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});