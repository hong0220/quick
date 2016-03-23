
/********************************************
 * 玉琴蝶园之ExtJs例子资料
 * 作者：迷蝶
 * 创建时间：2010-05-18
 * 联系方式：
 * 		E-Mail：leader1212@sina.com.cn
 * 		  CSDN：http://hi.csdn.net/leadergg
 * 说明：如需直接使用本站的例子代码，请保留此说明
 *
 ******************************************/
//自定义控件，使其支持DIV
Ext.form.divField = Ext.extend(Ext.BoxComponent, {   
   	onRender : function(ct, position){
       if(!this.el){
           this.el = document.createElement('div');
        // 拷贝属性和事件
        for(var p in this.divConfig){
        	this.el[p] = this.divConfig[p];
        }
       }
       Ext.form.Label.superclass.onRender.call(this, ct, position);   
      }   
   }); 
Ext.reg('divfield', Ext.form.divField);

var form = new Ext.form.FormPanel({
	renderTo : 'divfieldForm',
	title    : '测试divField',
	height   : 400,
	width    : 400,
	items    : [{
		xtype : 'divfield',
		divConfig: {
			onclick   : function(){Ext.Msg.alert("提示","触发了onclick！");},
			innerHTML : '<a href="http://leadergxg.25291.84g.com/ExtJs/"><img src="http://leadergxg.25291.84g.com/ExtJs/style/images/logo_small.png" border=0></img></a>ExtJs示例之自定义组件'
		}
	}]
});