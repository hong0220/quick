IconCombobox = function (){
	IconCombobox.superclass.constructor.call(this, {
		fieldLabel:'胸章',
		labelWidth  : 73,
		width: 250,
		store: new Ext.data.SimpleStore({
			fields: ['code', 'name', 'flag'],
			data: [
			    ['start1', '勇士胸章', 'images/award_star_gold_1.png'],
			    ['start2', '智慧胸章', 'ux-flag-start2'],
			    ['start3', '魅力胸章', 'ux-flag-start3']
			]
		}),
		valueField: 'code',
		displayField: 'name',
		iconClsField: 'flag',
		triggerAction: 'all',
		editable: false,
		mode: 'local'
	});
}
Ext.extend(IconCombobox, Ext.ux.IconCombo);