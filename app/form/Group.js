// JavaScript Document
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
Ext.Loader.setConfig({
            enabled: true,
            paths: {
                'Ext.mod': '../../app'
            }
        });

Ext.onReady(function() {
			
requires:[
			'Ext.grid.*',
			'Ext.form.*',
			'Ext.window.*',
		]
		
		
		var me=this;
		var id='tab-group_';
		
		var storeGroup=Ext.create('Ext.mod.store.Group',{
			model: 'Ext.mod.model.Group'
		});
		
		var storeModule=Ext.create('Ext.mod.store.Privilege',{
			model:'Ext.mod.model.Privilege'
		});
		
		var rightClickGroup=Ext.create('Ext.menu.Menu',{
			height:120,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp(id+'grid_group').getStore();
						grid.reload();
				}
			},{
				text:'Add',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddGroup();
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp(id+'grid_group');
                    var model = grid.getSelectionModel().getSelection();
						if(model[0].data != null){
							model_edit=model[0].data;
							CreateEditGroup(model_edit);
						}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp(id+'grid_group');
                    var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
                            title: 'Confirm',
                            msg: 'The record will be deleted?',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.Msg.YESNO,
                            fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/group/service.php?act=Delete',
                                        method: 'POST',
										params:{
											param_id:model[0].data.group_id
										},
										success: function (response) {
                                            var result = Ext.JSON.decode(response.responseText);
											if (result.success) {
                                               	Ext.Msg.show({
                                                	title: 'Information',
                                                    icon: Ext.Msg.INFO,
                                                    msg: 'Record successfully removed!',
                                                    buttons: Ext.Msg.OK,
                                                    fn: function (btn) {;
														grid.getStore().reload();
														grid.getView().refresh();
                                                    }
                                                });
                                            } else {
                                               Ext.Msg.show({
                                                   title: 'Error',
                                                   icon: Ext.Msg.ERROR,
                                                   msg: 'Record failed deleted! '+ result.responseStatusObject.reason,
                                                   buttons: Ext.Msg.OK,
                                                   fn: function () {
                                                         var grid = Ext.getCmp(id+'grid_group').getStore();
                                                             Rstore.load();
                                                    }
                                               });
                                             }
										},
										failure: function (response) {
                                              console.log('Failed : '+ response);
                                        }				 
									});			 
								}		   
							}
									   
						});		
					}	
				}
			}]
		});
		
		var win = Ext.create('Ext.window.Window', {
            title: 'Group',
            closable: false,
            width: 350,
			height:400,
			showClose :false,
			maximized:true,
            layout: {
				type: 'vbox',
    			align : 'stretch',
    			pack  : 'start',
				},
				items:[{
					xtype:'grid',
					id:id+'grid_group',
					collapsible:true,
					autoScroll:true,
					store:storeGroup,
					flex:1,
					columns:[{
						text:'Id',
						dataIndex:'group_id',
						hidden:true,
					},{
						text:'Group',
						width:'100%',
						dataIndex:'group_name'
					}],
					dockedItems:[{
						xtype:'pagingtoolbar',
						dock:'bottom',
						store:storeGroup,
						displayInfo:'true'
					}],
					listeners : {
    					itemdblclick: function(dv, record, item, index, e) {
							var grid = Ext.getCmp(id+'grid_group');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
									CreateEditGroup(model_edit);
								}
							
    					}
					},
					viewConfig: {
                		enableTextSelection: true,
						listeners : {
    						itemcontextmenu: function(view, record, item, index,          e){
        					e.stopEvent();
								rightClickGroup.showAt(e.getXY());
   							}
						}
            		},
					tbar:[{
						xtype:'button',
						text:'Add',
						id:'btn-d-tambah-group',
						icon: '../../resources/images/plus.png',
						handler:function(btn){
							CreateAddGroup();	
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-d-tambah-group',
      									html:'Add new group',
      									anchor: 'top'
    								});
  								}
							}
					},{
						xtype:'tbseparator',
					},{
						xtype:'button',
						text:'Edit',
						id:'btn-d-edit-group',
						icon: '../../resources/images/edit.png',
						handler:function(btn){
							var grid = Ext.getCmp(id+'grid_group');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
									CreateEditGroup(model_edit);
								}
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-d-edit-group',
      									html: 'Edit group ',
      									anchor: 'top'
    								});
  								}
							}
					},{
						xtype:'tbseparator',
					},{
						xtype:'button',
						text:'Delete',
						id:'btn-d-hapus-group',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							var grid = Ext.getCmp(id+'grid_group');
                          		var model = grid.getSelectionModel().getSelection();
								if (model.length > 0) {
									Ext.Msg.show({
                                      title: 'Confirm',
                                       msg: 'The record will be deleted?',
                                       icon: Ext.Msg.QUESTION,
                                       buttons: Ext.Msg.YESNO,
                                       fn: function (btn) {
										    if (btn == 'yes') {
												 Ext.Ajax.request({
													 url: '../../server/group/service.php?act=Delete',
                                                     method: 'POST',
													 params:{
														 param_id:model[0].data.group_id
													 },
															success: function (response) {
                                                                var result = Ext.JSON.decode(response.responseText);
																 if (result.success) {
                                                                       Ext.Msg.show({
                                                                           title: 'Information',
                                                                           icon: Ext.Msg.INFO,
                                                                           msg: 'Record successfully removed!',
                                                                           buttons: Ext.Msg.OK,
                                                                           fn: function (btn) {;
																					grid.getStore().reload();
																					grid.getView().refresh();
                                                                                        }
                                                                                    });
                                                                            } else {
                                                                                Ext.Msg.show({
                                                                                   title: 'Error',
                                                                                   icon: Ext.Msg.ERROR,
                                                                                   msg: 'Record failed deleted! '+ result.responseStatusObject.reason,
                                                                                   buttons: Ext.Msg.OK,
                                                                                   fn: function () {
                                                                                     var grid = Ext.getCmp(id+'grid_group').getStore();
                                                                                          Rstore.load();
                                                                                        }
                                                                                    });
                                                                            }
															},
															 failure: function (response) {
                                                                     console.log('Failed : '+ response);

                                                             }				 
												 });
												 
											}
										   
									   }
									   
								});
								
								
							}	
							
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-d-hapus-group',
      									html: 'Delete group',
      									anchor: 'top'
    								});
  								}
							}
					},{
						xtype:'tbseparator'
					},{
						xtype:'button',
						text:'Detail Privilege (Module)',
						id:'btn-d-detail-group',
						icon: '../../resources/images/detail.png',
						handler:function(btn){
							var grid = Ext.getCmp(id+'grid_group');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
										CreateFormModule(model_edit);
								}
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-d-detail-group',
      									html: 'Set user privilege',
      									anchor: 'top'
    								});
  								}
							}
					},'->',{
						xtype:'textfield',
						fieldLabel:'Search',
						listeners:{
							change: function(field, newValue, oldValue, options){
    							 var grid = Ext.getCmp(id+'grid_group');
    								grid.store.clearFilter();

    								if (newValue) {
        								var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
        									grid.store.filter({
            								filterFn: function(record) {
                								return matcher.test(record.get('group_id')) ||
                    									matcher.test(record.get('group_name'));
            									}
        									});
    									}
								}
						}
					}]
				}]
		});
		
		function CreateFormModule(data){
			var me=this;
			
			var frmModule=new Ext.window.Window({
				
				height:400,
				width:600,
				title:'Privilege (Module)',
				renderTo:Ext.getBody(),
				closable:true,
				autoScroll:true,
				modal:true,
				layout:{
					type:'vbox',
					align:'stretch'	
				},
				items:[{
					xtype:'form',
					id:id+'f_module',name:id+'f_module',
					border:0,
					items:[{
							xtype:'grid',
							id:id+'grid_module',name:id+'grid_module',
								flex:1,
								autoScroll:true,
								store:storeModule,
								selModel: new Ext.selection.CheckboxModel(
                                {
                                    allowDeselect: true,
                                    mode: 'MULTI'
                                }),
								columns:[{
									text:'id',
									dataIndex:'privilege_id',
									hidden:true,	
								},{
									text:'Privilege (Module)',
									dataIndex:'privilege',
									flex:1	
								}],
								dockedItems:[{
									xtype:'pagingtoolbar',
									dock:'bottom',
									store:storeModule,
									displayInfo:'true'
								}],
								listeners:{
									viewready: function() {
										if(data.privilege!=""){
											var zgrid=this.getStore();
											prosesSelectGrid(zgrid,data);
										}
									},
								},
								viewConfig: {
                					enableTextSelection: true
            				},
								
						}]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var grid=Ext.getCmp(id+'grid_module');
						var model = grid.getSelectionModel().getSelection();
						var xx_module=Ext.encode(Ext.Array.pluck(model, 'data'))
						var form = Ext.getCmp(id+'f_module').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/group/service.php?act=AddModule',
								method:'post',
								params:{
									param_id:data.group_id,
									param_module:xx_module
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
								if(action.result.success){
										var grid=Ext.getCmp(id+'grid_module').getStore();
										grid.reload();
										
										var grid_d=Ext.getCmp(id+'grid_group').getStore();
										grid_d.reload();
										
										Ext.Msg.alert('Message','Record successfully saved');				
								}else{
										Ext.Msg.alert('Message','Record failed to save');	
									}
										frmModule.close();	
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','record failed to save');
								}
							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmModule.close();	
					}
				}]
			});
			frmModule.show();
		}
		
		function CreateAddGroup(){
			var me=this;
			
			var frmAddGroup= new Ext.window.Window({
				height: 120,
            	width: 400,
            	title: 'Add New Group',
				renderTo: Ext.getBody(),
				closable: true,
            	autoScroll: true,
            	modal: true,
				layout:{
					type:'vbox',
					align:'stretch'
				},
				items:[{
					xtype:'form',
					id:id+'f_group',
					border:0,
					items:[{
						xtype:'panel',
						layout:'hbox',
						autoWidth: true,
						bodyPadding:10,
						items:[{
							xtype:'textfield',
							id:id+'txtGroupName',
							labelWidth:75,
							name:id+'txtGroupName',fieldLabel:'Group name',
							allowBlank:false,
							width:350,
							value:''
						}]
					}],
					buttons:[{
						xtype:'button',
						text:'Save',
						icon: '../../resources/images/ok.png',
						handler:function(btn){
							var form = Ext.getCmp(id+'f_group').getForm();
								if(form.isValid()){
									form.submit({
									url:'../../server/group/service.php?act=Add',
									method:'post',
									waitMsg:'Please wait...',
									reset:true,
									success:function(form,action){
									if(action.result.success){
									var grid=Ext.getCmp(id+'grid_group').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');	
									}else{
										Ext.Msg.alert('Message','Record failed to save');	
									}
									frmAddGroup.close();	
								},
									failure:function(form,action){
										Ext.Msg.alert('Message','Record failed to save');
										frmAddGroup.close();	
									}
													
								});
							}							
						}
					},{
						xtype:'button',
						text:'Close',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							frmAddGroup.close();	
						}
					}]
				}]
				
			});
			
			frmAddGroup.show();
		}
		
		
		
		function CreateEditGroup(data){
			var me=this;
			
			var frmEditGroup= new Ext.window.Window({
				height: 120,
            	width: 400,
            	title: 'Edit Group',
				renderTo: Ext.getBody(),
				closable: true,
            	autoScroll: true,
            	modal: true,
				layout:{
					type:'vbox',
					align:'stretch'
				},
				items:[{
					xtype:'form',
					id:id+'f_edit_group',
					border:0,
					items:[{
						xtype:'panel',
						layout:'hbox',
						autoWidth: true,
						bodyPadding:10,
						items:[{
							xtype:'textfield',
							id:id+'txtEditGroupName',
							labelWidth:75,
							name:id+'txtEditGroupName',fieldLabel:'Group name',
							allowBlank:false,
							width:350,
							value:data.group_name
						}]
					}],
					buttons:[{
						xtype:'button',
						text:'Save',
						icon: '../../resources/images/ok.png',
						handler:function(btn){
							var form = Ext.getCmp(id+'f_edit_group').getForm();
								if(form.isValid()){
										form.submit({
											url:'../../server/group/service.php?act=Update',
											method:'post',
											params:{
												param_id:data.group_id
											},
											waitMsg:'Please wait...',
											reset:true,
											success:function(form,action){
											if(action.result.success){
												var grid=Ext.getCmp(id+'grid_group').getStore();
													grid.reload();
													Ext.Msg.alert('Message','Record successfully saved');	
											}else{
													Ext.Msg.alert('Message','Record failed to save');	
											}
											frmEditGroup.close();	
										},
										failure:function(form,action){
											Ext.Msg.alert('Message','Record failed to save');
											frmEditGroup.close();	
										}
												
								});
							}							
						}
					},{
						xtype:'button',
						text:'Close',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							frmEditGroup.close();	
						}
					}]
				}]
				
			});
			
			frmEditGroup.show();
		}
		
		
		 Ext.onReady(function() {
            win.show();
        });
		
		
		function prosesSelectGrid(zgrid,data){
			var gridModules = Ext.getCmp(id+'grid_module').getStore();
			var grid = Ext.getCmp(id+'grid_module');
			if(data!=null){
				var data_module = Ext.JSON.decode(data.privilege);
				var ix = 0;
				var iz = 0;
				
				for(ix=0;ix<zgrid.data.length;ix++){
					var temp_id_privilege=zgrid.data.items[ix].data.privilege_id;
					var modulesIndex = gridModules.data.items[ix].index;
					for(iz=0;iz<data_module.length;iz++){
						if(temp_id_privilege==data_module[iz].privilege_id){
							 grid.getSelectionModel().select(modulesIndex, true);
						}
					}
				}
			}	
		}
		
});