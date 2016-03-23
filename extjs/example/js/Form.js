/**
 * 组件树类
 */
var Form = function() {
    Form.superclass.constructor.call(this, {
		title: '关于',
		frame:true,
		style:'padding:5px 5px 0 5px',
		layout:'form',
		html: '<div class="content-font">这些例子可能是我自己制作的，也有些是从网上找的资料!其实很多都是参考别人的代码再自己写的。做这个的目的有二：<ul><li>1、熟悉ext</li><li>2、把各个常用的控件的制作集中到这里，便于查阅。</li></ul>如有疑问，可联系我,欢迎和各位交流ext的相关问题和经验。</div>'
	});
};
Ext.extend(Form, Ext.Panel);