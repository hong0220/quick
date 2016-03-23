/*global Ext*/
Ext.namespace('Ext.ux.panel');
/**
 * <p>A tab panel which supports drag and drop behaviour for tabs. Usage and configuration are identical to {@link Ext.TabPanel}, with the sole exception of two extra configuration options to adjust the drop arrow indicator position.</p>
 * <p>This extension can also be created using the <b>ddtabpanel</b> xtype.<br/>&nbsp;</p>
 * <p>Based on the code of <a href="http://extjs.com/forum/member.php?u=22731">thommy</a> and <a href="http://extjs.com/forum/member.php?u=37284">rizjoj</a> in the topic <a href="http://extjs.com/forum/showthread.php?t=23264">Draggable Panel in a TabPanel</a>.</p>
 * <p>Demo link: <a href="http://extjs-ux.org/repo/authors/Matti/trunk/Ext/ux/panel/DDTabPanel/demo.html">http://extjs-ux.org/repo/authors/Matti/trunk/Ext/ux/panel/DDTabPanel/demo.html</a>
 * <br />Forum thread: <a href="http://extjs.com/forum/showthread.php?p=264712">http://extjs.com/forum/showthread.php?p=264712</a><br/>&nbsp;</p>
 * <b>CSS Styles:</b>
 * <pre><code>.dd-arrow-down.dd-arrow-down-invisible {
	display: none;
	visibility: hidden;
}

.dd-arrow-down {
	background-image: url( &lt;your_down_arrow_image&gt; );
	display: block;
	visibility: visible;
	z-index: 20000;
	position: absolute;
	width: 16px;
	height: 16px;
	top: 0;
	left: 0;
}</code></pre>
 * <br /><b>Example Usage:</b>
 * <pre><code>var tabs = new Ext.ux.panel.DDTabPanel({
	renderTo: Ext.getBody(),
	items: [{
		title: 'Tab 1',
		html: 'A simple tab'
	},{
		title: 'Tab 2',
		html: 'Another one'
	}]
});</code></pre>
 * @class Ext.ux.panel.DDTabPanel
 * @extends Ext.TabPanel
 * @author Original by <a href="http://extjs.com/forum/member.php?u=22731">thommy</a> and <a href="http://extjs.com/forum/member.php?u=37284">rizjoj</a><br />Published and polished by: Mattias Buelens (<a href="http://extjs.com/forum/member.php?u=41421">Matti</a>)
 * @license Licensed under the terms of the Open Source <a href="http://www.gnu.org/licenses/lgpl.html">LGPL 3.0 license</a>. Commercial use is permitted to the extent that the code/component(s) do NOT become part of another Open Source or Commercially licensed development library or toolkit without explicit permission. 
 * @version 1.0.2 (Dec 18, 2008)
 */
Ext.ux.panel.DDTabPanel = Ext.extend(Ext.TabPanel, {
	/**
	 * @cfg {Number} arrowOffsetX
	 * The horizontal offset for the drop arrow indicator, in pixels (defaults to -9).
	 */
	arrowOffsetX: -9,
	/**
	 * @cfg {Number} arrowOffsetY
	 * The vertical offset for the drop arrow indicator, in pixels (defaults to -8).
	 */
	arrowOffsetY: -8,

	// Overwritten: assign the drag and drop group id
	/** @private */
	initComponent: function() {
		Ext.ux.panel.DDTabPanel.superclass.initComponent.call(this);
		this.ddGroupId = 'dd-tabpanel-group-' + Ext.ux.panel.DDTabPanel.superclass.getId.call(this);
	},

	// Overwritten: declare the tab panel as a drop target
	/** @private */
	initEvents: function(){
		Ext.ux.panel.DDTabPanel.superclass.initEvents.call(this);
		// Create a drop target for this tab panel
		var tabsDDGroup = this.ddGroupId;
		this.dd = new Ext.ux.panel.DDTabPanel.DropTarget(this, {
			ddGroup: tabsDDGroup
		});
		// Create a drop arrow indicator
		this.arrow = Ext.DomHelper.append(
			Ext.getBody(),
			'<div class="dd-arrow-down dd-arrow-down-invisible"></div>',
			true
		);
	},

	// Overwritten: init the drag source after (!) rendering the tab
	/** @private */
	initTab: function(tab, index){
		Ext.ux.panel.DDTabPanel.superclass.initTab.call(this, tab, index);
		// Set the initial tab position
		tab.position = (index + 1) * 2; // 2, 4, 6, 8, ... (2n)
		tab.on('render', function(tab){
			// Make this tab a drag source
			var id = this.id + '__' + tab.id;
			var tabsDDGroup = this.ddGroupId;
			tab.ds = new Ext.dd.DragSource(id, {
				ddGroup: tabsDDGroup,
				dropEl: tab,
				dropElHeader: Ext.get(id, true)
			});
			// Activate this tab before starting the drag action
			tab.ds.beforeDragEnter = function(target, event, id){
				target.tabpanel.activate(this.dropEl);
			};
			// Activate this tab on mouse down
			// Fixed bug which prevents a tab from being activated by clicking it
			tab.ds.onMouseDown = (function(event){
				this.activate(tab);
			}).createDelegate(this);
		}, this);
		// Force the tab to render
		tab.show();
	}
});

// Ext.ux.panel.DDTabPanel.DropTarget
// Implements the drop behavior of the tab panel
/** @private */
Ext.ux.panel.DDTabPanel.DropTarget = Ext.extend(Ext.dd.DropTarget, {
	constructor: function(tabpanel, config){
		this.tabpanel = tabpanel;
		// The drop target is the header area of the given tab panel
		var target = Ext.select('div.x-tab-panel-header', false, tabpanel.getEl().dom).elements[0];
		Ext.ux.panel.DDTabPanel.DropTarget.superclass.constructor.call(this, target, config);
	},

	notifyOver: function(dd, e, data){
		var tabs = this.tabpanel.items;
		var last = tabs.length;

		if (last < 2) {
			return 'x-dd-drop-nodrop';
		}

		var larrow = this.tabpanel.arrow;

		// Getting the absolute X,Y coordinates by encapsulating the dom
		// element into an Ext.Element and using getX() and getY() methods.
		var panelDom = new Ext.Element(this.el.dom);
		var tabPanelLeft = panelDom.getX();
		var tabPanelTop = panelDom.getY();

		var left;
		var eventPosX = e.getPageX();

		for (var i = 0; i < last; i++) {
			var tab = tabs.itemAt(i);
			// Is this tab target of the drop operation?
			var tabDom = tab.ds.dropElHeader.dom;
			// Getting the absolute X,Y coordinates by encapsulating the dom
			// element into an Ext.Element and using getX() and getY() methods.
			var tabLeft = new Ext.Element(tabDom).getX();
			var tabMiddle = tabLeft + tabDom.clientWidth / 2;

			if (eventPosX <= tabMiddle) {
				left = tabLeft;
				break;
			}
		}

		if (typeof(left) == 'undefined') {
			var lastTab = tabs.itemAt(last - 1);
			var dom = lastTab.ds.dropElHeader.dom;
			left = (tabPanelLeft + dom.offsetLeft + dom.clientWidth) + 3;
		}

		larrow.setTop(tabPanelTop + this.tabpanel.arrowOffsetY);
		larrow.setLeft(left + this.tabpanel.arrowOffsetX);
		larrow.removeClass('dd-arrow-down-invisible');

		return 'x-dd-drop-ok';
	},

	notifyDrop: function(dd, e, data){
		this.tabpanel.arrow.addClass('dd-arrow-down-invisible');

		var tabPanelOffset = this.tabpanel.el.dom.offsetLeft;
		var tabs = this.tabpanel.items;

		// At this point the items in 'tabs' are sorted by their positions
		var tabDom = new Ext.Element(this.tabpanel.el.dom);
		// Getting the absolute X,Y coordinates by encapsulating the dom
		// element into an Ext.Element and using getX() and getY() methods.
		var eventPosX = e.getPageX() - tabDom.getX();

		var last = tabs.length;
		var newPos = last;
		dd.dropEl.position = last * 2 + 1; // default: 'behind the rest'

		for (var i = 0; i < last; i++) {
			var tab = tabs.itemAt(i);
			// Is this tab target of the drop operation?
			var dom = tab.ds.dropElHeader.dom;
			var tabLeft = tabPanelOffset + dom.offsetLeft;
			var tabRight = tabLeft + dom.clientWidth;
			var tabMiddle = tabLeft + dom.clientWidth / 2;

			if (eventPosX <= tabRight) {
				dd.dropEl.position = eventPosX > tabMiddle ? tab.position + 1 : tab.position - 1;
				newPos = eventPosX > tabMiddle ? i + 1 : i;
				break;
			}
		}

		dd.proxy.hide();

		dd.el.dom.parentNode.insertBefore(dd.el.dom, dd.el.dom.parentNode.childNodes[newPos]);

		// Sort tabs by their actual position
		tabs.sort('ASC', function(a, b){
			return a.position - b.position;
		});
		// Adjust tab position values
		tabs.each(function(tab, index){
			tab.position = (index + 1) * 2;
		});

		return true;
	},

	notifyOut: function(dd, e, data) {
		this.tabpanel.arrow.addClass('dd-arrow-down-invisible');
	}
});

Ext.reg('ddtabpanel', Ext.ux.panel.DDTabPanel);