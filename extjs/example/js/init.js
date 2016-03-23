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
Ext.onReady(function(){
	Ext.QuickTips.init();
	var contentTabPanle = new ContentTabPanle();
	
	
//定义使用改变个性化定制的控件   
//该控制实际上为一个可供选择样式表值的下拉框   
//当改变下拉框的选择时则调用Ext.util.CSS.swapStyleSheet来替换其样式表路径   
Ext.ux.ThemeChange = Ext.extend(Ext.form.ComboBox,{   
    editable : false,   
    displayField : 'theme',   
    valueField : 'css',   
    typeAhead : true,   
    mode : 'local',   
    value : '默认',   
    readonly : true,
    triggerAction : 'all',   
    selectOnFocus : true,   
    initComponent : function(){   
        var themes = [   
                ['默认', 'ext-all.css'],   
                ['黑色', 'xtheme-access.css'],   
                ['巧克力色', 'xtheme-blue.css'],   
                ['深灰色', 'xtheme-darkgray.css'],   
                ['浅灰色', 'xtheme-gray.css'],   
                ['绿色', 'xtheme-green.css'],   
                ['橄榄色', 'xtheme-olive.css'],   
                ['椒盐色', 'xtheme-peppermint.css'],   
                ['粉色', 'xtheme-pink.css'],   
                ['紫色', 'xtheme-purple.css'],   
                ['暗蓝色', 'xtheme-slate.css'],   
                ['靛青色', 'xtheme-indigo.css'],   
                ['深夜', 'xtheme-midnight.css'],   
                ['银白色', 'xtheme-silverCherry.css']   
        ];   
        this.store = new Ext.data.SimpleStore({   
            fields : ['theme', 'css'],   
            data : themes   
        });   
    },   
    initEvents : function(){   
        this.on('collapse', function(){
        alert(this.getValue());
            //实际改变风格样式的处理   
            Ext.util.CSS.swapStyleSheet('theme', 'resources/css/'+ this.getValue());   
        });   
    }   
});   
Ext.reg('xthemeChange', Ext.ux.ThemeChange);   
  
	var widgetsTree = new WidgetsTree({contentEl:contentTabPanle});
	new Ext.Viewport({
		enableTabScroll: true
		,layout: "border"
		,items: [{
			region: "north"
			,border: false
			,height: 60
			,html:'<h1 id=logo><a href="http://ext.yuqindieyuan.cn">玉琴蝶园(YuQinDieYuan) －－ 研究各种技术（lucene、extjs、ajax、web）</a> </h1><div class="quote">等候环境对他的事业完全有利才动手的人，将永远不会成功。<br>[在温室中想象南极，谁都可以做到！！] </div><div id="changeTheme"></div>'
		},{
			title: "例子"
			,region: "west"
			,split: true
			// 是否允许折叠
			,collapsible: false
			// 折叠按钮样式，不设置这个则为在面板右上角有个<<折叠符号
			,collapseMode:'mini'
			,width: 250
			,items: [widgetsTree]
		},{
			// 中部，此面板必须。如果不设置则会出错
			region  : "center"
			,items  : [contentTabPanle]
		},{
			region : "south"
			,height: 50
			,autoLoad: {
				url: "common/footer.html",
			    text: "页面载入中...",
			    callback : function(el, success, response, options) {
			    	if (success != true) {
			    		Ext.Msg.alert("提示","页面加载出错！");
			    		return;
			    	}
				},
				scripts : true
			}
		}]
	});
	/*
	new Ext.ux.ThemeChange({
		renderTo : "changeTheme"
	});
	*/
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
	widgetsTree.setHeight(document.body.clientHeight-135);
	contentTabPanle.setHeight(document.body.clientHeight-115);
});