Ext.QuickTips.init();   
Ext.onReady(function(){   
    var mycbo=new Ext.ux.form.DynamicTreeCombox({   
        expandAll:false,//是否在点击combox时将树全部展开   
        displayField:"nameLabelCode",//点击树节点时，将节点的哪个字段设置为combox的值   
        fieldLabel:"Dynamic Tree Combo",   
        readOnly:true,   
        width:180,   
        loaderConfig:{   
            dataUrl:"position.php",//加载树的URL   
            baseParams:{parentFuncId:""}//传递给后台的参数，其中parentFuncId是必须的，而且初始化为第一次加载时parentFuncId为空，即加载的是后台数据库的根节点   
        },   
        fieldMapping:{//因为我的后台程序返回的没有text qtip字段，故加上fieldMapping进行映射，如果后台返回的json有这几个字段，此属性可省略   
		/*
            text:"nameLabelCode",//映射node的text字段   
            qtip:"descriptionLabelCode",//映射node的qtip字段   
          */  parentFuncId:"text"//映射动态请求后台时使用node的funcId字段作为请求参数   
        }   
    });   
       
    var myform=new Ext.form.FormPanel({   
        renderTo:Ext.getBody(),   
        width:350,   
        height:100,   
        frame:true,   
        labelWidth:150,   
        items:[mycbo]   
    });   
	
	var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});  