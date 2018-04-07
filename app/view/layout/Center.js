/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
Ext.define('Application.view.layout.Center', {
   	extend: 'Ext.tab.Panel',
    alias: 'widget.layout.center',
    itemId: 'TabPanel',
	id:'id_layout_center',

	tools: [{
        type: 'refresh',
        handler: function() {
            var tabContent = this.up('tabpanel').getActiveTab().items.items[0];
            tabContent.el.dom.contentWindow.location.reload();
        }
		
	}],
	
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
			items:[

			]
        });
        me.callParent( arguments );



        var datar = new Array();
        datar["id"]='m0';
        datar["name"] = 'Home';
        datar["leaf"] = true;
        datar["readOnly"] = true;
        me.showModule(datar);

    },
	
	showModule: function(module) {

        var me = this;
        var moduleTab = me.queryById(me.id + 'tabmod' + module.id);
        if (moduleTab) {
            me.setActiveTab(moduleTab);
        } else {

            	moduleTab = Ext.create('Ext.panel.Panel', {
                id: me.id + 'tabmod' + module.id,
                closable: true,
                title: module.name,



				minWidth: window.innerWidth - 215,
				minHeight:window.innerHeight - 160,
                //    plugins: Ext.create('Ext.ux.TabReorderer'),
                // autoHeight: true,
                    //autoWidth: true,

                layout: 'fit',
                    resizable:{
                        pinned:true,
                        dynamic:true
                    },
                items: [{
				
                   xtype: 'component',
                   autoEl: {
                      tag: 'iframe',
                      src: 'http://localhost/example/app/module/'+module.id+'.php'
                    }
				}]
            });
			
			if(module.id!=""){

                var addIndex = me.items.length -1;
                me.insert(addIndex,moduleTab);
               	//me.add(moduleTab);
            	me.setActiveTab(moduleTab);
			}
        }
    },

});


