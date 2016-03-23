Ext.form.MultiSelect = Ext.extend(Ext.DataView, {
    multiSelect: true,
    tpl: new Ext.XTemplate(
		//view的模板
		'<tpl for=".">', '<div class="x-combo-list-item">{text}</div>', '</tpl>')    ,
    style: 'cursor:pointer;overflow:auto',
    cls: 'x-combo-list-inner',
    ctCls: 'x-combo-list',
    overClass: 'x-view-over',
    selectedClass: 'x-combo-selected',
    itemSelector: 'div.x-combo-list-item',
    initComponent: function(){
        Ext.form.MultiSelect.superclass.initComponent.call(this);
    },
    onRender: function(){
        Ext.form.MultiSelect.superclass.onRender.apply(this, arguments);
        var _this = this;
        this.el.dom.onselectstart = function(){
            return false
        } //防止鼠标选择
        new Ext.KeyNav(this.el, {
            "up": function(e){
                var selIndex = _this.getSelectedIndexes()[0] - 1;
                var index = selIndex > -1 ? selIndex : _this.store.getCount() - 1;
                _this.select(index);
            },
            "down": function(e){
                var selIndex = _this.getSelectedIndexes()[0] + 1;
                var index = selIndex == _this.store.getCount() ? 0 : selIndex;
                _this.select(index);
            }
        })
        //定位选中项保证可见
        this.on('selectionchange', function(t, node){ //定位选中项保证可见
            if (!(node = node[0])) 
                return;
            var ct = this.el.dom, barHeight = 0, diff;
            var ctSt = ct.scrollTop, nodeOft = node.offsetTop;
            if (ct.offsetHeight - ct.clientHeight > 5) {
                barHeight = 16;
            }
            var cntPos = [ctSt, ctSt + ct.offsetHeight - barHeight];
            var nodePos = [nodeOft, nodeOft + node.offsetHeight];
            if (nodePos[0] < cntPos[0]) {
                ct.scrollTop = nodeOft;
            }
            if ((diff = nodePos[1] - cntPos[1]) > 0) {
                ct.scrollTop = ctSt + diff + 2;
            }
        });
        //选中第一行
        var selectFirst = function(){
            setTimeout(function(){
                _this.select(0)
            }, 1)
        };
        selectFirst();
        this.store.on('load', selectFirst)
    }
});
