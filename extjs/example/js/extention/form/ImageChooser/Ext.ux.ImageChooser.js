/**
 * Ext.ux.ImageChooser Extension Class
 * 
 * @class Ext.ux.ImageChooser
 * @extends Ext.Panel
 * @constructor
 * @param {Object} config Configuration options
 */
Ext.ux.ImageChooser = function(config) {
	this.config = config;
	this.initTemplates();
	this.store = new Ext.data.JsonStore({
		url: this.config.url,
		root: 'images',
		fields: [
			'name', 'url'
		],
		listeners: {
			//'load': {fn:function(){ this.view.select(0); }, scope:this, single:true}
		}
	});
	this.store.load();

	this.view = new Ext.DataView({
		tpl: this.thumbTemplate,
		singleSelect: true,
		overClass:'x-view-over',
		itemSelector: 'div.thumb-wrap',
		emptyText : '<div style="padding:10px;">没有图片，请上传</div>',
		store: this.store,
		listeners: {
			'selectionchange': {fn:this.setHideValue, scope:this, buffer:100},
			'dblclick' : {fn:this.canelSelect, scope:this, buffer:100}
		}
	});
	var cfg = {
		    	id: 'img-chooser-dlg',
		    	layout: 'border',
				border: false,
				items:[{
					id: 'img-chooser-view',
					region: 'center',
					autoScroll: true,
					items: this.view
				}//,{xtype:'textfield',id: this.hideId}
				]
			};
	Ext.apply(cfg, this.config);
	this.hideId = this.config.hideId;
	Ext.ux.ImageChooser.superclass.constructor.call(this, cfg);
	if(this.hideId) this.add({xtype:'hidden',id: this.hideId});
};
// end of Ext.ux.ImageChooser constructor
// extend
Ext.extend(Ext.ux.ImageChooser, Ext.Panel, {
	initTemplates : function(){
		this.thumbTemplate = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="thumb-wrap" id="{name}">',
				'<div class="thumb"><img src="{url}" title="{name}"></div>',
				'</div>',//<span>{shortName}</span>
			'</tpl>'
		);
		this.thumbTemplate.compile();
	},
	setHideValue : function(){
		var selNodes = this.view.getSelectedNodes();
		var hideObj = Ext.getCmp(this.hideId);
		if(selNodes&&selNodes.length>0)
			hideObj.setValue(selNodes[0].id);
	},
	setValue : function(value){
		if(value)
			this.view.select(value);
	},
	canelSelect : function(view,index,node,e){
		view.deselect(index);
		var hideObj = Ext.getCmp(this.hideId);
		hideObj.setValue('');
	}
});