// JavaScript Document
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
		var id='tab-user_';
		
		var storeGroup=Ext.create('Ext.mod.store.Group',{
			model: 'Ext.mod.model.Group'
		});
		
		var storeUser=Ext.create('Ext.mod.store.User',{
			model:'Ext.mod.model.User'
		});
		
		var rightClickUser=Ext.create('Ext.menu.Menu',{
			height:120,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp(id+'grid_user').getStore();
						grid.reload();
				}
			},{
				text:'Add',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddUser();
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp(id+'grid_user');
                    var model = grid.getSelectionModel().getSelection();
						if(model[0].data != null){
							model_edit=model[0].data;
							CreateEditUser(model_edit);
						}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp(id+'grid_user');
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
										url: '../../server/user/service.php?act=Delete',
                                        method: 'POST',
										params:{
											param_id:model[0].data.user_id
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
                                                         var grid = Ext.getCmp(id+'grid_user').getStore();
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
            title: 'User',
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
					id:id+'grid_user',
					collapsible:true,
					autoScroll:true,
					store:storeUser,
					flex:1,
					columns:[{
						text:'Id',
						dataIndex:'user_id',
						hidden:true,
					},{
						text:'User name',
						flex:25/100,
						dataIndex:'user_name'	
					},{
						text:'Group',
						flex:25/100,
						dataIndex:'group_name'	
					}],
					dockedItems:[{
						xtype:'pagingtoolbar',
						dock:'bottom',
						store:storeUser,
						displayInfo:'true'
					}],
					listeners : {
    					itemdblclick: function(dv, record, item, index, e) {
							var grid = Ext.getCmp(id+'grid_user');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
									CreateEditUser(model_edit);
								}
    					}
					},
					viewConfig: {
                		enableTextSelection: true,
						listeners : {
    						itemcontextmenu: function(view, record, item, index,          e){
        					e.stopEvent();
        						rightClickUser.showAt(e.getXY());
   							}
						}
            		},
					tbar:[{
						xtype:'button',
						text:'Add',
						id:'btn-c-tambah-user',
						icon: '../../resources/images/plus.png',
						handler:function(btn){
							CreateAddUser();	
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-c-tambah-user',
      									html: 'Add new user',
      									anchor: 'top'
    								});
  								}
							}
					},{
						xtype:'tbseparator',
					},{
						xtype:'button',
						text:'Edit',
						id:'btn-c-edit-user',
						icon: '../../resources/images/edit.png',
						handler:function(btn){
							var grid = Ext.getCmp(id+'grid_user');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
									CreateEditUser(model_edit);
								}
						},
						listeners: {
  								afterrender: function() {
    								Ext.create('Ext.tip.ToolTip',{
      									target:'btn-c-edit-user',
      									html: 'Edit user',
      									anchor: 'top'
    								});
  								}
							}
					},{
						xtype:'tbseparator',
					},{
						xtype:'button',
						text:'Delete',
						id:'btn-c-hapus-user',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							var grid = Ext.getCmp(id+'grid_user');
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
													 url: '../../server/user/service.php?act=Delete',
                                                     method: 'POST',
													 params:{
														 param_id:model[0].data.user_id
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
                                                                                     var grid = Ext.getCmp(id+'grid_user').getStore();
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
      									target:'btn-c-hapus-user',
      									html: 'Delete user',
      									anchor: 'top'
    								});
  								}
							}
					},'->',{
						xtype:'textfield',
						fieldLabel:'Search',
						listeners:{
							change: function(field, newValue, oldValue, options){
    							 var grid = Ext.getCmp(id+'grid_user');
    								grid.store.clearFilter();

    								if (newValue) {
        								var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
        									grid.store.filter({
            								filterFn: function(record) {
                								return matcher.test(record.get('user_id')) ||
														matcher.test(record.get('user_name')) ||
														matcher.test(record.get('group_name'));
            									}
        									});
    									}
								}
						}
					}]
				}]
		});
		
		function CreateAddUser(){
			var me=this;
			
			var frmAddUser= new Ext.window.Window({
				height: 250,
            	width: 400,
            	title: 'Tambah User',
				renderTo: Ext.getBody(),
				closable: true,
				border:0,
            	modal: true,
				layout:{
					type:'fit',
					align:'stretch',
				},
				items:[{
					xtype:'form',
					id:id+'f_user',
					border:0,
					items:[{
						xtype:'panel',
						layout:'vbox',
						border:0,
						autoWidth: true,
						bodyPadding:10,
						items:[{
							xtype:'textfield',
							id:id+'txtUserName',name:id+'txtUserName',
							fieldLabel:'User name',
							allowBlank:false,
							labelWidth:140,
							width:350,
							value:''	
						},{
							xtype:'textfield',
							id:id+'txtPassword',name:id+'txtPassword',
							fieldLabel:'Password',
							allowBlank:false,
							labelWidth:140,
							inputType:'password',
							width:350,
							value:''	
						},{
							xtype:'textfield',
							id:id+'txtConfirmPassword',name:id+'txtConfirmPassword',
							fieldLabel:'Confirm Password',
							allowBlank:false,
							width:350,
							labelWidth:140,
							inputType:'password',
							value:''	
						},{
							xtype:'combo',
							id:id+'cmbGroup',name:id+'cmbGroup',
							fieldLabel:'Group',
							allowBlank:false,
							width:350,
							labelWidth:140,
							store:storeGroup,
							valueField:'group_id',displayField:'group_name',
							value:''
						}]
					}],
					buttons:[{
						xtype:'button',
						text:'Save',
						icon: '../../resources/images/ok.png',
						handler:function(btn){
							var form = Ext.getCmp(id+'f_user').getForm();
							var pass=Ext.getCmp(id+'txtPassword').getValue();
							var c_pass=Ext.getCmp(id+'txtConfirmPassword').getValue();
							
							if(pass==c_pass){
								if(form.isValid()){
									form.submit({
										url:'../../server/user/service.php?act=Add',
										method:'post',
										waitMsg:'Please wait...',
										reset:true,
										success:function(form,action){
										if(action.result.success){
											var grid=Ext.getCmp(id+'grid_user').getStore();
												grid.reload();
												Ext.Msg.alert('Message','Record successfully saved');	
										}else{
											Ext.Msg.alert('Message','Record failed to save');	
										}
										frmAddUser.close();	
									},
									failure:function(form,action){
										Ext.Msg.alert('Message','Record failed to save');
										frmAddUser.close();	
									}
													
								});
							}
							}else{
								Ext.Msg.alert('Failed','Password does not match!!');
							}
						}
					},{
						xtype:'button',
						text:'Close',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							frmAddUser.close();	
						}
					}]
				}]
				
			});
			
			frmAddUser.show();
		}
		
		
		
		function CreateEditUser(data){
			var me=this;
			
			var frmEditUser= new Ext.window.Window({
				height: 200,

            	width: 400,
            	title: 'Edit User',
				renderTo: Ext.getBody(),
				closable: true,
            	autoScroll: true,
            	modal: true,
				layout:{
					type:'fit',
					align:'stretch'
				},
				items:[{
					xtype:'form',
					id:id+'f_edit_user',
					border:0,
					items:[{
						xtype:'panel',
						layout:'vbox',
						autoWidth: true,
						border:0,
						bodyPadding:10,
						items:[,{
							xtype:'textfield',
							id:id+'txtEditUserName',name:id+'txtEditUserName',
							fieldLabel:'User name',
							allowBlank:false,
							width:350,
							labelWidth:140,
							value:data.user_name	
						},{
							xtype:'combo',
							id:id+'cmbEditGroup',name:id+'cmbEditGroup',
							fieldLabel:'Group',
							width:350,
							labelWidth:140,
							store:storeGroup,
							valueField:'group_id',displayField:'group_name',
							value:data.group_id	
						}]
					}],
					buttons:[{
						xtype:'button',
						text:'Save',
						icon: '../../resources/images/ok.png',
						handler:function(btn){
							var form = Ext.getCmp(id+'f_edit_user').getForm();
								if(form.isValid()){
										form.submit({
											url:'../../server/user/service.php?act=Update',
											method:'post',
											params:{
												param_id:data.user_id
											},
											waitMsg:'Please wait...',
											reset:true,
											success:function(form,action){
											if(action.result.success){
												var grid=Ext.getCmp(id+'grid_user').getStore();
													grid.reload();
													Ext.Msg.alert('Message','Record successfully saved');	
											}else{
													Ext.Msg.alert('Message','Record failed to save');	
											}
											frmEditUser.close();	
										},
										failure:function(form,action){
											Ext.Msg.alert('Message','Record failed to save');
											frmEditUser.close();	
										}
												
								});
							}							
						}
					},{
						xtype:'button',
						text:'Close',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							frmEditUser.close();	
						}
					}]
				}]
				
			});
			
			frmEditUser.show();
		}
		
		
		 Ext.onReady(function() {
            win.show();
        });
		
});