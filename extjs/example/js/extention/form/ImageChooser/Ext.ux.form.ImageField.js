Ext.namespace('Ext.ux.form');

/**
 * @class Ext.form.ImageField
 * @extends Ext.BoxComponent
 * Class for form image fields that provides event handling value handling and other functionality.
 * @constructor
 * Creates a new ImageField
 * @param {Object} config Configuration options
 */
Ext.ux.form.ImageField = Ext.extend(Ext.BoxComponent, {

    /**
     * @cfg {String} fieldLabel The label text to display next to this field (defaults to '')
     */
    /**
     * @cfg {String} labelStyle A CSS style specification to apply directly to this field's label (defaults to the
     * container's labelStyle value if set, or ''). For example, <code>labelStyle: 'font-weight:bold;'</code>.
     */
    /**
     * @cfg {String} labelSeparator The standard separator to display after the text of each form label (defaults
     * to the value of {@link Ext.layout.FormLayout#labelSeparator}, which is a colon ':' by default).  To display
     * no separator for this field's label specify empty string ''.
     */
    /**
     * @cfg {Boolean} hideLabel True to completely hide the label element (defaults to false)
     */
    /**
     * @cfg {String} clearCls The CSS class used to provide field clearing (defaults to 'x-form-clear-left')
     */
    /**
     * @cfg {String} itemCls An additional CSS class to apply to the wrapper's form item element of this field (defaults 
     * to the container's itemCls value if set, or '').  Since it is applied to the item wrapper, it allows you to write 
     * standard CSS rules that can apply to the field, the label (if specified) or any other element within the markup for 
     * the field. NOTE: this will not have any effect on fields that are not part of a form.
     */
    /**
     * @cfg {String} inputType The type attribute for this field -- this is required for all form fields
     * to render properly in a FormLayout as it does check this value to determine whether of not to render it.
     * 'image' is the default and only value for this property.
     */
	inputType : 'image',
    /**
     * @cfg {Mixed} value A value to initialize this field with (defaults to '').
     */
	value : '',
    /**
     * @cfg {String} name The field's HTML name attribute (defaults to "").
     */
	name : '',
    /**
     * @cfg {String} cls A custom CSS class to apply to the field's underlying element (defaults to "").
     */
    /**
     * @cfg {String} invalidClass The CSS class to use when marking a field invalid (defaults to "x-form-imagefield-invalid")
     */
    invalidClass : "x-form-imagefield-invalid",
    /**
     * @cfg {String} invalidText The error text to use when marking a field invalid and no message is provided
     * (defaults to "The value in this field is invalid")
     */
    invalidText : "This field is required",
    /**
     * @cfg {String/Boolean} validationEvent The event that should initiate field validation. Set to false to disable
      automatic validation (defaults to false).
     */
    validationEvent : 'change',
    /**
     * @cfg {Number} validationDelay The length of time in milliseconds after a validation event occurs until validation
     * is initiated (defaults to 250)
     */
    validationDelay : 250,
    /**
     * @cfg {String/Object} autoCreate A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "20", autocomplete: "off"})
     */
    defaultAutoCreate : {tag: "div"},
    /**
     * @cfg {String} fieldClass The default CSS class for the field (defaults to "x-form-image")
     */
    fieldClass : "x-form-imagefield",
    /**
     * @cfg {String} msgTarget The location where error text should display.  Should be one of the following values
     * (defaults to 'qtip'):
     */
    msgTarget : 'qtip',
    /**
     * @cfg {String} msgFx <b>Experimental</b> The effect used when displaying a validation message under the field
     * (defaults to 'normal').
     */
    msgFx : 'normal',
    /**
     * @cfg {Boolean} disabled True to disable the field (defaults to false).
     */
    disabled : false,
    /**
     * @cfg {Boolean} optional True allow the image field to not have a value (value == '')
     * Set this to true when the image field is not required to be specified
     * (defaults to false)
     */
	optional : false,
    /**
     * @cfg {Boolean} hideTrigger True to hide the trigger element and display only the base text field (defaults to false)
     */
    hideTrigger : false,
	/**
     * @cfg {String} triggerClass A CSS class to apply to the trigger
     */
	triggerClass : '',
	/**
     * @cfg {String} defaultImage The default image to display in the field (default to Ext.BLANK_IMAGE_URL)
     */
    defaultImage: Ext.BLANK_IMAGE_URL,	
	/**
     * @cfg {Number} browserWidth The width of the image browser window
     */
	browserWidth: 300,
	/**
     * @cfg {Number} browserHeight The height of the image browser window
     */
    browserHeight: 300,
	/**
     * @cfg {String} browserTitle The title of the image browser window
     */
    browserTitle: '请选择图片',
    /**
     * @cfg {Boolean} alwaysLoadStore True reload the data store every time the image browser opens
     */
    alwaysLoadStore: false,
    /**
     * @cfg {Object} windowConfig Additional configuration for the image browser window
     */	
	windowConfig: {},	
    /**
     * @cfg {Object} view The {Ext.DataView} of the image browser
     */	
	view: {},
	/**
     * @cfg {String} valueField The data store field to return as the field's value
     */	
	valueField : 'url',
	
	// Private
    isStoreLoaded: false,
    // private
    isFormField : true,
	// Private
    selections: [],
    // Private
    selectedRecords: [],
    
	// private
	initComponent : function(){
        Ext.ux.form.ImageField.superclass.initComponent.call(this);
        this.addEvents(
            /**
             * @event change
             * Fires if the field value has changed.
             * @param {Ext.ux.form.ImageField} this
             * @param {String} newValue The new value
             * @param {String} oldValue The original value
             */
            'change',
            /**
             * @event invalid
             * Fires after the field has been marked as invalid.
             * @param {Ext.ux.form.ImageField} this
             * @param {String} msg The validation message
             */
            'invalid',
            /**
             * @event valid
             * Fires after the field has been validated with no errors.
             * @param {Ext.ux.form.ImageField} this
             */
            'valid',
			/**
             * @event expand
             * Fires when the image browser is expanded
             * @param {Ext.ux.form.ImageField} this
             * @param {Ext.DataView} view The Ext.DataView of the image browser
             */
            'expand',
            /**
             * @event collapse
             * Fires when the image browser is collapsed
             * @param {Ext.ux.form.ImageField} this
             * @param {Ext.DataView} view The Ext.DataView of the image browser
             */
            'collapse'
        );
		// if store was auto loaded, mark it as loaded
        if (this.view.store.autoLoad) {
            this.isStoreLoaded = true;
        }
    },

    /**
     * Returns the name attribute of the field if available
     * @return {String} name The field name
     */
    getName: function(){
         return this.rendered && this.hiddenField.dom.name ? this.hiddenField.dom.name : '';
    },
	
    getSelectedRecords : function(){
		this.selections = this.view.getSelectedIndexes();
		this.selectedRecords = this.view.getSelectedRecords();
        return this.selectedRecords;
    },	

    // private
    onRender : function(ct, position){
        Ext.ux.form.ImageField.superclass.onRender.call(this, ct, position);
        if(!this.el){
            var cfg = this.getAutoCreate();
            this.el = ct.createChild(cfg, position);
        }
		this.imageEl = this.el.insertFirst({tag: 'img', src: this.defaultImage });
		// create hidden field to hold the value for the image field
		this.hiddenField = this.imageEl.insertSibling({tag:'input', type:'hidden', name: this.name, id: this.id + '-hidden'}, 'before');
        this.el.addClass([this.fieldClass, this.cls]);
		this.imageEl.addClass(this.fieldClass + '-image');
        this.initValue();
		// wrap it up
		this.wrap = this.imageEl.wrap({cls: "x-form-field-wrap"});
		this.trigger = this.wrap.createChild({tag: "img", src: Ext.BLANK_IMAGE_URL, cls: "x-form-trigger"});
        if(this.hideTrigger){
            this.trigger.setDisplayed(false);
        }
		this.initTrigger();
    },
	
    // private
    initTrigger : function(){
        this.trigger.on("click", this.onTriggerClick, this, {preventDefault:true});
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    // private
    onDestroy : function(){
        if(this.trigger){
            this.trigger.removeAllListeners();
            this.trigger.remove();
        }
        this.wrap.remove();
        Ext.ux.form.ImageField.superclass.onDestroy.call(this);
    },
	
    // private
    onDisable : function(){
		this.wrap.addClass('x-item-disabled');
		this.hiddenField.dom.disabled = true;
    },
	
    // private
    onEnable : function(){
        this.wrap.removeClass('x-item-disabled');
		this.hiddenField.dom.disabled = false;
    },
	
    // private
    onShow : function(){
        this.wrap.dom.style.display = '';
        this.wrap.dom.style.visibility = 'visible';
    },
	
    // private
    onHide : function(){
        this.wrap.dom.style.display = 'none';
    },
	
	// private
    onSelect: function(){
		var selectedRecords = '';
		var returnValue = (this.getSelectedRecords().length > 0) ? this.selectedRecords[0].get(this.valueField) : '';
		if (returnValue !== this.value) {
			this.setValue(returnValue);
		}
        this.window.hide();
		this.fireEvent('collapse', this, this.view);
    },	
	
    /**
     * The function that should handle the trigger's click event.  This method does nothing by default until overridden
     * by an implementing function.
     * @method
     * @param {EventObject} e
     */
    onTriggerClick : function(e){
		if(this.disabled){
            return;
        }
        // load the data store
        if (!this.isStoreLoaded) {
            this.view.store.load();
            this.isStoreLoaded = true;
        } else if (this.alwaysLoadStore === true) {
            this.view.store.reload();
        }
		// setup window with forced config
		this.windowConfig = Ext.apply(this.windowConfig, {
			title: this.browserTitle,
			width: this.browserWidth,
			height: this.browserHeight,
			draggable: false,
			resizable: false,
			closable: false,
			autoScroll: true,
			layout: 'fit',
			bbar: [{
				text: '选择',
				handler: this.onSelect,
				scope: this
			},'->',{
				text: '取消',
				handler: function(){
					this.view.clearSelections();
					this.window.hide();
					this.fireEvent('collapse', this, this.view);
				}, scope: this
			}],
			items: this.view
		},{
			shadow: false,
			frame: true
		});
		// create the image browser window
        if(!this.window){
            this.window = new Ext.Window(this.windowConfig);
            this.window.setPagePosition(this.trigger.getRight(), this.trigger.getTop());
            this.view.on('dblclick', this.onSelect, this);
        }
		// show the image browser window
        this.window.show();
		this.fireEvent('expand', this, this.view);
	},
	
    // private
    initValue : function(){
        if(this.value !== undefined){
            this.hiddenField.dom.value = (this.value === null || this.value === undefined ? '' : this.value);
        } else {
			this.hiddenField.dom.value = '';
		}
    },

    /**
     * Returns true if this field has been changed since it was originally loaded and is not disabled.
     */
    isDirty : function() {
        if(this.disabled) {
            return false;
        }
        return String(this.getValue()) !== String(this.originalValue);
    },

    // private
    afterRender : function(){
        Ext.ux.form.ImageField.superclass.afterRender.call(this);
        this.initEvents();
    },

    /**
     * Resets the current field value to the originally loaded value and clears any validation messages
     */
    reset : function(){
        this.setValue(this.originalValue);
        this.clearInvalid();
    },

    // private
    initEvents : function(){
		if(this.validationEvent !== false){
            this.el.on(this.validationEvent, this.validate, this, {buffer: this.validationDelay});
        }
        // reference to original value for reset
        this.originalValue = this.getValue();
    },


    /**
     * Returns whether or not the field value is currently valid
     * @param {Boolean} preventMark True to disable marking the field invalid
     * @return {Boolean} True if the value is valid, else false
     */
    isValid : function(preventMark){
        if(this.disabled){
            return true;
        }
        var restore = this.preventMark;
        this.preventMark = preventMark === true;
        var v = this.validateValue(this.processValue(this.getRawValue()));
        this.preventMark = restore;
        return v;
    },

    /**
     * Validates the field value
     * @return {Boolean} True if the value is valid, else false
     */
    validate : function(){
        if(this.disabled || this.validateValue(this.processValue(this.getRawValue()))){
            this.clearInvalid();
            return true;
        }
        return false;
    },

    // protected - should be overridden by subclasses if necessary to prepare raw values for validation
    processValue : function(value){
        return value;
    },

    // private
    validateValue : function(value){
		if (this.hiddenField.dom.value === '') {
			this.markInvalid();
			return false;
		} else {
			return true;
		}
    },

    /**
     * Mark this field as invalid, using {@link #msgTarget} to determine how to display the error and 
     * applying {@link #invalidClass} to the field's element.
     * @param {String} msg (optional) The validation message (defaults to {@link #invalidText})
     */
    markInvalid : function(msg){
        if(!this.rendered || this.preventMark){ // not rendered
            return;
        }
        this.el.addClass(this.invalidClass);
        msg = msg || this.invalidText;
        switch(this.msgTarget){
            case 'qtip':
                this.el.dom.qtip = msg;
                this.el.dom.qclass = 'x-form-invalid-tip';
                if(Ext.QuickTips){ // fix for floating editors interacting with DND
                    Ext.QuickTips.enable();
                }
                break;
            case 'title':
                this.el.dom.title = msg;
                break;
            case 'under':
                if(!this.errorEl){
                    var elp = this.getErrorCt();
                    this.errorEl = elp.createChild({cls:'x-form-invalid-msg'});
                    this.errorEl.setWidth(elp.getWidth(true)-20);
                }
                this.errorEl.update(msg);
                Ext.ux.form.ImageField.msgFx[this.msgFx].show(this.errorEl, this);
                break;
            case 'side':
                if(!this.errorIcon){
                    var elp = this.getErrorCt();
                    this.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
                }
                this.alignErrorIcon();
                this.errorIcon.dom.qtip = msg;
                this.errorIcon.dom.qclass = 'x-form-invalid-tip';
                this.errorIcon.show();
                this.on('resize', this.alignErrorIcon, this);
                break;
            default:
                var t = Ext.getDom(this.msgTarget);
                t.innerHTML = msg;
                t.style.display = this.msgDisplay;
                break;
        }
        this.fireEvent('invalid', this, msg);
    },
    
    // private
    getErrorCt : function(){
        return this.el.findParent('.x-form-element', 5, true) || // use form element wrap if available
            this.el.findParent('.x-form-field-wrap', 5, true);   // else direct field wrap
    },

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.el, 'tl-tr', [2, 0]);
    },

    /**
     * Clear any invalid styles/messages for this field
     */
    clearInvalid : function(){
        if(!this.rendered || this.preventMark){ // not rendered
            return;
        }
        this.el.removeClass(this.invalidClass);
        switch(this.msgTarget){
            case 'qtip':
                this.el.dom.qtip = '';
                break;
            case 'title':
                this.el.dom.title = '';
                break;
            case 'under':
                if(this.errorEl){
                    Ext.ux.form.ImageField.msgFx[this.msgFx].hide(this.errorEl, this);
                }
                break;
            case 'side':
                if(this.errorIcon){
                    this.errorIcon.dom.qtip = '';
                    this.errorIcon.hide();
                    this.un('resize', this.alignErrorIcon, this);
                }
                break;
            default:
                var t = Ext.getDom(this.msgTarget);
                t.innerHTML = '';
                t.style.display = 'none';
                break;
        }
        this.fireEvent('valid', this);
    },

    /**
     * Returns the raw data value which may or may not be a valid, defined value.  To return a normalized value see {@link #getValue}.
     * @return {Mixed} value The field value
     */
    getRawValue : function(){
        var v = this.rendered ? this.hiddenField.getValue() : Ext.value(this.value, '');
        return v;
    },

    /**
     * Returns the normalized data value (undefined will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        if(!this.rendered) {
            return this.value;
        }
        var v = this.hiddenField.getValue();
        if(v === undefined){
            v = '';
        }
        return v;
    },

    /**
     * Sets the underlying DOM field's value directly, bypassing validation.  To set the value with validation see {@link #setValue}.
     * @param {Mixed} value The value to set
     */
    setRawValue : function(v){
        return this.hiddenField.dom.value = (v === null || v === undefined ? '' : v);
    },

    /**
     * Sets a data value into the field and validates it.  To set the value directly without validation see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     */
    setValue : function(v){
		var original = this.value;
        this.value = v;
        if(this.rendered){
            this.hiddenField.dom.value = (v === null || v === undefined ? '' : v);
			this.imageEl.dom.src = (v === null || v === undefined ? '' : v);
			this.fireEvent('change', this, original, v);
            this.validate();
        }
    }

});

// anything other than normal should be considered experimental
Ext.ux.form.ImageField.msgFx = {
    normal : {
        show: function(msgEl, f){
            msgEl.setDisplayed('block');
        },

        hide : function(msgEl, f){
            msgEl.setDisplayed(false).update('');
        }
    },

    slide : {
        show: function(msgEl, f){
            msgEl.slideIn('t', {stopFx:true});
        },

        hide : function(msgEl, f){
            msgEl.slideOut('t', {stopFx:true,useDisplay:true});
        }
    },

    slideRight : {
        show: function(msgEl, f){
            msgEl.fixDisplay();
            msgEl.alignTo(f.el, 'tl-tr');
            msgEl.slideIn('l', {stopFx:true});
        },

        hide : function(msgEl, f){
            msgEl.slideOut('l', {stopFx:true,useDisplay:true});
        }
    }
};

Ext.reg('imagefield', Ext.ux.form.ImageField);