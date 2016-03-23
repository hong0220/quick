var MultiComboBox = function() {
	MultiComboBox.superclass.constructor.call(this, {
        width:250,
		store: new Ext.data.SimpleStore({
		    fields: ["name","value"],
		    data:[['中国','cn'],['美国','us'],['英国','en']]}),
		valueField :"value",
		displayField: "name",
		labelSeparator:'：',
		displaySeparator:';',
		valueSeparator:',',
		mode: 'local',
		value:'cn,us',
		forceSelection: true,
		hiddenName:'test',
		editable: true,
		triggerAction: 'all',
		allowBlank:false,
		emptyText:'请选择',
		fieldLabel: '多选下拉框'
	});
};
Ext.extend(MultiComboBox, Ext.form.MultiComboBox);