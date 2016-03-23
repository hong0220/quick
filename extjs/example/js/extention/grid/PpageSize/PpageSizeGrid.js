/**
 * @author Andrei
 */
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL="../../../../../resources/images/default/s.gif";
    var ds = new Ext.data.Store({
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: 'gridData.php'
        }),

        // create reader that reads the Topic records
        reader: new Ext.data.JsonReader({
            root         : 'data',
            totalProperty: 'totalCount'
        }, [
        	'title', 'author', 'number', 'publish',
            {name: 'count', type: 'int'},
            {name: 'publishDate', mapping: 'publishDate'},
            'dynasty', 'content']
        ),
        remoteSort: true
    });
    //ds.setDefaultSort('publishDate', 'desc');

    // pluggable renders
    function renderTopic(value, p, record){
        return String.format(
                '<b><a href="#" target="_blank">{0}</a></b>--<a href="#" target="_blank">{1}</a>',
                value, record.data.publish);
    }
    function renderLast(value, p, r){
        return String.format('{0}<br/>by {1}', value, r.data['author']);
    }

    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store
    var cm = new Ext.grid.ColumnModel([{
	   header   : "标题",
	   dataIndex: 'title',
	   width    : 420,
	   renderer : renderTopic
	},{
	   header   : "作者",
	   dataIndex: 'author',
	   width    : 100,
	   hidden   : true
	},{
	   header   : "书号",
	   dataIndex: 'number',
	   width    : 70,
	   align    : 'right'
	},{
	   id       : 'publishDate',
	   header   : "发布时间",
	   dataIndex: 'publishDate',
	   width    : 150,
	   renderer : renderLast
	}]);
    cm.defaultSortable = true;

    var grid = new Ext.grid.GridPanel({
        el:'ppageSizeGrid',
        width:900,
        height:200,
        store: ds,
        cm: cm,
        trackMouseOver:false,
        sm: new Ext.grid.RowSelectionModel({selectRow:Ext.emptyFn}),
        loadMask: true,
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:true,
            getRowClass : function(record, rowIndex, p, ds){
                if(this.showPreview){
                    p.body = '<p>'+record.data.content+'</p>';
                    return 'x-grid3-row-expanded';
                }
                return 'x-grid3-row-collapsed';
            }
        },
        bbar: new Ext.PagingToolbar({
            plugins:new Ext.ux.Andrie.pPageSize(),
            pageSize: 20,
            store: ds,
            displayInfo: true,
            displayMsg: '显示第{0} - {1} 条数据，共 {2} 条',
            emptyMsg: "没有数据",
            items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: toggleDetails
            }]
        })
    });

    // render it
    grid.render();

    // trigger the data store load
    ds.load({params:{start:0, limit:2}});

    function toggleDetails(btn, pressed){
        var view = grid.getView();
        view.showPreview = pressed;
        view.refresh();
    }
    
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});