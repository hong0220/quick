/**
DIV设置如下：
<br>
<div id="_divForDD1"  style="width:300px;top:100px;left:100px;background: red;font-size:20;">我只能被拖到下面的容器</div>
<br>
      <div id="target" style="width:300px;height:200px;background:yellow;"></div>
<br>
      <div id="_divForDD3_hanld" style="width:300px;background:green;">点我拖动下面的DIV</div>
<br>
      <div id="_divForDD3" style="width:300px;height:40px;background:yellow;">点上面的DIV才能拖动我</div>
<br>
      <div id="_divForDD_panel"></div>
*/
// 让id为_divForDD的div能被拖动
   new Ext.dd.DDProxy('_divForDD');
   
   // 只能拖动到指定的DIV里面
   var divForDD1 = new Ext.dd.DragSource('_divForDD1', {group:'dd'});
// 拖动后把div插入到容器div里面
   divForDD1.afterDragDrop = function(target, e, id) {
       Ext.get(divForDD1.getEl()).insertBefore(Ext.get(id));
   };
   new Ext.dd.DDTarget('target', 'dd');
   
   // 拖动和触发拖动的DIV分离
   var divForDD3 = new Ext.dd.DD('_divForDD3');
   divForDD3.setOuterHandleElId('_divForDD3_hanld');
   
   
   // 封装一个拖拽类，此代码来源于深入浅出Ext中的代码
   Ext.ux.DDOnTop = function(id, sGroup, config) {
    Ext.ux.DDOnTop.superclass.constructor.apply(this, arguments);
};
Ext.extend(Ext.ux.DDOnTop, Ext.dd.DD, {
    origZ: 0,
    startDrag: function(x, y) {
        var style = this.getEl().style;
        this.origZ = style.zIndex;
        style.zIndex = 999;
    },
    endDrag: function(e) {
        this.getEl().style.zIndex = this.origZ;
    }
});
// 我们new 一个panel，用我们封装的拖拽实现拖拽（可以用panel自带的draggable属性实现）。
var panel = new Ext.Panel({
	renderTo : '_divForDD_panel',
	width : 300,
	height: 100,
	title : '我是可以拖拽的',
	html  : '我没有用自己的属性draggable进行拖拽'
});
// new Ext.dd.DD(panel);
// 用封装的拖拽
new Ext.ux.DDOnTop('_divForDD_panel');