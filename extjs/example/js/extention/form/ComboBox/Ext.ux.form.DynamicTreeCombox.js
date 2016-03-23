Ext.ns("Ext.ux.form");   
Ext.ux.form.DynamicTreeCombox= Ext.extend(Ext.form.ComboBox, {   
    initComponent:function(){   
        Ext.ux.form.DynamicTreeCombox.superclass.initComponent.call(this);   
        this.addEvents('beforeClickNode','afterClickNode');   
        if(!this.tree){   
            this.tree=new Ext.tree.TreePanel({   
                containerScroll:true,   
                rootVisible:false,   
                root:new Ext.tree.AsyncTreeNode()   
            });   
            this.tree.loader=new Ext.tree.TreeLoader(this.loaderConfig||{dataUrl:"",baseAttrs:{}});   
            this.tree.loader.addListener("beforeload",this.beforeLoad,this);   
            this.tree.loader.addListener("load",this.onLoad,this);   
            this.tree.addListener('collapsenode',this.onNodeCollapse,this);   
            this.tree.addListener('expandnode',this.onNodeExpand,this);   
        }   
        var fieldMp={   
            text:"text",   
            qtip:"qtip",   
            parentFuncId:"id",   
            icon:"icon"  
        };   
        if(!this.fieldMapping){   
            this.fieldMapping=fieldMp;   
        }else{   
            Ext.applyIf(this.fieldMapping,fieldMp);   
        }   
    },   
       
    initList:function(){   
        if(!this.list){   
            var cls = 'x-combo-list';   
            this.list = new Ext.Layer({   
                shadow: this.shadow, cls: [cls, this.listClass].join(' '), constrain:false  
            });   
            var lw = this.listWidth || Math.max(this.wrap.getWidth(), this.minListWidth);   
            this.list.setWidth(lw);   
            this.list.swallowEvent('mousewheel');   
            this.innerList = this.list.createChild({cls:cls+'-inner'});   
            this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));   
            this.innerList.setHeight("100%");   
        }   
    },   
       
    doQuery:function(){   
        if(this.expandAll){   
            var loader=this.tree.loader;   
            if(loader.baseAttrs){   
                Ext.apply(loader.baseAttrs,{expanded:this.expandAll});   
            }else{   
                loader.baseAttrs={expanded:this.expandAll};   
            }              
        }   
        if(!this.tree.rendered){   
            this.tree.render(this.innerList);   
            this.tree.addListener("click",this.clickNode,this);   
        }   
        this.expand();   
    },   
       
    beforeLoad:function(loader,node){   
        if(node!=node.getOwnerTree().root){                                                                                                                    
            loader.baseParams.parentFuncId=node.attributes[this.fieldMapping.parentFuncId];                                                                                                                    
        }   
    },   
       
    onLoad:function(loader,node,res){   
        var nodeArr=node.childNodes;   
        for(var i=0,j=nodeArr.length;i<j;i++){   
            if(nodeArr[i].attributes[this.fieldMapping.icon]){   
                nodeArr[i].getUI().getIconEl().src=nodeArr[i].attributes[this.fieldMapping.icon];   
            }   
            nodeArr[i].setText(nodeArr[i].attributes[this.fieldMapping.text]);   
            nodeArr[i].ui.textNode.setAttribute("qtip", nodeArr[i].attributes[this.fieldMapping.qtip]);   
        }      
    },   
       
    clickNode:function(node){   
        if(this.fireEvent('beforeClickNode',this,node)){   
            this.setValue(node.attributes[this.displayField]);   
        }   
        this.fireEvent("afterClickNode",this,node);        
        this.collapse();   
    },   
       
    onNodeCollapse:function(node){   
        this.list.setHeight(this.tree.getEl().getHeight()+2);   
    },   
       
    onNodeExpand:function(node){   
        this.list.setHeight(this.tree.getEl().getHeight()+2);   
    },   
       
    onDestroy:function(){   
        if(this.view){   
            this.view.el.removeAllListeners();   
            this.view.el.remove();   
            this.view.purgeListeners();   
        }   
        if(this.tree.loader){   
            this.tree.loader.purgeListeners();   
        }   
        if(this.tree){   
            this.tree.el.removeAllListerers();   
            this.tree.el.remove();   
            this.tree.purgeListeners();   
        }   
        if(this.innerList){   
            this.innerList.destroy();   
        }   
        if(this.list){   
            this.list.destroy();   
        }   
        Ext.form.ComboBox.superclass.onDestroy.call(this);   
    }   
});   
  
Ext.reg("treecombox",Ext.ux.form.DynamicTreeCombox); 