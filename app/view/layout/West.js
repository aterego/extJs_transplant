/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
Ext.Loader.setConfig({
            enabled: true,
            paths: {
                'Ext.mod': 'app',
            }
        });



Ext.define('Application.view.layout.West', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.west',
    region: 'west',
    title: 'Menu',
    split: true,
    minWidth: 210,
    width: 210,
    initComponent: function(){

        var me = this;
		var storeMenu = Ext.create('Ext.data.TreeStore', {
            fields: [{
                name: 'id',
                type: 'string'
            }, {
                name: 'name',
                type: 'string'
            }],
            root: {
                text: '.',
                children: [
                    {name: 'რეგისტრატურები', children: [
                       {id: 'm1', name: 'ღვიძლგადანერგილები LivTx', leaf: true, readOnly:true},
                       {id: 'm2', name: 'თირკმელგადანერგილები KdTx', leaf: true, readOnly:true},
                       {id: 'm3', name: 'გულგადანერგილები HTx', leaf: true, readOnly:true},
                       {id: 'm4', name: 'რქოვანაგადანერგილები CorTx', leaf: true, readOnly:true},
                       {id: 'm5', name: 'ძვლისტვინგადანერგილები BnTx', leaf: true, readOnly:true},
                         {leaf: true, icon: 'none'} ,
                       {id: 'md1', name: 'დონორები ღვიძლი LDLiv', leaf: true, readOnly:true},
                       {id: 'md2', name: 'დონორები თირკმელი LDKd', leaf: true, readOnly:true},
                       //{id: 'md3', name: 'დონორები გული LDHTx', leaf: true, readOnly:true},
                       //{id: 'md4', name: 'დონორები რქოვანა LDCrn', leaf: true, readOnly:true},
                          {leaf: true, icon: 'none'} ,
                        {id: 'ma1', name: 'არქივი ღვიძლი ArchLiv', leaf: true, readOnly:true},
                        {id: 'ma2', name: 'არქივი თირკმელი ArchKd', leaf: true, readOnly:true},
                        {id: 'ma3', name: 'არქივი გული ArchHTx', leaf: true, readOnly:true},
                    ]},
                    /*
                    {name: 'REPORT', children: [
                        {id: 'm2', name: 'Report Sales', leaf: true},
                        {id: 'm3', name: 'Report Product', leaf: true}
                    ]},
					{name:'CHART', children:[
						{id:'m4',name:'Sales Chart', leaf:true},
					]},
                    {name: 'MASTER', children: [
                        {id: 'm5', name: 'Products', leaf: true}
                    ]},
                    */
					{name: 'მომხმარებლის მართვა ', children:[
						{id:'m6', name:'Group & Privilege',leaf:true},
						{id:'m7', name:'User',leaf:true}
					]}
                    ,
                    //iconCls: 'x-search'
                    {id:'m111', name:'ძიება', leaf:false,  allowChildren : false,  expanded: true, cls: 'xxx', icon: 'resources/images/search.png'  }
                ]
            }
        });

        var win;



        Ext.applyIf(me,{
			xtype:'panel',
			height: 450,
			id:'id_panel_menu',
			width:250,
			layout: {
        		align: 'stretch',
        		type: 'vbox'
    		},
            items: [
                {
                    xtype: 'panel',
                    flex: 0,
                    frame: false,
                    bodyStyle: 'background-color:#dfe8f5;',
                    defaults: {
                        anchor: '80%',
                        margin: '10 0 10 30'
                    },
                    layout: {
                        type: 'anchor'
                    },
                    collapsible: false,

                    items: [
                        {
                            xtype: 'button',
                            text: 'ახალი ანკეტა',
                            icon:'resources/images/form_add.png',
                            handler:function(button,event) {
                                //me.initMenu({id: 'm1', name: 'ღვიძლგადანერგილები Liv', leaf: true, readOnly:true});
                                /*
                                 new Ext.Window({
                                 title : "About us",
                                 width : 800,
                                 height: 400,
                                 layout : 'fit',
                                 items : [{
                                 xtype : "component",
                                 autoEl : {
                                 tag : "iframe",
                                 src : "app/module/mForm.php"
                                 }
                                 }]
                                 }).show();
                                 */



                                if (!win && acc!='r') {
                                     win = Ext.create('widget.window', {
                                        title: 'ახალი ანკეტა',
                                        header: {
                                            titlePosition: 2,
                                            titleAlign: 'center'
                                        },
                                        closable: true,
                                        closeAction: 'hide',
                                        maximizable: true,
                                        animateTarget: button,
                                        width: 700,
                                        minWidth: 550,
                                        height: 550,


                                        //tools: [{type: 'pin'}],
                                        layout: {
                                            type: 'border',
                                            padding: 5
                                        },
                                        items: [{
                                            xtype: "component",
                                            autoEl: {
                                                frameborder: 0,
                                                tag: "iframe",
                                                src: "app/module/mForm.php"
                                            }
                                        }]
                                    });

                                    win.show();
                                    win.on('close', function() {
                                        win = null;
                                    }, this);

                                }
                            }
                        ,
                         listeners: {



                               beforerender: function(btn) {


                                   var acc = '';

                                   Ext.Ajax.request({
                                       url: 'server/menu/service.php?act=Acc',
                                       method: 'POST',
                                       success: function (response) {
                                           var result = Ext.JSON.decode(response.responseText);
                                           acc = result;
                                           if(acc == 'r') {
                                               btn.hide();
                                           }

                                       },
                                       failure: function (response) {
                                           var result = Ext.JSON.decode(response.responseText);
                                           acc = result;
                                       }

                                   });




                                }

                          }
                        }

                    ]
                },
                {
                    xtype: 'treepanel',
                    width: 500,
                    border: false,
                    height: 350,
                    useArrows: true,
                    rootVisible: false,
                    store: storeMenu,
                    multiSelect: false,
                    flex: 2,
                    id: 'id_tree_menu',
                    enableColumnMove: false,
                    /*
                    tbar: [{
                    }],
                    */
                    columns: [
                        {
                            xtype: 'treecolumn',
                            minWidth: 200,
                            dataIndex: 'name',
                            sortable: false,
                            flex: 1
                        }
                    ],
                    listeners: {
                        itemclick: function(comp, record, item, index, e, eOpts) {
                            if (record.data.id) {
								me.initMenu(record);
                            }
                        }
                    }
                },
                {
                    xtype: 'splitter',
                    border: ''
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    frame: true,
                    defaults: {
                        anchor: '90%',
                        margin: '10 10 0 20'
                    },
                    layout: {
                        type: 'anchor'
                    },
                    collapsible: true,
                    title: 'Tools and Settings',
                    items: [


                        {
                            xtype: 'button',
                            text: 'შეცვალეთ პაროლი',
							icon:'resources/images/password.png',
                            handler:function(button,event){
                               

                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                me.expand();
								 Ext.Msg.show({
                                    title: 'დადასტურება',
                                    msg: 'are you sure to exit the application?',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn) {
                                        if(btn=='yes'){
											Ext.Ajax.request({
											url: 'server/logout/service.php',
                            				method: 'POST',
											success: function (response) {
								 			var result = Ext.JSON.decode(response.responseText);
								 
								 			if (result.success) {
									 			setTimeout(function(){
												window.location="index.php";	
											},700);
								 		}else{
									  		console.log('Failed to exit the application');
								 		}
									},
									failure: function (response) {
                                   		console.log('Failed : '+ response);
                            		}				 
							
						 		});
								}
                                }
                                });
                               
                            },
                            text: 'Logout',
							icon:'resources/images/logout.png',
                        }
                    ]
                }
            ]

    });
        me.callParent( arguments );
    },
	
	
	initMenu:function(record){
		var me = this;
		var px = [];
        var data = [];

		Ext.Ajax.request({
		url: 'server/menu/service.php?act=View',
           method: 'POST',
		   params:{
				param_id:record.data.id
			},
		   success: function (response) {
			   var result = Ext.JSON.decode(response.responseText);
				if(result==0){
					Ext.Msg.show({
                          title: 'Limited Access',
                          icon: Ext.Msg.ERROR,
                          msg: 'Sorry , Access to this menu is limited , please contact administrator',
                                buttons: Ext.Msg.OK,
                       });
				}else{
      				Ext.getCmp('id_layout_center').showModule(record.raw);
				}



		   },
		    failure: function (response) {
                   console.log('Gagal : '+ response);

            }

		 });
	}


			   
		
});





