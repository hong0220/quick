var tabWindow1 = new Ext.Window({
    title: "可拖拽Tab例子",
    width: 500,
    height: 300,
    closable: false,
    items: [
        new Ext.ux.panel.DDTabPanel({
	        border : false,
	        defaults: {
		        style: "padding: 5px"
	        },
	        items: [{
		        title: "关雎",
		        html: "关关雎鸠，在河之洲。窈窕淑女，君子好逑。参差荇菜，左右流之。窈窕淑女，寤寐求之。求之不得，寤寐思服。悠哉悠哉，辗转反侧。参差荇菜，左右采之。窈窕淑女，琴瑟友之。参差荇菜，左右□之。窈窕淑女，钟鼓乐之。"
	        },{
		        title: "相思",
		        html: "红豆生南国，春来发几枝？愿君多采撷，此物最相思。"
	        },{
		        title: "卜算子 咏梅",
		        html: "风雨送春归，飞雪迎春到。 忆是县崖百丈冰，犹有花枝俏。俏也不争春，只把春来报。待到山花烂漫时， 她在丛中笑。"
	        }]
        })
    ]
}).show();