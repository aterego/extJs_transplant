// JavaScript Document
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
Ext.Loader.setConfig({
            enabled: true,
            paths: {
                'Ext.mod': '../../app',
				'Ext.ux': '../../ext/ux'
            }
        });

Ext.require([
	'Ext.ux.grid.Printer',
	'Ext.ux.RowExpander'
]);

Ext.onReady(function() {


	var storeLabaratory=Ext.create('Ext.mod.store.Labaratory',{
		model: 'Ext.mod.model.Labaratory'
	});

	var storeInstrumental=Ext.create('Ext.mod.store.Instrumental',{
		model: 'Ext.mod.model.Instrumental'
	});

	var storeSubLab=Ext.create('Ext.mod.store.SubLab',{
		model: 'Ext.mod.model.SubLab'
	});

	var storeSubTrt=Ext.create('Ext.mod.store.SubTrt',{
		model: 'Ext.mod.model.SubTrt'
	});

	var storeSubIns=Ext.create('Ext.mod.store.SubIns',{
		model: 'Ext.mod.model.SubIns'
	});

			
requires:[
			'Ext.grid.*',
			'Ext.form.*',
			'Ext.window.*',
	        //'Ext.grid.plugin.BufferedRenderer'
		]
		
		
		var me=this;
		var id='tab-group_';




	var storeLiv=Ext.create('Ext.mod.store.Liv',{
		model: 'Ext.mod.model.Liv',
		storeCount: 0,
		//buffered: true,
		//trailingBufferZone: 20,
		//leadingBufferZone: 50,
		//purgePageCount: 0,
		//scrollToLoadBuffer: 0,

	});


	var storeTreatmentList=Ext.create('Ext.mod.store.TreatmentList',{
		model: 'Ext.mod.model.TreatmentList',
	});



	var storePatients=Ext.create('Ext.mod.store.Patients',{
		model:'Ext.mod.model.Patients'
	});


		var rightClickGroup=Ext.create('Ext.menu.Menu',{
			height:120,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp(id+'grid_liv').getStore();
						grid.reload();

				}
			}]
		});


	var combo = new Ext.form.ComboBox({
		name : 'perpage',
		width: 55,
		store: new Ext.data.ArrayStore({
			fields: ['id'],
			data  : [
				['15'],
				['25'],
				['50'],
				['100'],
				['150'],
				['200'],
				['250'],
				['300'],
				['400'],
				['500'],
			]
		}),
		mode : 'local',
		value: '25',

		listWidth     : 45,
		triggerAction : 'all',
		displayField  : 'id',
		valueField    : 'id',
		editable      : false,
		forceSelection: true
	});

	var bbar = new Ext.toolbar.Paging({
		store:  storeLiv,
		displayInfo: true,
		items   :    [
			'-',
			'Per Page: ',
			combo
		]
	});

	combo.on('select', function(combo, records) {
		var p = parseInt( records[0].get('id'), 10);
		//storeLiv.autoLoad ={ params: { start: 0, limit: p} };
		storeLiv.pageSize = p;
		var grid=Ext.getCmp(id+'grid_liv').getStore();
		grid.reload();
		storeLiv.loadPage(1);
	}, this);



	var storeCities=Ext.create('Ext.mod.store.Cities',{
		model: 'Ext.mod.model.Cities'
	});

	var storeCountries=Ext.create('Ext.mod.store.Countries',{
		model: 'Ext.mod.model.Countries'
	});

	var storeMedInfo=Ext.create('Ext.mod.store.Med_info',{
		model: 'Ext.mod.model.Med_info'
	});

	var storeHistory=Ext.create('Ext.mod.store.History',{
		model: 'Ext.mod.model.History'
	});

	var storeTreatment=Ext.create('Ext.mod.store.Treatment',{
		model: 'Ext.mod.model.Treatment'
	});



	var storeClinics=Ext.create('Ext.mod.store.Clinics',{
		model: 'Ext.mod.model.Clinics'
	});

	var storeDiagnosis=Ext.create('Ext.mod.store.Diagnosis',{
		model: 'Ext.mod.model.Diagnosis'
	});

	var storeDonors=Ext.create('Ext.mod.store.Donors',{
		model: 'Ext.mod.model.Donors'
	});

	var storeDoctors=Ext.create('Ext.mod.store.Doctors',{
		model: 'Ext.mod.model.Doctors'
	});

	var storeBlood= Ext.create('Ext.data.Store', {
		fields: ['blood_type_id', 'name'],
		data : [
			{"blood_type_id":40, "name":"I ჯგუფი"},
			{"blood_type_id":41, "name":"II ჯგუფი"},
			{"blood_type_id":42, "name":"III ჯგუფი"},
			{"blood_type_id":43, "name":"IV ჯგუფი"}
		]
	});

	var storeConditions=Ext.create('Ext.mod.store.Conditions',{
		model: 'Ext.mod.model.Conditions'
	});

	var storeMedicines=Ext.create('Ext.mod.store.Medicines',{
		model: 'Ext.mod.model.Medicines'
	});

	var storeDosage=Ext.create('Ext.mod.store.Dosage',{
		model: 'Ext.mod.model.Dosage'
	});


	var storeAnalysis=Ext.create('Ext.mod.store.Analysis',{
		model: 'Ext.mod.model.Analysis'
	});

	var storeProcedures=Ext.create('Ext.mod.store.Procedures',{
		model: 'Ext.mod.model.Procedures'
	});

	var storeRemovals=Ext.create('Ext.mod.store.Removals',{
		model: 'Ext.mod.model.Removals'
	});


    var cats=Ext.create('Ext.mod.store.Cats',{
        model: 'Ext.mod.model.Cats',
    });

    var catsSub=Ext.create('Ext.mod.store.CatsSub',{
        model: 'Ext.mod.model.CatsSub',
    });

    Ext.ux.SetCascading = function(parent, child) {
        child.setDisabled(!parent.isValid());

        parent.on('select', function() {
            child.clearValue();
            child.setDisabled(!parent.isValid());
        });

        child.on('focus', function() {
            if(!child.disabled) {
                var parentValue = parent.getValue();
                //alert(parentValue);
                //var childParams = child.store.baseParams;

                child.store.reload({
                    params: {parent_category_id: parentValue}
                });

            }
        });
    };

	var thisModel = null;
    var thisIndex = null;
	var thisM = null;


	var win = Ext.create('Ext.window.Window', {
            title: 'LivTx - აღრიცხვაზე მყოფ ღვიძლგადანერგილ პაციენტთა სია',
            closable: false,
			/*
            width: 350,
			height:400,
			*/
			showClose :false,
			maximized:true,
			layout:'fit',
	        layout: {
				type: 'vbox',
    			align : 'stretch',
    			pack  : 'start',
				},
				items:[{
					xtype:'grid',
					id:id+'grid_liv',
					collapsible:true,
					autoScroll:true,
					store:storeLiv,
/*
					plugins: {
						ptype: 'bufferedrenderer',
						trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
						leadingBufferZone: 50,   // Keep 50 rows rendered in the table ahead of scroll
						scrollToLoadBuffer: 0,
					},
*/
					flex:1,
					columns:[
						new Ext.grid.RowNumberer({width: 30}),
					{
						text:'Id',
						dataIndex:'id',
						hidden:true,
					},{
						text:'გვარი',
						width:100,
						dataIndex:'patientlastname'
					},{
						text:'სახელი',
						width:90,
						dataIndex:'patientname'
					},{
						text:'დაბად. თარიღი',
						width:'50',
						dataIndex:'birthday'
					},{
						text:'ტელ.',
						width:70,
						dataIndex:'phone2'
					},{
						text:'გადანერგვის თარიღი',
						width:130,
						dataIndex:'transdate'
					},{
						text:'კლინიკა (გადაინერგა)',
						width:130,
						dataIndex:'clinic'
					},{
						text:'დონორი',
						width:70,
						dataIndex:'donor'
					},{
						text:'პაციენტის მდგომარეობა',
						width:140,
						dataIndex:'condition'
					},{
						text:'ნეორალი',
						width:80,
						dataIndex:'med1'
					},{
						text:'პროგრაფი',
						width:80,
						dataIndex:'med2'
					},{
						text:'სელსეპტი',
						width:80,
						dataIndex:'med3'
					},{
						text:'განახლების თარიღი',
						width:80,
						dataIndex:'lastdate'
					}],
                    /*
					dockedItems:[{
						xtype:'pagingtoolbar',
						dock:'bottom',
						store:storeLiv,
						displayInfo:'true'
					}],
                    */
                    bbar:bbar,

					listeners : {
    					itemdblclick: function(dv, record, item, index, e) {
							var grid = Ext.getCmp(id+'grid_liv');
                        		var model = grid.getSelectionModel().getSelection();
							thisM = model;

								if(model[0].data != null){

										model_edit = model[0].data;
										thisModel = model_edit;
										thisIndex = index;

										CreateEditPatient(model_edit);
								}

    					},

						itemmouseenter: function(dv, record, item, index, e) {

							var grid = Ext.getCmp(id+'grid_liv');
							var view = grid.getView();
							var tip = Ext.create('Ext.tip.ToolTip', {
								// The overall target element.
								target: view.el,
								// Each grid row causes its own separate show and hide.
								delegate: view.itemSelector,
								// Moving within the row should not hide the tip.
								trackMouse: true,
								// Render immediately so that tip.body can be referenced prior to the first show.
								renderTo: Ext.getBody(),
								listeners: {
									// Change content dynamically depending on which element triggered the show.
									beforeshow: function updateTipBody(tip) {
										tip.update('კლინიკა: "' + view.getRecord(tip.triggerElement).get('clinic') + '"' + ', ' +
											'პაციენტის მდგომარეობა: "' + view.getRecord(tip.triggerElement).get('condition') + '"');
									}
								}
							});
						}
					},
					viewConfig: {
                		enableTextSelection: true,
						listeners : {
    						itemcontextmenu: function(view, record, item, index,          e){
        					e.stopEvent();
							  if(acc!='r')
								rightClickGroup.showAt(e.getXY());
   							}

						}
            		},





					tbar:[
						{
							text: 'Print',
							iconCls: 'icon-print',
							handler : function(){
								var grid = Ext.getCmp(id+'grid_liv');
								Ext.ux.grid.Printer.printAutomatically = false;
								Ext.ux.grid.Printer.print(grid);
							}
						}
						,

						{
							text: 'Export',
							iconCls: 'icon-excel',
							handler : function(){
								var grid = Ext.getCmp(id+'grid_liv');
								grid.doExcelExport({
									apiKey: '2109e0c559c4900aa772f2648437c5c0',
									startCell: 'A8',
									templatefile: "temp.xlsx",
									destinationfile: 'Liv.xlsx'
								});
							}
						},
						/*
						{
						xtype:'button',
						text:'Add',
						id:'btn-d-tambah-group',
						icon: '../../resources/images/plus.png',
						handler:function(btn){
							//CreateAddGroup();
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
							var grid = Ext.getCmp(id+'grid_liv');
                        		var model = grid.getSelectionModel().getSelection();
								if(model[0].data != null){
									model_edit=model[0].data;
									//CreateEditGroup(model_edit);
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
										//CreateFormModule(model_edit);
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
					}
						,*/
						'->',{
						xtype:'textfield',
						fieldLabel:'ძიება',
						listeners:{
							change: function(field, newValue, oldValue, options){
    							 var grid = Ext.getCmp(id+'grid_liv');
    								grid.store.clearFilter();

    								if (newValue) {
        								var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
        									grid.store.filter({
            								filterFn: function(record) {
                								return matcher.test(record.get('patientname'))||
													matcher.test(record.get('patientlastname'));
            									}
        									});
    									}
								}
						}
					}



					]
				}]
		});

    //***AVA*** set title after store load
	storeLiv.on('load', function(store, records, successful){
		win.setTitle('LivTx - აღრიცხვაზე მყოფ ღვიძლგადანერგილ პაციენტთა სია - სულ ' +  store.getTotalCount());
	});


	var frmShowPatient;
	function CreateEditPatient(data){
		var me=this;


		var printGrid = Ext.create('Ext.grid.Panel', {
			store: storeLabaratory,
			columns: [
				{ header: 'თარიღი', flex     : 10/80,  dataIndex: 'date' },
				{ header: 'ანალიზის დასახელება', flex: 25/80, dataIndex: 'analysis' },
				{ header: 'მაჩვენებელი', flex    : 20/80, dataIndex: 'value' }
			],
			height: 200,
			width: 400,
			id: 'printFullLabaratory',

		});

		//***AVA*** define labaratory spanned grid
		Ext.define('Lab.view.grid.ArrayGrid', {
			extend: 'Ext.grid.Panel',
			xtype: 'array-grid',
			store: storeLabaratory,
			stateful: true,
			collapsible: true,
			multiSelect: false,
			stateId: 'stateGrid',
			id:'fullLabaratory',
			height: 350,
			title: '',
			viewConfig: {
				stripeRows: false,
				enableTextSelection: true
			},

			initComponent: function () {
				this.width = '90%';
				this.columns = [
					{
						text     : 'თარიღი',
						flex     : 10/80,
						sortable : true,
						dataIndex: 'date',
						renderer  : function (value, meta, record, rowIndex, colIndex, store) {

							console.log(!rowIndex);
							var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('date'),
								last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('date');

							if (first) {
								var i = rowIndex + 1, span = 1;
								while (i < store.getCount() && value === store.getAt(i).get('date')) {
									i++;
									span++;
								}
								var rowHeight = 20, padding = 6,
									height = (rowHeight * (i - rowIndex) - padding) + 'px';
								//***AVA*** adjust height TODO
								//meta.style = 'height:' + height + ';line-height:' + height + ';';
								meta.tdAttr = 'rowspan = ' + span;
							}
							else{
								meta.tdAttr='style="display:none;"';
							}
							return first ? value : '';
						}
					},
					{
						text     : 'ანალიზის დასახელება',
						sortable : true,
						flex: 25/80,
						dataIndex: 'analysis',
						/*
						 renderer  : function (value, meta, record, rowIndex, colIndex, store) {
						 var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('analysis'),
						 last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('analysis');

						 if (first) {
						 var i = rowIndex + 1, span = 1;
						 while (i < store.getCount() && value === store.getAt(i).get('analysis')) {
						 i++;
						 span++;
						 }
						 var rowHeight = 20, padding = 6,
						 height = (rowHeight * (i - rowIndex) - padding) + 'px';
						 meta.style = 'height:' + height + ';line-height:' + height + ';';
						 meta.tdAttr = 'rowspan = ' + span;
						 }
						 else{
						 meta.tdAttr='style="display:none;"';
						 }
						 return first ? value : '';
						 }
						 */
					},

					{
						text     : 'მაჩვენებელი',
						flex    : 20/80,
						sortable : true,
						renderer : function(val) {
							if (val > 0) {
								return '<span style="color:' + '#73b51e' + ';">' + val + '</span>';
							} else if (val < 0) {
								return '<span style="color:' + '#cf4c35' + ';">' + val + '</span>';
							}
							return val;
						},
						dataIndex: 'value'
					}
				];

				this.callParent();

				// this.getView().on('refresh', this.updateRowSpan, this);
			},

			updateRowSpan: function() {
				var columns = this.columns;
				view = this.getView();
				store = this.getStore();
				rowCount = store.getCount();
				console.log(rowCount);
				column = columns[0];
				//console.log(column);
				dataIndex = column.dataIndex;
				//console.log(dataIndex);

				spanCell = null;
				spanCount = null;
				spanValue = null;
				columnCount = 2;
				for (var row = 0; row < rowCount; ++row) {

					var cell = view.getCellByPosition({ row: row, column: 0 }).dom;
					record = store.getAt(row);
					value = record.get(dataIndex);

					if (spanValue != value) {
						if (spanCell !== null) {
							spanCell.rowSpan = spanCount;
						}

						Ext.fly(cell).setStyle('display', '');
						spanCell = cell;
						spanCount = 1;
						spanValue = value;
					} else {
						spanCount++;
						Ext.fly(cell).setStyle('display', 'none');
					}

				}

				if (spanCell !== null) {
					spanCell.rowSpan = spanCount;
				}
			},


			listeners : {
				itemdblclick: function(dv, record, item, index, e) {
					var grid = Ext.getCmp('fullLabaratory');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						if(acc!='r') {
							model_edit = model[0].data;
							CreateEditLabaratory(model_edit);
						}
					}
				}
			},

			viewConfig: {
				enableTextSelection: true,
				listeners : {
					itemcontextmenu: function(view, record, item, index,          e){
						e.stopEvent();
						if(acc!='r')
						  rightClickLabaratory.showAt(e.getXY());
					}
				}
			},


			tbar:[{
				xtype:'button',
				text:'Add',
				id:'btn-c-add-labaratory',
				icon: '../../resources/images/plus.png',
				handler:function(btn){

					CreateAddLabaratory(data.id, data.reg_id);

				},
				listeners: {
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-add-labaratory');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-add-labaratory',
							html: 'ახალი ლაბორატორია',
							anchor: 'top'
						});
					}
				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Edit',
				id:'btn-c-edit-labaratory',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullLabaratory');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditLabaratory(model_edit);
					}
				},
				listeners: {

					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-edit-labaratory');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-edit-labaratory',
							html: 'რედაქტირება',
							anchor: 'top'
						});
					}





				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Delete',
				id:'btn-d-labaratory',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullLabaratory');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular analysis click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/labaratory.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											labaratory_id:model[0].data.labaratory_id
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
														var grid = Ext.getCmp('fullLabaratory').getStore();
														store.load();
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
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-d-labaratory');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-d-labaratory',
							html: 'წაშლა',
							anchor: 'top'
						});
					}
				}
			},'->',{
				xtype:'textfield',
				fieldLabel:'ძიება',
				listeners:{
					change: function(field, newValue, oldValue, options){
						var grid = Ext.getCmp('fullLabaratory');
						grid.store.clearFilter();

						if (newValue) {
							var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
							grid.store.filter({
								filterFn: function(record) {
									return matcher.test(record.get('analysis')) ||
										matcher.test(record.get('value'));
								}
							});
						}
					}
				}
			}
			,
				{
					text: 'Print',
					iconCls: 'icon-print',
					handler : function(){
						var grid = Ext.getCmp('printFullLabaratory');
						Ext.ux.grid.Printer.printAutomatically = false;
						Ext.ux.grid.Printer.print(grid);
					}
				}
				,

				{
					text: 'Export',
					iconCls: 'icon-excel',
					handler : function(){
						var grid = Ext.getCmp('fullLabaratory');
						grid.doExcelExport({
							apiKey: '2109e0c559c4900aa772f2648437c5c0',
							startCell: 'B8',
							templatefile: "temp.xlsx",
							destinationfile: 'ლაბოროტორია_Liv_' + data.id + '.xlsx'
						});
					}
				}


			]

		});

		var LabGrid = new Lab.view.grid.ArrayGrid({
			//renderTo: 'grid'
		});


		var printGridLab = Ext.create('Ext.grid.Panel', {
			store: storeInstrumental,
			columns: [
				{ header: 'თარიღი', flex     : 10/80,  dataIndex: 'date' },
				{ header: 'პროცედურის დასახელება', flex: 25/80, dataIndex: 'procedure' },
				{ header: 'დასკვნა', flex    : 20/80, dataIndex: 'value' }
			],
			height: 200,
			width: 400,
			id: 'printFullInstrumental',

		});

		//***AVA*** define insrumental spanned grid
		Ext.define('Ins.view.grid.ArrayGrid', {
			extend: 'Ext.grid.Panel',
			xtype: 'array-grid',
			store: storeInstrumental,
			stateful: true,
			collapsible: true,
			multiSelect: false,
			stateId: 'stateGrid',
			id:'fullInstrumental',
			height: 350,
			title: '',
			viewConfig: {
				stripeRows: false,
				enableTextSelection: true
			},

			initComponent: function () {
				this.width = '90%';
				this.columns = [
					{
						text     : 'თარიღი',
						flex     : 10/80,
						sortable : true,
						dataIndex: 'date',
						renderer  : function (value, meta, record, rowIndex, colIndex, store) {

							console.log(!rowIndex);
							var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('date'),
								last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('date');

							if (first) {
								var i = rowIndex + 1, span = 1;
								while (i < store.getCount() && value === store.getAt(i).get('date')) {
									i++;
									span++;
								}
								var rowHeight = 20, padding = 6,
									height = (rowHeight * (i - rowIndex) - padding) + 'px';
								//***AVA*** adjust height TODO
								//meta.style = 'height:' + height + ';line-height:' + height + ';';
								meta.tdAttr = 'rowspan = ' + span;
							}
							else{
								meta.tdAttr='style="display:none;"';
							}
							return first ? value : '';
						}
					},
					{
						text     : 'პროცედურის დასახელება',
						sortable : true,
						flex: 25/80,
						dataIndex: 'procedure',
						/*
						 renderer  : function (value, meta, record, rowIndex, colIndex, store) {
						 var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('analysis'),
						 last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('analysis');

						 if (first) {
						 var i = rowIndex + 1, span = 1;
						 while (i < store.getCount() && value === store.getAt(i).get('analysis')) {
						 i++;
						 span++;
						 }
						 var rowHeight = 20, padding = 6,
						 height = (rowHeight * (i - rowIndex) - padding) + 'px';
						 meta.style = 'height:' + height + ';line-height:' + height + ';';
						 meta.tdAttr = 'rowspan = ' + span;
						 }
						 else{
						 meta.tdAttr='style="display:none;"';
						 }
						 return first ? value : '';
						 }
						 */
					},

					{
						text     : 'დასკვნა',
						flex    : 20/80,
						sortable : true,
						renderer : function(val) {
							if (val > 0) {
								return '<span style="color:' + '#73b51e' + ';">' + val + '</span>';
							} else if (val < 0) {
								return '<span style="color:' + '#cf4c35' + ';">' + val + '</span>';
							}
							return val;
						},
						dataIndex: 'value'
					}
				];

				this.callParent();

				// this.getView().on('refresh', this.updateRowSpan, this);
			},

			updateRowSpan: function() {
				var columns = this.columns;
				view = this.getView();
				store = this.getStore();
				rowCount = store.getCount();
				console.log(rowCount);
				column = columns[0];
				//console.log(column);
				dataIndex = column.dataIndex;
				//console.log(dataIndex);

				spanCell = null;
				spanCount = null;
				spanValue = null;
				columnCount = 2;
				for (var row = 0; row < rowCount; ++row) {

					var cell = view.getCellByPosition({ row: row, column: 0 }).dom;
					record = store.getAt(row);
					value = record.get(dataIndex);

					if (spanValue != value) {
						if (spanCell !== null) {
							spanCell.rowSpan = spanCount;
						}

						Ext.fly(cell).setStyle('display', '');
						spanCell = cell;
						spanCount = 1;
						spanValue = value;
					} else {
						spanCount++;
						Ext.fly(cell).setStyle('display', 'none');
					}

				}

				if (spanCell !== null) {
					spanCell.rowSpan = spanCount;
				}
			},


			listeners : {
				itemdblclick: function(dv, record, item, index, e) {
					var grid = Ext.getCmp('fullInstrumental');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						if(acc!='r') {
							model_edit = model[0].data;
							CreateEditInstrumental(model_edit);
						}
					}
				}
			},

			viewConfig: {
				enableTextSelection: true,
				listeners : {
					itemcontextmenu: function(view, record, item, index,          e){
						e.stopEvent();
						if(acc!='r')
						  rightClickInstrumental.showAt(e.getXY());
					}
				}
			},


			tbar:[{
				xtype:'button',
				text:'Add',
				id:'btn-c-add-instrumental',
				icon: '../../resources/images/plus.png',
				handler:function(btn){

					CreateAddInstrumental(data.id, data.reg_id);

				},
				listeners: {
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-add-instrumental');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-add-instrumental',
							html: 'ახალი ლაბორატორია',
							anchor: 'top'
						});
					}
				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Edit',
				id:'btn-c-edit-instrumental',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullInstrumental');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditInstrumental(model_edit);
					}
				},
				listeners: {
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-edit-instrumental');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-edit-instrumental',
							html: 'რედაქტირება',
							anchor: 'top'
						});
					}
				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Delete',
				id:'btn-d-instrumental',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullInstrumental');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular procedure click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/instrumental.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											instrumental_id:model[0].data.instrumental_id
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
														var grid = Ext.getCmp('fullInstrumental').getStore();
														store.load();
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
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-d-instrumental');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-d-instrumental',
							html: 'წაშლა',
							anchor: 'top'
						});
					}
				}
			},'->',{
				xtype:'textfield',
				fieldLabel:'ძიება',
				listeners:{
					change: function(field, newValue, oldValue, options){
						var grid = Ext.getCmp('fullInstrumental');
						grid.store.clearFilter();

						if (newValue) {
							var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
							grid.store.filter({
								filterFn: function(record) {
									return matcher.test(record.get('procedure')) ||
										matcher.test(record.get('value'));
								}
							});
						}
					}
				}
			}
			,
				{
					text: 'Print',
					iconCls: 'icon-print',
					handler : function(){
						var grid = Ext.getCmp('printFullInstrumental');
						Ext.ux.grid.Printer.printAutomatically = false;
						Ext.ux.grid.Printer.print(grid);
					}
				}
				,

				{
					text: 'Export',
					iconCls: 'icon-excel',
					handler : function(){
						var grid = Ext.getCmp('fullInstrumental');
						grid.doExcelExport({
							apiKey: '2109e0c559c4900aa772f2648437c5c0',
							startCell: 'B8',
							templatefile: "temp.xlsx",
							destinationfile: 'ინსტრუმენტალური_Liv_' + data.id + '.xlsx'
						});
					}
				}


			]

		});

		var InsGrid = new Ins.view.grid.ArrayGrid({
			//renderTo: 'grid'
		});


		var printGridTrt = Ext.create('Ext.grid.Panel', {
			store: storeTreatment,
			columns: [
				{ header: 'თარიღი', flex     : 10/80,  dataIndex: 'date' },
				{ header: 'მედიკამენტი', flex: 25/80, dataIndex: 'med' },
				{ header: 'დოზა', flex    : 20/80, dataIndex: 'dosage' }
			],
			height: 200,
			width: 400,
			id: 'printFullTreatment',

		});

		//***AVA*** define treatment spanned grid
		Ext.define('Trt.view.grid.ArrayGrid', {
			extend: 'Ext.grid.Panel',
			xtype: 'array-grid',
			store: storeTreatment,
			stateful: true,
			collapsible: true,
			multiSelect: false,
			stateId: 'stateGrid2',
			id:'fullTreatment',
			height: 350,
			title: '',
			viewConfig: {
				stripeRows: false,
				enableTextSelection: true
			},

			initComponent: function () {
				this.width = '90%';
				this.columns = [
					{
						text     : 'თარიღი',
						flex     : 10/80,
						sortable : true,
						dataIndex: 'date',
						renderer  : function (value, meta, record, rowIndex, colIndex, store) {

							console.log(!rowIndex);
							var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('date'),
								last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('date');

							if (first) {
								var i = rowIndex + 1, span = 1;
								while (i < store.getCount() && value === store.getAt(i).get('date')) {
									i++;
									span++;
								}
								var rowHeight = 20, padding = 6,
									height = (rowHeight * (i - rowIndex) - padding) + 'px';
								//***AVA*** adhust height TODO
								//meta.style = 'height:' + height + ';line-height:' + height + ';';
								meta.tdAttr = 'rowspan = ' + span;
							}
							else{
								meta.tdAttr='style="display:none;"';
							}
							return first ? value : '';
						}
					},
					{
						text     : 'მედიკამენტი',
						sortable : true,
						flex: 25/80,
						dataIndex: 'med',
						/*
						 renderer  : function (value, meta, record, rowIndex, colIndex, store) {
						 var first = !rowIndex || value !== store.getAt(rowIndex - 1).get('analysis'),
						 last = rowIndex >= store.getCount() - 1 || value !== store.getAt(rowIndex + 1).get('analysis');

						 if (first) {
						 var i = rowIndex + 1, span = 1;
						 while (i < store.getCount() && value === store.getAt(i).get('analysis')) {
						 i++;
						 span++;
						 }
						 var rowHeight = 20, padding = 6,
						 height = (rowHeight * (i - rowIndex) - padding) + 'px';
						 meta.style = 'height:' + height + ';line-height:' + height + ';';
						 meta.tdAttr = 'rowspan = ' + span;
						 }
						 else{
						 meta.tdAttr='style="display:none;"';
						 }
						 return first ? value : '';
						 }
						 */
					},

					{
						text     : 'დოზა',
						flex    : 20/80,
						sortable : true,
						renderer : function(val) {
							if (val > 0) {
								return '<span style="color:' + '#73b51e' + ';">' + val + '</span>';
							} else if (val < 0) {
								return '<span style="color:' + '#cf4c35' + ';">' + val + '</span>';
							}
							return val;
						},
						dataIndex: 'dosage'
					}
				];

				this.callParent();

				// this.getView().on('refresh', this.updateRowSpan, this);
			},

			updateRowSpan: function() {
				var columns = this.columns;
				view = this.getView();
				store = this.getStore();
				rowCount = store.getCount();
				console.log(rowCount);
				column = columns[0];
				//console.log(column);
				dataIndex = column.dataIndex;
				//console.log(dataIndex);

				spanCell = null;
				spanCount = null;
				spanValue = null;
				columnCount = 2;
				for (var row = 0; row < rowCount; ++row) {

					var cell = view.getCellByPosition({ row: row, column: 0 }).dom;
					record = store.getAt(row);
					value = record.get(dataIndex);

					if (spanValue != value) {
						if (spanCell !== null) {
							spanCell.rowSpan = spanCount;
						}

						Ext.fly(cell).setStyle('display', '');
						spanCell = cell;
						spanCount = 1;
						spanValue = value;
					} else {
						spanCount++;
						Ext.fly(cell).setStyle('display', 'none');
					}

				}

				if (spanCell !== null) {
					spanCell.rowSpan = spanCount;
				}
			},


			listeners : {
				itemdblclick: function(dv, record, item, index, e) {
					var grid = Ext.getCmp('fullTreatment');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						if(acc!='r') {
							model_edit = model[0].data;
							CreateEditTreatment(model_edit);
						}
					}
				}
			},

			viewConfig: {
				enableTextSelection: true,
				listeners : {
					itemcontextmenu: function(view, record, item, index,          e){
						e.stopEvent();
						if(acc!='r')
							rightClickTreatment.showAt(e.getXY());
					}
				}
			},


			tbar:[{
				xtype:'button',
				text:'Add',
				id:'btn-c-add-treatment',
				icon: '../../resources/images/plus.png',
				handler:function(btn){

					CreateAddTreatment(data.id, data.reg_id);

				},
				listeners: {
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-add-treatment');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-add-treatment',
							html: 'ახალი მკურნალობა',
							anchor: 'top'
						});
					}
				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Edit',
				id:'btn-c-edit-treatment',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullTreatment');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditTreatment(model_edit);
					}
				},
				listeners: {

					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-c-edit-treatment');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-c-edit-treatment',
							html: 'რედაქტირება',
							anchor: 'top'
						});
					}





				}
			},{
				xtype:'tbseparator',
			},{
				xtype:'button',
				text:'Delete',
				id:'btn-d-treatment',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullTreatment');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular treatment click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/treatment.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											treatment_id:model[0].data.treatment_id
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
														var grid = Ext.getCmp('fullTreatment').getStore();
														store.load();
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
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('btn-d-treatment');
							button.hide();
						}
					},
					afterrender: function() {
						Ext.create('Ext.tip.ToolTip',{
							target:'btn-d-treatment',
							html: 'წაშლა',
							anchor: 'top'
						});
					}
				}
			},'->',{
				xtype:'textfield',
				fieldLabel:'ძიება',
				listeners:{
					change: function(field, newValue, oldValue, options){
						var grid = Ext.getCmp('fullTreatment');
						grid.store.clearFilter();

						if (newValue) {
							var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
							grid.store.filter({
								filterFn: function(record) {
									return matcher.test(record.get('analysis')) ||
										matcher.test(record.get('value'));
								}
							});
						}
					}
				}
			}
				,
				{
					text: 'Print',
					iconCls: 'icon-print',
					handler : function(){
						var grid = Ext.getCmp('printFullTreatment');
						Ext.ux.grid.Printer.printAutomatically = false;
						Ext.ux.grid.Printer.print(grid);
					}
				}
				,

				{
					text: 'Export',
					iconCls: 'icon-excel',
					handler : function(){
						var grid = Ext.getCmp('fullTreatment');
						grid.doExcelExport({
							apiKey: '2109e0c559c4900aa772f2648437c5c0',
							startCell: 'B8',
							templatefile: "temp.xlsx",
							destinationfile: 'მკურნალობა_Liv_' + data.id + '.xlsx'
						});
					}
				}


			]

		});

		var TrtGrid = new Trt.view.grid.ArrayGrid({
			//renderTo: 'grid'
		});



		var LabStore;
		var createStore = function(fielddata, values) {
			LabStore = Ext.create('Ext.data.ArrayStore', {
				fields: fielddata,
				data: values

			});
		}



		var blood = "-";
		switch(data.blood_type_id) {
			case 40:
				blood = 'I';
				break;
			case 41:
				blood = 'II';
				break;
			case 42:
				blood = 'III';
				break;
			case 43:
				blood = 'IV';
				break;
		}

		var rhesus = "-";
		switch(data.rhesus) {
			case 46:
				rhesus = 'დადებითი';
				break;
			case 47:
				rhesus = 'უარყოფითი';
				break;
		}


		var categories = Ext.create('Ext.panel.Panel', {
			padding: '7 0 7 0' ,
			//margin: '4 0 4 0',
			width: '100%',
			layout: 'fit',
			/*
			listeners:{
				afterrender : function(){
					this.setBorder(false);
				}
			}
			*/

			//renderTo: Ext.getBody()
		});



		Ext.Ajax.request({
			url: '../../server/fields/categories.php?act=View',
			method: 'POST',
			params:{
				param_id:data.id,
				reg_id:data.reg_id
			},
			success: function (response) {
				var result = Ext.JSON.decode(response.responseText);

				//***AVA temp
				/*
				 var count = 0;
				 Ext.Array.forEach(result, function(f) {
				 if(count == 0) {
				 //ItemsArr.push('{title:' +  f.prefix + '" გადანერგილები - "' +  f.category_name +'}');
				 categories.add(new Ext.form.Label({
				 html: '<div><div style="float:left">' + f.prefix + " გადანერგილები - " + f.category_name + ';</div> <div style="float: right; margin-right: 15px">აღრიცხვაზე აყვანის თარიღი ' + f.date + '</div></div> ',
				 margin: '7'
				 }));
				 }
				 count++;

				 });
				 categories.doLayout();
				 */
				categories.add(new Ext.form.Label({
					html: '<div><div style="float:left">' + result[0].prefix + " გადანერგილები - " + result[0].category_name + ';</div>' +
					'<div style="float:right; margin-right:15px"><a class="x-btn x-unselectable x-btn-default-small x-icon x-btn-icon x-btn-default-small-icon" id="edit_date" style="width: 16px; height: 16px; " hidefocus="on" unselectable="on" tabindex="0" href="#" onClick="javascript:OpenDateEdit(' + data.id + ',' + result[0].category_id + ',\'' + result[0].date + '\');"><span role="presentation" class="x-btn-wrap" unselectable="on" style="height: 10px;"><span class="x-btn-button" role="presentation" style="height: 10px;"><span class="x-btn-inner x-btn-inner-center" unselectable="on" style="line-height: 16px;">&nbsp;</span><span role="presentation" class="x-btn-icon-el  " unselectable="on" style="background-image:url(../../resources/images/edit3.png);">&nbsp;</span></span></span></a></div>' +
					'<div style="float:right; margin-right:5px">აღრიცხვაზე აყვანის თარიღი ' + result[0].date + '</div>' +
					'</div> ',
					margin: '7'
				}));


			},
			failure: function (response) {
				console.log('Failed : '+ action.result.data);
			}
		});

		var win2;

		var reg_id = data.reg_id;

		//***AVA*** add parameter to med_info store
		storeMedInfo.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				start: 0, limit: 15
			}
		});

		//***AVA*** add parameter to history store
		storeHistory.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				start: 0, limit: 15
			}
		});

		//***AVA*** add parameter to labaratory store
		storeLabaratory.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				//start: 16, limit: 15
			}
		});

		//***AVA*** add parameter to instrumental store
		storeInstrumental.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				//start: 16, limit: 15
			}
		});

		//***AVA*** add parameter to treatment store
		storeTreatment.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				//start: 16, limit: 15
			}
		});

		//***AVA*** add parameter to treatmentlist store
		storeTreatmentList.load({
			params: {
				param_id : data.id,
				reg_id : reg_id,
				//start: 16, limit: 15
			}
		});



		this.OpenTreatmentList = function(){

				var frmTrList= new Ext.window.Window({
				height: 420,
				width: 700,
				y:10,
				title: 'იმუნოსუპრესია',
				renderTo: Ext.getBody(),
				closable: true,
				autoScroll: true,
				modal: true,
				layout:'fit',
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start',
				},
				items:[{
					xtype:'grid',
					id:'grid_tlist',
					collapsible:true,
					autoScroll:true,
					store:storeTreatmentList,
					/*
					 plugins: {
					 ptype: 'bufferedrenderer',
					 trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
					 leadingBufferZone: 50,   // Keep 50 rows rendered in the table ahead of scroll
					 scrollToLoadBuffer: 0,
					 },
					 */
					flex:1,
					columns:[
						{
							text:'თარიღი',
							width:100,
							dataIndex:'date'
						},{
							text:'პროგრაფი',
							width:90,
							dataIndex:'med1'
						},{
							text:'სელსეპტი',
							width:'90',
							dataIndex:'med2'
						}],
					/*
					 dockedItems:[{
					 xtype:'pagingtoolbar',
					 dock:'bottom',
					 store:storeLiv,
					 displayInfo:'true'
					 }],
					 */

					tbar:[
						{
							text: 'Print',
							iconCls: 'icon-print',
							handler : function(){
								var grid = Ext.getCmp('grid_tlist');
								Ext.ux.grid.Printer.printAutomatically = false;
								Ext.ux.grid.Printer.print(grid);
							}
						}
						,

						{
							text: 'Export',
							iconCls: 'icon-excel',
							handler : function(){
								var grid = Ext.getCmp('grid_tlist');
								grid.doExcelExport({
									apiKey: '2109e0c559c4900aa772f2648437c5c0',
									startCell: 'B8',
									templatefile: "temp.xlsx",
									destinationfile: 'იმუნოსუპრესია_Liv_' + data.id + '.xlsx'
								});
							}
						},

						'->',{
							xtype:'textfield',
							fieldLabel:'ძიება',
							listeners:{
								change: function(field, newValue, oldValue, options){
									var grid = Ext.getCmp('grid_tlist');
									grid.store.clearFilter();

									if (newValue) {
										var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
										grid.store.filter({
											filterFn: function(record) {
												return matcher.test(record.get('med1'))||
													matcher.test(record.get('med2'));
											}
										});
									}
								}
							}
						}]
				}]

			});

			frmTrList.show();
		};

		this.OpenTreatmentList2 = function(pid,rid){


			//if (!win) {
			var	winL = Ext.create('widget.window', {
				height: 420,
				width: 800,
				y:10,
				title: 'იმუნოსუპრესია',
				renderTo: Ext.getBody(),
				closable: true,
				modal: true,
				layout: 'fit',
				items: [{
					xtype: "component",
					autoEl: {
						frameborder: 0,
						tag: "iframe",
						width: '100%',
						layout: 'fit',
						src: "../../app/module/tr_dgrid.php?pid=" + pid + "&rid=" + rid
					}
				}]
			});

			winL.show();

			//}
		};

		this.OpenLabList = function(pid,rid){


			//if (!win) {
			var	winL = Ext.create('widget.window', {
				height: 420,
				width: 800,
				y:10,
				title: 'ანალიზების სია',
				renderTo: Ext.getBody(),
				closable: true,
				modal: true,
				layout: 'fit',
					items: [{
						xtype: "component",
						autoEl: {
							frameborder: 0,
							tag: "iframe",
							width: '100%',
							layout: 'fit',
							src: "../../app/module/lab_dgrid.php?pid=" + pid + "&rid=" + rid
						}
					}]
				});

				winL.show();

			//}
		};

		this.OpenInsList = function(pid,rid){


			//if (!win) {
			var	winI = Ext.create('widget.window', {
				height: 420,
				width: 800,
				y:10,
				title: 'პროცედურების სია',
				renderTo: Ext.getBody(),
				closable: true,
				modal: true,
				layout: 'fit',
				items: [{
					xtype: "component",
					autoEl: {
						frameborder: 0,
						tag: "iframe",
						width: '100%',
						layout: 'fit',
						src: "../../app/module/ins_dgrid.php?pid=" + pid + "&rid=" + rid
					}
				}]
			});

			winI.show();

			//}
		};

		this.OpenDateEdit = function(patient_id, category_id, date){

    		var dArr = date.split(".");
			var d = dArr[0];
			var m = parseInt(dArr[1]-1);
			var Y = dArr[2];

			var frmDateEdit= new Ext.window.Window({
				height: 130,
				width: 430,
				title: 'თარიღი',
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
					id:'d_edit',
					border:0,
					items:[{
						xtype:'panel',
						layout:'hbox',
						autoWidth: true,
						bodyPadding:10,
						items:[{
							xtype: 'datefield',
							id:'dateEdit',
							labelWidth:75,
							name:'date',
							value : new Date(Y,m,d),
							fieldLabel:'თარიღი',
							allowBlank:false,
							width:350

						}]
					}],
					buttons:[{
						xtype:'button',
						text:'შენახვა',
						icon: '../../resources/images/ok.png',
						handler:function(btn){
							var form = Ext.getCmp('d_edit').getForm();
							if(form.isValid()){
								form.submit({
									url:'../../server/fields/categories.php?act=Update',
									method:'post',
									params:{
										param_id:patient_id,
										category_id:category_id
									},
									waitMsg:'Please wait...',
									reset:true,
									success:function(form,action){
										if(action.result.success){
											//var grid=Ext.getCmp(id+'grid_city').getStore();
											//storeCountries.reload();
											Ext.Msg.alert('Message','Record successfully saved');
										}else{
											Ext.Msg.alert('Message','Record failed to save');
										}
										frmDateEdit.close();
									},
									failure:function(form,action){
										Ext.Msg.alert('Message','Record failed to save');
										frmDateEdit.close();
									}

								});

							}
						}
					},{
						xtype:'button',
						text:'Close',
						icon: '../../resources/images/cancel.png',
						handler:function(btn){
							frmDateEdit.close();
						}
					}]
				}]

			});

			frmDateEdit.show();
		};

		//***AVA*** context menu (med_info)
		var rightClickMedInfo=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('med_info').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				id: 'MedIMenuAdd',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddMedInfo(data.id, reg_id);
				}
			},{
				text:'Edit',
				id: 'MedIMenuEdit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('med_info');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditMedInfo(model_edit);
					}
				}
			},{
				text:'Delete',
				id: 'MedIMenuDelete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('med_info');
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
										url: '../../server/list/med_info.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											fc:model[0].data.fc
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
														var grid = Ext.getCmp('med_info').getStore();
														store.load();
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
		//***AVA*** context menu (history)
		var rightClickHistory=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('history').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				id:'HisMenuAdd',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddHistory(data.id, reg_id);
				},
				//***AVA***  listeners beforerender for demo only
				listeners: {
					beforerender: function() {
						if(acc == 'r') {
							var button = Ext.getCmp('HisMenuAdd');
							button.hide();
						}
					}
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				id:'HisMenuEdit',
				handler:function(btn){
					var grid = Ext.getCmp('history');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditHistory(model_edit);
					}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				id:'HisMenuDelete',
				handler:function(btn){
					var grid = Ext.getCmp('history');
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
										url: '../../server/list/history.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											fc:model[0].data.fc
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
														var grid = Ext.getCmp('history').getStore();
														store.load();
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
		//***AVA*** context menu (treatment)
		var rightClickTreatment=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('fullTreatment').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				id: 'TreatMenuAdd',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddTreatment(data.id, reg_id);
				}
			},{
				text:'Edit',
				id: 'TreatMenuEdit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullTreatment');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditTreatment(model_edit);
					}
				}
			},{
				text:'Delete',
				id: 'TreatMenuDelete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullTreatment');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular treatment click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/treatment.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											treatment_id:model[0].data.treatment_id
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
														var grid = Ext.getCmp('fullTreatment').getStore();
														store.load();
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
		//***AVA*** context menu (labaratory)
		var rightClickLabaratory=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('fullLabaratory').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				id:'LabMenuAdd',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddLabaratory(data.id, data.reg_id);
				}
			},{
				text:'Edit',
				id:'LabMenuEdit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullLabaratory');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditLabaratory(model_edit);
					}
				}
			},{
				text:'Delete',
				id:'LabMenuDelete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullLabaratory');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular analysis click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/labaratory.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											labaratory_id:model[0].data.labaratory_id
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
														var grid = Ext.getCmp('fullLabaratory').getStore();
														store.load();
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
		//***AVA*** context menu (labaratory)
		var rightClickInstrumental=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('fullInstrumental').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				id:'InsMenuAdd',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddInstrumental(data.id, data.reg_id);
				}
			},{
				text:'Edit',
				id:'InsMenuEdit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullInstrumental');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditInstrumental(model_edit);
					}
				}
			},{
				text:'Delete',
				id:'InsMenuDelete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('fullInstrumental');
					var model = grid.getSelectionModel().getSelection();
					if (model.length > 0) {
						Ext.Msg.show({
							title: 'Confirm',
							msg: 'The record will be deleted? All records from this date will be deleted. To erase particular procedure click Edit to open new form!',
							icon: Ext.Msg.QUESTION,
							buttons: Ext.Msg.YESNO,
							fn: function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: '../../server/list/instrumental.php?act=Delete',
										method: 'POST',
										params:{
											param_id:model[0].data.patient_id,
											instrumental_id:model[0].data.instrumental_id
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
														var grid = Ext.getCmp('fullInstrumental').getStore();
														store.load();
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

        //alert(data.pimage.toString());
		frmShowPatient= new Ext.window.Window({
			autoWidth: true,
			autoHeight: true,
			minHeight: win.getHeight(),
			width: win.getWidth() - 20,
			x: 0,
			title: "LivTx " + data.id + " - " + data.patientname + " " + data.patientlastname,
			constrain: true,
			renderTo: Ext.getBody(),
			closable: true,
			autoScroll: true,
			modal: true,
			layout:'fit',
			items:[
			{
				xtype: 'form',
				//id: 'patientForm',
				collapsible: true,

				//bodyPadding: 5,
				//width: 600,
				fieldDefaults: {
					//labelAlign: 'top',
					msgTarget: 'side',
					labelStyle: 'font-weight:bold;'
				},
				defaults: {
					anchor: '100%'
				},

				items: [{
					xtype: 'container',
					layout:'hbox',
					items: [
						{
							xtype: 'container',
							height : 200,
							width: 160,
                            margin: '10 5 10 5',
							border:false,
							layout:'vbox',

							items: [{
								xtype: 'image',
								text: 'Photo',
								height: 150,
								anchor:'95%',
								src: 'data:image/jpeg;base64,' + data.pimage.toString()  ,
								//value: data.pimage,
                                //tpl:'<img src="data:image/jpeg;base64, {data.pimage}" />'
							},
                            {
                                xtype: 'fieldset',
                                margin: '0 0 0 -10',
                                layout: 'hbox',
                                border: 'none',
                                items: [
                                   {
                                        xtype: 'button',
                                        margin: '5 0 0 0',
                                        text: 'რეგისტრატურა',
                                        anchor:'95%',
                                        scale   : 'medium',
                                        handler:function(btn) {
                                            CreateAddReg(data.id);
                                        }
                                        ,
                                        listeners: {
                                            beforerender: function(btn) {
                                                if(acc == 'r') {
                                                    //var button = Ext.getCmp('InsMenuDelete');
                                                    btn.hide();
                                                }
                                            }
                                        }

                                    },
                                    {
                                        xtype:'button',
                                        margin: '9 5 0 5',
                                        id:'btn-c-reg',
                                        icon: '../../resources/images/cancel.png',
                                        handler:function(btn){

                                                Ext.Msg.show({
                                                    title: 'Confirm',
                                                    msg: 'The registration will be deleted?',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.Msg.YESNO,
                                                    fn: function (btn) {
                                                        if (btn == 'yes') {
                                                            Ext.Ajax.request({
                                                                url: '../../server/fields/categories.php?act=Delete',
                                                                method: 'POST',
                                                                params:{
                                                                    param_id:data.id,
                                                                    reg_id:data.reg_id
                                                                },
                                                                success: function (response) {
                                                                    var result = Ext.JSON.decode(response.responseText);
                                                                    if (result.success) {
                                                                        Ext.Msg.show({
                                                                            title: 'Information',
                                                                            icon: Ext.Msg.INFO,
                                                                            msg: 'Record successfully removed!',
                                                                            buttons: Ext.Msg.OK,
                                                                            fn: function (btn) {

                                                                                frmShowPatient.close();
                                                                                storeLiv.reload();
                                                                            }
                                                                        });
                                                                    } else {
                                                                        Ext.Msg.show({
                                                                            title: 'Error',
                                                                            icon: Ext.Msg.ERROR,
                                                                            msg: 'Record failed deleted! '+ result.responseStatusObject.reason,
                                                                            buttons: Ext.Msg.OK,
                                                                            fn: function () {
                                                                                frmShowPatient.close();
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



                                        },
                                        listeners: {
                                            beforerender: function() {
                                                if(acc == 'r') {
                                                    var button = Ext.getCmp('btn-c-reg');
                                                    button.hide();
                                                }
                                            },
                                            afterrender: function() {
                                                Ext.create('Ext.tip.ToolTip',{
                                                    target:'btn-c-reg',
                                                    html: 'წაშლა',
                                                    anchor: 'top'
                                                });
                                            }
                                        }
                                    }
                                ]
                            }


     ]
						},
						{
							xtype: 'container',
							flex: 1,
							border:false,
							layout: 'anchor',
							defaultType: 'displayfield',

							items: [{
								fieldLabel: 'ისტორიის №',
								name: 'history_id',
								value: data.history_id,
								anchor:'95%'
							}, {
								fieldLabel: 'პირადი №',
								name: 'personalid',
								value: data.personalid,
								anchor:'95%'
							}, {
								fieldLabel: 'გვარი',
								name: 'patientlastname',
								value: data.patientlastname,
								anchor:'95%'
							}, {
								fieldLabel: 'სახელი',
								name: 'patientname',
								value: data.patientname,
								anchor:'95%'
							}, {
								fieldLabel: 'მამის სახელი',
								name: 'patronymic',
								value: data.patronymic,
								anchor:'95%'
							}]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: 'anchor',
							defaultType: 'displayfield',
							items: [{
								fieldLabel: 'დაბ. თარიღი',
								name: 'birthday',
								value: data.birthday,
								anchor:'95%'
							}, {
								fieldLabel: 'სქესი',
								name: 'gender',
								value: data.gender,
								anchor:'95%'
							}, {
								fieldLabel: 'ქალაქი',
								name: 'city_name',
								value: data.city_name,
								anchor:'95%'
							}, {
								fieldLabel: 'ქვეყანა',
								name: 'country_name',
								value: data.country_name,
								anchor:'95%'
							}, {
								fieldLabel: 'მისამართი',
								name: 'address1',
								value: data.address1,
								anchor:'95%'
							}]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: 'anchor',
							defaultType: 'displayfield',
							items: [{
								fieldLabel: 'მობილური',
								name: 'phone2',
								value: data.phone2,
								anchor:'95%'
							}, {
								fieldLabel: 'სახლის ტელ.',
								name: 'phone1',
								value: data.phone1,
								anchor:'95%'
							}, {
								fieldLabel: 'სამს. ტელ.',
								name: 'work_phone',
								value: data.work_phone,
								anchor:'95%'
							}, {
								fieldLabel: 'სამ. ადგილი',
								name: 'work',
								value: data.work,
								anchor:'95%'
							},{
								fieldLabel: 'ელ-ფოსტა',
								name: 'email',
								value: data.email,
								vtype:'email',
								anchor:'95%'
							}
					      ]
						}

						,

						{
							xtype: 'container',
							width: 30,
							margin: '5',
							border:false,
							layout:'vbox',

							items: [
								{
									xtype: 'label',
									text: '',
									height: 160

								},{
									xtype: 'button',
									icon: '../../resources/images/edit2.png',
									//src: '/path/to/img.png',
									height: 24, // Specifying height/width ensures correct layout
									width: 24,
									handler:function(btn) {
										EditPatient(data);
										/*

										if (!win2) {
											win2 = Ext.create('widget.window', {
												title: 'ახალი ანკეტა',
												header: {
													titlePosition: 2,
													titleAlign: 'center'
												},
												closable: true,
												modal: true,
												width: 700,
												minWidth: 550,
												height: 450,


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
														src: "../../app/module/mForm.php"
													}
												}]
											});

											win2.show();
											win2.on('close', function() {
												win2 = null;
											}, this);

										}

										*/
									},
									listeners: {
										beforerender: function(btn) {
											if(acc == 'r') {
												//var button = Ext.getCmp('InsMenuDelete');
												btn.hide();
											}
										}
									}
							}]
						}
					]

				 }
					,
					{
						//xtype: 'panel',
						//title: ItemsArray
						//items: ItemsArray
						xtype: categories
					},
					{
						xtype:'tabpanel',
						plain:true,
						activeTab: 0,
						defaults:{
							bodyPadding: 10
						},
						items:[
							{
							title:'სამედიცინო ინფორმაცია',
							items:[

								{
									xtype:'panel',
									padding: '5 0 10 0',
									html:'<div><strong>დამატებითი ინფორმაცია:</strong> ' + data.info + '</div>' +
									'<div><strong>' + data.con_date + ' - ' + 'პაციენტის მდგომარეობა:</strong> ' + data.condition + '</div>',
									border: 0
								},
								{
								xtype:'grid',
								id:'med_info',
								collapsible:true,
								autoScroll:true,
								store:storeMedInfo,
								flex:1,
								columns:[{
									text:'გადანერგვის თარიღი',
									flex:25/100,
									dataIndex:'date'
								},{
									text:'კლინიკა',
									flex:25/100,
									dataIndex:'clinic',
									renderer: function(value, metadata) {
										metadata.style = 'white-space: normal;';
										return value;
									}
								},{
									text:'დიაგნოზი',
									flex:25/100,
									dataIndex:'diagnosis',
									renderer: function(value, metadata) {
										metadata.style = 'white-space: normal;';
										return value;
									}
								},{
									text:'დონორის სტატუსი',
									flex:25/100,
									dataIndex:'donor'
								},{
									text:'ინფორმაცია დონორზე',
									flex:25/100,
									dataIndex:'donor_info'
								},{
									text:'ოპერატორი',
									flex:25/100,
									dataIndex:'onameFull'
								},{
									text:'მკურნალი ექიმი',
									flex:25/100,
									dataIndex:'dnameFull'
								}],
								/*
								dockedItems:[{
									xtype:'pagingtoolbar',
									dock:'bottom',
									store:storeUser,
									displayInfo:'true'
								}],
								*/
								listeners : {
									itemdblclick: function(dv, record, item, index, e) {
										var grid = Ext.getCmp('med_info');
										var model = grid.getSelectionModel().getSelection();
										if(model[0].data != null){
											if(acc!='r') {
												model_edit = model[0].data;
												CreateEditMedInfo(model_edit);
											}
										}
									}
								},

								viewConfig: {
									enableTextSelection: true,
									listeners : {
										itemcontextmenu: function(view, record, item, index,          e){
											e.stopEvent();
											if(acc!='r')
											 rightClickMedInfo.showAt(e.getXY());
										}
									}
								},
								tbar:[{
									xtype:'button',
									text:'Add',
									id:'btn-c-tambah-user',
									icon: '../../resources/images/plus.png',
									handler:function(btn){
										CreateAddMedInfo(data.id, reg_id);
									},
									listeners: {
										beforerender: function() {
											if(acc == 'r') {
												var button = Ext.getCmp('btn-c-tambah-user');
												button.hide();
											}
										},
										afterrender: function() {
											Ext.create('Ext.tip.ToolTip',{
												target:'btn-c-tambah-user',
												html: 'ახალი გადანერგვა',
												anchor: 'top'
											});
										}
									}
								},{
									xtype:'tbseparator',
								},{
									xtype:'button',
									text:'Edit',
									id:'btn-c-edit-med-info',
									icon: '../../resources/images/edit.png',
									handler:function(btn){
										var grid = Ext.getCmp('med_info');
										var model = grid.getSelectionModel().getSelection();
										if(model[0].data != null){
											model_edit=model[0].data;
											CreateEditMedInfo(model_edit);
										}
									},
									listeners: {
										beforerender: function() {
											if(acc == 'r') {
												var button = Ext.getCmp('btn-c-edit-med-info');
												button.hide();
											}
										},
										afterrender: function() {
											Ext.create('Ext.tip.ToolTip',{
												target:'btn-c-edit-med-info',
												html: 'რედაქტირება',
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
										var grid = Ext.getCmp('med_info');
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
															url: '../../server/list/med_info.php?act=Delete',
															method: 'POST',
															params:{
																param_id:model[0].data.patient_id,
																fc:model[0].data.fc
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
																			var grid = Ext.getCmp('med_info').getStore();
																			store.load();
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
										beforerender: function() {
											if(acc == 'r') {
												var button = Ext.getCmp('btn-c-hapus-user');
												button.hide();
											}
										},
										afterrender: function() {
											Ext.create('Ext.tip.ToolTip',{
												target:'btn-c-hapus-user',
												html: 'წაშლა',
												anchor: 'top'
											});
										}
									}
								},'->',{
									xtype:'textfield',
									fieldLabel:'ძიება',
									listeners:{
										change: function(field, newValue, oldValue, options){
											var grid = Ext.getCmp('med_info');
											grid.store.clearFilter();

											if (newValue) {
												var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
												grid.store.filter({
													filterFn: function(record) {
														return matcher.test(record.get('clinic')) ||
															matcher.test(record.get('donor_info')) ||
															matcher.test(record.get('diagnosis')) ||
															matcher.test(record.get('dnameFull')) ||
															matcher.test(record.get('onameFull'));
													}
												});
											}
										}
									}
								},

									{
										text: 'Print',
										iconCls: 'icon-print',
										handler : function(){
											var grid = Ext.getCmp('med_info');
											Ext.ux.grid.Printer.printAutomatically = false;
											Ext.ux.grid.Printer.print(grid);
										}
									}
									,

									{
										text: 'Export',
										iconCls: 'icon-excel',
										handler : function(){
											var grid = Ext.getCmp('med_info');
											grid.doExcelExport({
												apiKey: '2109e0c559c4900aa772f2648437c5c0',
												startCell: 'B8',
												templatefile: "temp.xlsx",
												destinationfile: 'სამედიცინო ინფორმაცია_Liv_' + data.id + '.xlsx'
											});
										}
									}



								]
							}]
						},{
							title:'ავადმყოფობის ისტორია',
							items:[

								{
									xtype:'panel',
									padding: '5 0 10 0',
									html:'<div><strong>პაციენტის მდგომარეობა:</strong> ' + data.condition + '</div>',
									border: 0,
								},
								{
									xtype:'grid',
									id:'history',
									collapsible:true,
									autoScroll:true,
									store:storeHistory,
									//width: '70%',
									flex:1,
									columns:[{
										text:'თარიღი',
										flex:5/80,
										dataIndex:'date'
									},{
										text:'პაციენტის მდგომარეობა',
										flex:20/80,
										dataIndex:'cond',
										renderer: function(value, metadata) {
											metadata.style = 'white-space: normal;';
											return value;
										}

									},{
										text:'ჩივილები და პრობლემები',
										flex:25/80,
										dataIndex:'txt',
			     					    renderer: function(value, metadata) {
										 metadata.style = 'white-space: normal;';
										 return value;
										}
									}],
									/*
									 dockedItems:[{
									 xtype:'pagingtoolbar',
									 dock:'bottom',
									 store:storeUser,
									 displayInfo:'true'
									 }],
									 */
									listeners : {
										itemdblclick: function(dv, record, item, index, e) {
											var grid = Ext.getCmp('history');
											var model = grid.getSelectionModel().getSelection();
											if(model[0].data != null){
												if(acc!='r') {
													model_edit = model[0].data;
													CreateEditHistory(model_edit);
												}
											}
										}
									},

									viewConfig: {
										enableTextSelection: true,
										listeners : {
											itemcontextmenu: function(view, record, item, index,          e){
												e.stopEvent();
												if(acc!='r')
    												rightClickHistory.showAt(e.getXY());
											}
										}
									},
									tbar:[{
										xtype:'button',
										text:'Add',
										id:'btn-c-add-history',
										icon: '../../resources/images/plus.png',
										handler:function(btn){
											CreateAddHistory(data.id,reg_id);
										},
										listeners: {
											beforerender: function() {
												if(acc == 'r') {
													var button = Ext.getCmp('btn-c-add-history');
													button.hide();
												}
											},
											afterrender: function() {
												Ext.create('Ext.tip.ToolTip',{
													target:'btn-c-add-history',
													html: 'ახალი ისტორია',
													anchor: 'top'
												});
											}
										}
									},{
										xtype:'tbseparator',
									},{
										xtype:'button',
										text:'Edit',
										id:'btn-c-edit-history',
										icon: '../../resources/images/edit.png',
										handler:function(btn){
											var grid = Ext.getCmp('history');
											var model = grid.getSelectionModel().getSelection();
											if(model[0].data != null){
												model_edit=model[0].data;
												CreateEditHistory(model_edit);
											}
										},
										listeners: {
											beforerender: function() {
												if(acc == 'r') {
													var button = Ext.getCmp('btn-c-edit-history');
													button.hide();
												}
											},
											afterrender: function() {
												Ext.create('Ext.tip.ToolTip',{
													target:'btn-c-edit-history',
													html: 'რედაქტირება',
													anchor: 'top'
												});
											}
										}
									},{
										xtype:'tbseparator',
									},
                                        {
										xtype:'button',
										text:'Delete',
										id:'btn-c-history',
										icon: '../../resources/images/cancel.png',
										handler:function(btn){
											var grid = Ext.getCmp('history');
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
																url: '../../server/list/history.php?act=Delete',
																method: 'POST',
																params:{
																	param_id:model[0].data.patient_id,
																	fc:model[0].data.fc
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
																				var grid = Ext.getCmp('history').getStore();
																				store.load();
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
											beforerender: function() {
												if(acc == 'r') {
													var button = Ext.getCmp('btn-c-history');
													button.hide();
												}
											},
											afterrender: function() {
												Ext.create('Ext.tip.ToolTip',{
													target:'btn-c-history',
													html: 'წაშლა',
													anchor: 'top'
												});
											}
										}
									},'->',{
										xtype:'textfield',
										fieldLabel:'ძიება',
										listeners:{
											change: function(field, newValue, oldValue, options){
												var grid = Ext.getCmp('history');
												grid.store.clearFilter();

												if (newValue) {
													var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
													grid.store.filter({
														filterFn: function(record) {
															return matcher.test(record.get('txt')) ||
																matcher.test(record.get('cond'));
														}
													});
												}
											}
										}
									}
									,

										{
											text: 'Print',
											iconCls: 'icon-print',
											handler : function(){
												var grid = Ext.getCmp('history');
												Ext.ux.grid.Printer.printAutomatically = false;
												Ext.ux.grid.Printer.print(grid);
											}
										}
										,

										{
											text: 'Export',
											iconCls: 'icon-excel',
											handler : function(){
												var grid = Ext.getCmp('history');
												grid.doExcelExport({
													apiKey: '2109e0c559c4900aa772f2648437c5c0',
													startCell: 'B8',
													templatefile: "temp.xlsx",
													destinationfile: 'ავადმყოფობის ისტორია_Liv_' + data.id + '.xlsx'
												});
											}
										}

									]
								}]
						},{
							title:'ლაბოროტორია',
							items:[

								{
									xtype:'panel',
									padding: '5 0 10 0',
									html:'<div><a class="lab_list" id="lab_list" href="#" onClick="javascript:OpenLabList(' + data.id + ','+ data.reg_id +');">ანალიზების სია</a></div>' +
									'<div><strong>სისხლის ჯგუფი:</strong> ' + blood + ', <strong>რეზუსი:</strong> ' + rhesus + '</div>',
									border: 0,
								},
								LabGrid
								]
						},{
							title:'ინსტრუმენტალური',
							items:[

								{
									xtype:'panel',
									padding: '5 0 10 0',
									html:'<div><a class="ins_list" id="ins_list" href="#" onClick="javascript:OpenInsList(' + data.id + ','+ data.reg_id +');">პროცედურების სია</a></div>',
									border: 0,
								},
								InsGrid
							]
						},{
							title:'მკურნალობა',
							items:[

								{
									xtype:'panel',
									y: 0,
									padding: '5 0 10 0',
									html:'<div><a class="tr_list" id="tr_list" href="#" onClick="javascript:OpenTreatmentList2(' + data.id + ','+ data.reg_id +');">იმუნოსუპრესია</a></div>',
									border: 0,
								},
								TrtGrid
								]
						}]
						,
						listeners:{
							resize:function(){
							// if the form has been added to the viewport, change its position
								frmShowPatient.setPosition(0,win.left,true);
							}
						}
					}
				]
		    }
			]

		});


		frmShowPatient.show();

	}



	var id0='tab-city_';
	var id2='tab-country_';



	function EditPatient(data){

		//var me=this;

		var comboCity = new Ext.form.ComboBox({
			name : 'city_id',
			width: 140,
			store: storeCities,
			mode : 'local',
			listWidth     : 140,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'city_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('city_delete_but');
							var butt2 = Ext.getCmp('city_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var comboCountry = new Ext.form.ComboBox({
			name : 'country_id',
			width: 140,
			store: storeCountries,
			mode : 'local',
			listWidth     : 140,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'country_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('country_delete_but');
							var butt2 = Ext.getCmp('country_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}

		});

		var comboBlood = new Ext.form.ComboBox({
			name : 'blood_type_id',
			width: 185,
			store: storeBlood,
			mode : 'local',
			listWidth     : 185,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'blood_type_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				afterrender: function() {
					comboBlood.setValue(data.blood_type_id);
				}
			}

		});



		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		var birthArr = data.birthday.split(".");
		var d = birthArr[0];
		var m = parseInt(birthArr[1]-1);
		var Y = birthArr[2];


		var frmEditPatient= new Ext.window.Window({
			height: 420,
			width: 600,
			title: 'პაციენტის ინფორმაცია',
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
				id:'edit_patient',
				border:0,
				width: '100%',
				fieldDefaults: {
					msgTarget: 'side',
					labelWidth: 130
				},
				defaults: {
					anchor: '100%'
				},

				defaultType: 'textfield',

					items:[{
						xtype: 'filefield',
						id: 'form-file',
						emptyText: 'Select an image',
						fieldLabel: 'Photo',
						name: 'image',
						buttonText: '',
						buttonConfig: {
						  iconCls: 'upload-icon'
						}

					    },

						{
							xtype: 'fieldset',
							//title: 'ძირითადი ინფორმაცია',
							margin: '5',
							padding: '5',
							defaultType: 'textfield',
							collapsible: false,
							defaults: {
								anchor: '65%'
							},
							items :[
								{
								 fieldLabel: 'ისტორიის ნომერი',
								 name: 'history_id',
								 value: data.history_id,
								},
								{
								 fieldLabel: 'პირადი ნომერი',
								 name: 'personalid',
								 value: data.personalid,
								},
								{
								fieldLabel: 'გვარი',
								afterLabelTextTpl: required,
								name: 'patientlastname',
								value: data.patientlastname,
								allowBlank:false
							    },{
								fieldLabel: 'სახელი',
								afterLabelTextTpl: required,
								name: 'patientname',
								value: data.patientname,
								allowBlank:false
							    },
								{
								fieldLabel: 'მამის სახელი',
								name: 'patronymic',
								value: data.patronymic,
							    }


							]
						},
						{
							xtype: 'fieldset',
							margin: '5',
							padding: '5',
							defaultType: 'textfield',
							collapsible: false,
							defaults: {
								anchor: '65%'
							},
							items :[

								{
									fieldLabel: 'დაბადების თარიღი',
									name: 'birthday',
									xtype: 'datefield',
									value : new Date(Y,m,d),
									tooltip: 'Enter your date of birth'
								},
								{
									xtype: 'radiogroup',
									vertical: false,
									fieldLabel: 'სქესი',
									columns: 2,
									items: [
										{boxLabel: 'მამრობითი', name: 'gendercode', inputValue: '1'},
										{boxLabel: 'მდედრობითი', name: 'gendercode', inputValue: '2'},
									],

									listeners: {
										afterrender: function() {
											if(data.gendercode == '1'){
												this.setValue({ gendercode: '1' });
											}
											else {
												this.setValue({ gendercode: '2' });
											}
										}
									}


								},

								{

									xtype: 'fieldset',
									margin: '0 0 0 -10',
									layout: 'hbox',
									border: 'none',
									items: [
										{
											xtype: 'label',
											text: 'ქალაქი',
											//margins: '5 43',
											width:135
										},

										{
											xtype: comboCity,

										},

										{
                                            xtype: 'button',
                                            width: 18,
                                            height: 18,
                                            margin :'3 5 0 5',
                                            text:'+',
                                            icon: '../../resources/images/plus_12.png',

                                            handler:function(btn){
                                                CreateAddCity();
                                            },

                                            listeners: {
                                                afterrender: function() {
                                                    comboCity.setValue(data.city_id);

                                                }
                                            }
                                        }
                                        ,
										{
											xtype: 'button',
											width: 18,
											id: 'city_edit_but',
											height: 18,
											margin :'3 5 0 0',
											text:'+',
											icon: '../../resources/images/edit3.png',

											handler:function(btn){
												//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

												CreateEditCity(comboCity.getValue());
											},
											listeners: {
												afterrender: function() {
													if( acc!='r') {
														if (comboCity.getValue() > 0)
															this.show();
														else
															this.hide();
													}
													else
														this.hide();
												}
											}

										}

                                        ,
                                        {
                                            xtype: 'button',
                                            width: 18,
                                            id: 'city_delete_but',
                                            height: 18,
                                            margin :'3 0 0 0',
                                            text:'-',
                                            icon: '../../resources/images/minus_12.png',

                                            handler:function(btn){
                                                DeleteValue(comboCity.getValue(),comboCity.getRawValue(), this.id, storeCities, '../../server/fields/cities.php?act=Delete');
                                            },

                                            listeners: {
                                                afterrender: function() {
													if( acc!='r') {
														if (comboCity.getValue() > 0)
															this.show();
														else
															this.hide();
													}
													else
														this.hide();
                                                }
                                            }

                                        }
									]
								   },

								{

									xtype: 'fieldset',
									margin: '5 0 5 -10',

									layout: 'hbox',
									border: 'none',
									items: [
										{
											xtype: 'label',
											text: 'ქვეყანა',
											//margins: '5 43',
											width:135
										},

										{
											xtype: comboCountry,
										},

										{
											xtype: 'button',
											width: 18,
											height: 18,
											margin :'3 5 0 5',
											text:'+',
											icon: '../../resources/images/plus_12.png',
											handler:function(btn){
												CreateAddCountry();
											},
											listeners: {
												afterrender: function() {
													comboCountry.setValue(data.country_id);
												}
											}

										},

										{
											xtype: 'button',
											width: 18,
											id: 'country_edit_but',
											height: 18,
											margin :'3 5 0 0',
											text:'+',
											icon: '../../resources/images/edit3.png',

											handler:function(btn){
												CreateEditCountry(comboCountry.getValue());
											}
											,
											listeners: {
												afterrender: function() {
													if( acc!='r') {
														if (comboCountry.getValue() > 0)
															this.show();
														else
															this.hide();
													}
													else
														this.hide();
												}
											}

										}
										,
										{
											xtype: 'button',
											width: 18,
											id: 'country_delete_but',
											height: 18,
											margin :'3 0 0 0',
											text:'-',
											icon: '../../resources/images/minus_12.png',

											handler:function(btn){
												DeleteValue(comboCountry.getValue(),comboCountry.getRawValue(), this.id, storeCountries,'../../server/fields/countries.php?act=Delete');
											},

											listeners: {
												afterrender: function() {
													if( acc!='r') {
														if (comboCountry.getValue() > 0)
															this.show();
														else
															this.hide();
													}
													else
														this.hide();
												}
											}

										}

									]
								   },
								{
								   fieldLabel: 'მისამართი',
										name: 'address1',
										value: data.address1,
								}


							]
						},
						{
							xtype: 'fieldset',
							//title: 'ძირითადი ინფორმაცია',
							margin: '5',
							padding: '5',
							defaultType: 'textfield',
							collapsible: false,
							defaults: {
								anchor: '65%'
							},
							items :[
								{
									fieldLabel: 'მობილური',
									name: 'phone2',
									value: data.phone2,
								}, {
									fieldLabel: 'სახლის ტელეფონი',
									name: 'phone1',
									value: data.phone1,
								}, {
									fieldLabel: 'სამსახურის ტელ.',
									name: 'work_phone',
									value: data.work_phone,
								}, {
									fieldLabel: 'სამუშაო ადგილი',
									name: 'work',
									value: data.work,
								},{
									fieldLabel: 'ელ-ფოსტა',
									name: 'email',
									value: data.email,
									vtype:'email',
								}

							]
						},
						{
							xtype: 'fieldset',
							margin: '5',
							padding: '5',
							defaultType: 'textfield',
							collapsible: false,
							defaults: {
								anchor: '65%'
							},
							items :[

								{

									xtype: 'fieldset',
									margin: '0 0 0 -10',

									layout: 'hbox',
									border: 'none',
									items: [
										{
											xtype: 'label',
											text: 'სისხლის ჯგუფი',
											//margins: '5 43',
											width:135
										},

										{
											xtype: comboBlood,
										}

									]
								},

								{
									xtype: 'radiogroup',
									vertical: false,
									fieldLabel: 'რეზუსი',
									padding: '5 0 0 0',
									columns: 2,
									items: [
										{boxLabel: '+', name: 'rhesus', inputValue: '46'},
										{boxLabel: '-', name: 'rhesus', inputValue: '47'},
									],

									listeners: {
										afterrender: function() {
											if(data.rhesus == '46'){
												this.setValue({ rhesus: '46' });
											}
											else {
												this.setValue({ rhesus: '47' });
											}
										}
									}


								},
								{
									xtype     : 'textareafield',
									fieldLabel: 'დამატებითი ინფორმაცია',
									name: 'info',
									value: data.info,
								}


							]
						}

					],


				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){

						var form = Ext.getCmp('edit_patient').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/patients.php?act=Update',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								params:{
									param_id:data.id
								},
								success:function(form,action){
									if(action.result.success){
										/*
										var patientForm=Ext.getCmp('patientForm').getForm();
										patientForm.reload();
										*/
										frmEditPatient.close();
										test();
										//Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditPatient.close();
								},
								failure:function(form,action){

									//Ext.Msg.alert('Message','Record failed to save');
									frmEditPatient.close();
									//var patientForm =  btn.up('form').up('form');  //Ext.getCmp('patientForm').getForm();
									//alert(patientForm.getId());
									//patientForm.reload();
									test();
									//form.loadRecord(thisModel);

								}

							});


						}



					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditPatient.close();
					}
				}]

			}]


			,
/*
			listeners:{
				'close':function(win){
					//Ext.getCmp(id+'grid_liv').getView().select(0);
					var grid = Ext.getCmp(id+'grid_liv');
					var record =grid.getStore().getAt(thisIndex);

					//CreateEditPatient(thisModel);
					if(record.data != null){
						model_edit=record.data;
						CreateEditPatient(model_edit);

					}
				}

			}
*/




		});

		frmEditPatient.show();

	}

	function test(){


		frmShowPatient.close();
		var grid=Ext.getCmp(id+'grid_liv').getStore();
		//grid.reload();
		grid.load();

		//Ext.getCmp(id+'grid_liv').getStore().load();
		//Ext.getCmp(id+'grid_liv').getView().refresh();

		storeLiv.removeAll();

		storeLiv.load();

	}




	function CreateAddCity(){

		var me=this;

		var frmAddCity= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი ქალაქი',
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
				id:id0+'f_city',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						id:id0+'txtCityName',
						labelWidth:75,
						name:id0+'txtCityName',fieldLabel:'ქალაქი',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp(id0+'f_city').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/cities.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeCities.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddCity.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddCity.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddCity.close();
					}
				}]
			}]

		});

		frmAddCity.show();
	}

	function CreateAddCountry(){

		var me=this;

		var frmAddCountry= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი ქვეყანა',
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
				id:id2+'f_country',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						id:id2+'txtCountryName',
						labelWidth:75,
						name:id2+'txtCountryName',fieldLabel:'ქვეყანა',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp(id2+'f_country').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/countries.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeCountries.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddCountry.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddCountry.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddCountry.close();
					}
				}]
			}]

		});

		frmAddCountry.show();
	}

	function CreateAddMedInfo(patient_id, reg_id){
		var me=this;

		var comboClinic = new Ext.form.ComboBox({
			name : 'clinic_id',
			width: 220,
			store: storeClinics,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'clinicdesc',
			valueField    : 'clinic_id',
			editable      : true,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('medinfo_clinic_delete_but');
							var butt2 = Ext.getCmp('medinfo_clinic_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDiagnosis = new Ext.form.ComboBox({
			name : 'diagnosis_id',
			width: 220,
			store: storeDiagnosis,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'txt',
			valueField    : 'diagnosis_id',
			editable      : false,
			forceSelection: true,
			tpl: '<tpl for="."><div class="x-boundlist-item">{txt}</div><tpl><hr /></tpl></tpl>',

			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('medinfo_diagnosis_delete_but');
							var butt2 = Ext.getCmp('medinfo_diagnosis_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDonors = new Ext.form.ComboBox({
			name : 'donor_type_id',
			width: 220,
			store: storeDonors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'donor_type_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('medinfo_donors_delete_but');
							var butt2 = Ext.getCmp('medinfo_donors_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboOperators = new Ext.form.ComboBox({
			name : 'operator_id',
			width: 220,
			store: storeDoctors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'dnameFull',
			valueField    : 'doctor_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('medinfo_operator_delete_but');
							var butt2 = Ext.getCmp('medinfo_operator_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDoctors = new Ext.form.ComboBox({
			name : 'doctor_id',
			width: 220,
			store: storeDoctors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'dnameFull',
			valueField    : 'doctor_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('medinfo_doctor_delete_but');
							var butt2 = Ext.getCmp('medinfo_doctor_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});



		var frmAddMedInfo= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი გადანერგვა',
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
				id:'add_med-info',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'გადანერგვის თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					},{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'კლინიკა',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboClinic,

							},

							{
								xtype: 'button',
								width: 18,
								height: 18,
								margin :'3 5 0 5',
								text:'+',
								icon: '../../resources/images/plus_12.png',

								handler:function(btn){
									CreateAddClinic();
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'medinfo_clinic_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

									CreateEditClinic(comboClinic.getValue());
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboClinic.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								id: 'medinfo_clinic_delete_but',
								height: 18,
								margin :'3 0 0 0',
								text:'-',
								icon: '../../resources/images/minus_12.png',

								handler:function(btn){
									DeleteClinic(comboClinic.getValue(),comboClinic.getRawValue(),this.id);
								},

								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboClinic.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}

							}
						]
					},
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დიაგნოზი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDiagnosis,
								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDiagnosis();
									}
								},
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'medinfo_diagnosis_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDiagnosis(comboDiagnosis.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDiagnosis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'medinfo_diagnosis_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDiagnosis.getValue(),comboDiagnosis.getRawValue(), this.id, storeDiagnosis,'../../server/fields/diagnosis.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDiagnosis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დონორის სტატუსი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDonors,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDonors();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'medinfo_donors_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDonors(comboDonors.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDonors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'medinfo_donors_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDonors.getValue(),comboDonors.getRawValue(), this.id, storeDonors,'../../server/fields/donors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDonors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{
							fieldLabel: 'ინფორმაცია დონორზე',
							name: 'donor_info',
							xtype: 'textfield',
							allowBlank:true,
						},
						{

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'ოპერატორი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboOperators,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDoctor();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'medinfo_operator_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDoctor(comboOperators.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboOperators.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'medinfo_operator_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboOperators.getValue(),comboOperators.getRawValue(), this.id, storeDoctors,'../../server/fields/doctors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboOperators.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'მკურნალი ექიმი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDoctors,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDoctor();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'medinfo_doctor_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDoctor(comboDoctors.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDoctors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'medinfo_doctor_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDoctors.getValue(),comboDoctors.getRawValue(), this.id, storeDoctors,'../../server/fields/doctors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDoctors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_med-info').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/med_info.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id: reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('med_info').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddMedInfo.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('med_info').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddMedInfo.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddMedInfo.close();
					}
				}]
			}]

		});

		frmAddMedInfo.show();
	}

	function CreateEditMedInfo(data){
		var me=this;

		var comboClinic = new Ext.form.ComboBox({
			name : 'clinic_id',
			width: 220,
			store: storeClinics,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'clinicdesc',
			valueField    : 'clinic_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editmedinfo_clinic_delete_but');
							var butt2 = Ext.getCmp('editmedinfo_clinic_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDiagnosis = new Ext.form.ComboBox({
			name : 'diagnosis_id',
			width: 220,
			store: storeDiagnosis,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'txt',
			valueField    : 'diagnosis_id',
			editable      : false,
			forceSelection: true,
			tpl: '<tpl for="."><div class="x-boundlist-item">{txt}</div><tpl><hr /></tpl></tpl>',

			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editmedinfo_diagnosis_delete_but');
							var butt2 = Ext.getCmp('editmedinfo_diagnosis_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDonors = new Ext.form.ComboBox({
			name : 'donor_type_id',
			width: 220,
			store: storeDonors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'donor_type_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editmedinfo_donors_delete_but');
							var butt2 = Ext.getCmp('editmedinfo_donors_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboOperators = new Ext.form.ComboBox({
			name : 'operator_id',
			width: 220,
			store: storeDoctors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'dnameFull',
			valueField    : 'doctor_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editmedinfo_operator_delete_but');
							var butt2 = Ext.getCmp('editmedinfo_operator_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboDoctors = new Ext.form.ComboBox({
			name : 'doctor_id',
			width: 220,
			store: storeDoctors,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'dnameFull',
			valueField    : 'doctor_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editmedinfo_doctor_delete_but');
							var butt2 = Ext.getCmp('editmedinfo_doctor_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});


		var transArr = data.date.split(".");
		var d = transArr[0];
		var m = parseInt(transArr[1]-1);
		var Y = transArr[2];

		var frmEditMedInfo= new Ext.window.Window({
			//height: 400,
            autoHeight: true,
			width: 550,
			title: 'გადანერგვა',
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
				id:'edit_med-info',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'გადანერგვის თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'კლინიკა',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboClinic,

							},

							{
								xtype: 'button',
								width: 18,
								height: 18,
								margin :'3 5 0 5',
								text:'+',
								icon: '../../resources/images/plus_12.png',

								handler:function(btn){

									CreateAddClinic();
								},

								listeners: {
									afterrender: function() {
										comboClinic.setValue(data.clinic_id);
									}
								}
							},

							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'editmedinfo_clinic_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

									CreateEditClinic(comboClinic.getValue());
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboClinic.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								id: 'editmedinfo_clinic_delete_but',
								height: 18,
								margin :'3 0 0 0',
								text:'-',
								icon: '../../resources/images/minus_12.png',

								handler:function(btn){
									DeleteValue(comboClinic.getValue(),comboClinic.getRawValue(),this.id, storeClinics,'../../server/fields/clinics.php?act=Delete');
								},

								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboClinic.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}

							}

						]
					 },
					 {

							xtype: 'fieldset',
							margin: '5 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დიაგნოზი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDiagnosis,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDiagnosis();
									},

									listeners: {
										afterrender: function() {
											comboDiagnosis.setValue(data.diagnosis_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editmedinfo_diagnosis_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDiagnosis(comboDiagnosis.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDiagnosis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'editmedinfo_diagnosis_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDiagnosis.getValue(),comboDiagnosis.getRawValue(), this.id, storeDiagnosis,'../../server/fields/diagnosis.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDiagnosis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
					    {

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დონორის სტატუსი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDonors,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDonors();
									},

									listeners: {
										afterrender: function() {
											comboDonors.setValue(data.donor_type_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editmedinfo_donors_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDonors(comboDonors.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDonors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'editmedinfo_donors_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDonors.getValue(),comboDonors.getRawValue(), this.id, storeDonors,'../../server/fields/donors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDonors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
					    {
							fieldLabel: 'ინფორმაცია დონორზე',
							name: 'donor_info',
							xtype: 'textfield',
							value : data.donor_info,
							allowBlank:true,
					   },
					   {

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'ოპერატორი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboOperators,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDoctor();
									},

									listeners: {
										afterrender: function() {
											comboOperators.setValue(data.operator_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editmedinfo_operator_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDoctor(comboOperators.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboOperators.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'editmedinfo_operator_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboOperators.getValue(),comboOperators.getRawValue(), this.id, storeDoctors,'../../server/fields/doctors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboOperators.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{

							xtype: 'fieldset',
							margin: '0 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'მკურნალი ექიმი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDoctors,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDoctor();
									},

									listeners: {
										afterrender: function() {
											comboDoctors.setValue(data.doctor_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editmedinfo_doctor_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDoctor(comboDoctors.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDoctors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'editmedinfo_doctor_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboDoctors.getValue(),comboDoctors.getRawValue(), this.id, storeDoctors,'../../server/fields/doctors.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDoctors.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_med-info').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/med_info.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('med_info').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditMedInfo.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('med_info').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditMedInfo.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditMedInfo.close();
					}
				}]
			}]

		});

		frmEditMedInfo.show();
	}

	function CreateAddClinic(){

		var me=this;

		var comboCity = new Ext.form.ComboBox({
			name : 'city_id',
			width: 145,
			store: storeCities,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'city_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('clinic_city_delete_but');
							var butt2 = Ext.getCmp('clinic_city_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}

                        }
                    }
                }
            }
		});

		var comboCountry = new Ext.form.ComboBox({
			name : 'country_id',
			width: 145,
			store: storeCountries,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'country_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('clinic_country_delete_but');
							var butt2 = Ext.getCmp('clinic_country_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }

		});

		var frmAddClinic= new Ext.window.Window({
			autoHeight: true,
			width: 480,
			title: 'ახალი კლინიკა',
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
				id:'f_clinic',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:135,
						name:'clinicdesc',
						fieldLabel:'კლინიკის დასახელება',
						allowBlank:false,
						width:350,
						value:''
					},
					{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
                            width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'ქვეყანა',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboCountry,
								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddCountry();
									}


								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'clinic_country_edit_but',
									height: 18,
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditCountry(comboCountry.getValue());
									}
									,
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCountry.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
								,

                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'clinic_country_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboCountry.getValue(),comboCountry.getRawValue(), this.id, storeCountries, '../../server/fields/countries.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboCountry.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
					},
					{

						   xtype: 'fieldset',
						   margin: '5 0 5 -10',
						   width: 400,
						   layout: 'hbox',
						   border: 'none',
						  items: [
								{
									xtype: 'label',
									text: 'ქალაქი',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboCity,
								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddCity();
									}


								}
								,

							  {
								  xtype: 'button',
								  width: 18,
								  id: 'clinic_city_edit_but',
								  height: 18,
								  margin :'3 5 0 0',
								  text:'+',
								  icon: '../../resources/images/edit3.png',

								  handler:function(btn){
									  //var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

									  CreateEditCity(comboCity.getValue());
								  }
								  ,
								  listeners: {
									  afterrender: function() {
										  if( acc!='r') {
											  if (comboCity.getValue() > 0)
												  this.show();
											  else
												  this.hide();
										  }
										  else
											  this.hide();
									  }
								  }

							  }
                                    ,
                              {
                                  xtype: 'button',
                                  width: 18,
                                  id: 'clinic_city_delete_but',
                                  height: 18,
                                  margin :'3 0 0 0',
                                  text:'-',
                                  icon: '../../resources/images/minus_12.png',

                                  handler:function(btn){
                                      DeleteValue(comboCity.getValue(),comboCity.getRawValue(), this.id, storeCities, '../../server/fields/cities.php?act=Delete');
                                  },

                                  listeners: {
                                      afterrender: function() {
                                          if( acc!='r') {
                                              if (comboCity.getValue() > 0)
                                                  this.show();
                                              else
                                                  this.hide();
                                          }
                                          else
                                              this.hide();
                                      }
                                  }

                              }
							]
					 },
					 {
							xtype:'textfield',
							labelWidth:135,
							name:'clinicaddressur',
							fieldLabel:'მისამართი',
							allowBlank:true,
							width:350,
							value:''
					 },
					 {
							xtype:'textfield',
							labelWidth:135,
							name:'clinicphone',
							fieldLabel:'კლინიკის ტელეფონი',
							allowBlank:true,
							width:350,
							value:''
					}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_clinic').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/clinics.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeClinics.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddClinic.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddClinic.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddClinic.close();
					}
				}]
			}]

		});

		frmAddClinic.show();
	}

	function CreateAddDiagnosis(){

		var me=this;

		var frmAddDiagnosis= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი დიაგნოზი',
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
				id:'f_diagnosis',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'txt',
						fieldLabel:'დიაგნოზი',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_diagnosis').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/diagnosis.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDiagnosis.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddDiagnosis.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddDiagnosis.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddDiagnosis.close();
					}
				}]
			}]

		});

		frmAddDiagnosis.show();
	}

	function CreateAddDonors(){

		var me=this;

		var frmAddDonors= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი დონორის სტატუსი',
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
				id:'f_donors',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'დონორი',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_donors').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/donors.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDonors.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddDonors.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddDonors.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddDonors.close();
					}
				}]
			}]

		});

		frmAddDonors.show();
	}

	function CreateAddCondition(){

		var me=this;

		var frmAddCondition= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი მდგომარეობა',
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
				id:'f_condition',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'condition',
						fieldLabel:'მდგომარეობა',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_condition').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/conditions.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeConditions.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddCondition.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddCondition.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddCondition.close();
					}
				}]
			}]

		});

		frmAddCondition.show();
	}

	function CreateAddDoctor(){

		var me=this;

		var comboClinic = new Ext.form.ComboBox({
			name : 'clinic_id',
			width: 145,
			store: storeClinics,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'clinicdesc',
			valueField    : 'clinic_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('doctor_clinic_delete_but');
							var butt2 = Ext.getCmp('doctor_clinic_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmAddDoctor= new Ext.window.Window({
			autoHeight: true,
			width: 480,
			title: 'ახალი ექიმი',
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
				id:'f_doctor',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						   xtype:'textfield',
						   labelWidth:135,
						   name:'doctorname',
						   fieldLabel:'სახელი',
						   allowBlank:true,
						   width:350,
						   value:''
					   },
					   {
						   xtype:'textfield',
						   labelWidth:135,
						   name:'doctorlastname',
						   fieldLabel:'გვარი',
						   allowBlank:true,
						   width:350,
						   value:''
					   },
						{
							xtype:'textfield',
							labelWidth:135,
							name:'phone1',
							fieldLabel:'მობილური',
							allowBlank:true,
							width:350,
							value:''
						},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'email',
							fieldLabel:'ელ-ფოსტა',
							allowBlank:true,
							width:350,
							vtype:'email',
							value:''
						},						,
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
							width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'კლინიკა',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboClinic,
								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddClinic();
									}


								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'doctor_clinic_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

										CreateEditClinic(comboClinic.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboClinic.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'doctor_clinic_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboClinic.getValue(),comboClinic.getRawValue(), this.id, storeClinics, '../../server/fields/clinics.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboClinic.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_doctor').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/doctors.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDoctors.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddDoctor.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddDoctor.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddDoctor.close();
					}
				}]
			}]

		});

		frmAddDoctor.show();
	}

	function CreateEditHistory(data){
		var me=this;

		var comboCondition = new Ext.form.ComboBox({
			name : 'condition_id',
			width: 220,
			store: storeConditions,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'condition',
			valueField    : 'condition_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('edithistory_conditions_delete_but');
							var butt2 = Ext.getCmp('edithistory_conditions_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var historyArr = data.date.split(".");
		var d = historyArr[0];
		var m = parseInt(historyArr[1]-1);
		var Y = historyArr[2];

		var frmEditHistory= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ავადმყოფობის ისტორია',
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
				id:'edit_history',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'პაციენტის მდგომარეობა',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboCondition,

							},

							{
								xtype: 'button',
                                width: 18,
                                height: 18,
								margin :'3 5 5 5',
								text:'+',
								icon: '../../resources/images/plus_12.png',

								handler:function(btn){

									CreateAddCondition();
								},

								listeners: {
									afterrender: function() {
										comboCondition.setValue(data.condition_id);
									}
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'edithistory_conditions_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									CreateEditCondition(comboCondition.getValue());
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboCondition.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
                            {
                                xtype: 'button',
                                width: 18,
                                id: 'edithistory_conditions_delete_but',
                                height: 18,
                                margin :'3 0 0 0',
                                text:'-',
                                icon: '../../resources/images/minus_12.png',

                                handler:function(btn){
                                    DeleteValue(comboCondition.getValue(),comboCondition.getRawValue(), this.id, storeConditions, '../../server/fields/conditions.php?act=Delete');
                                },

                                listeners: {
                                    afterrender: function() {
                                        if( acc!='r') {
                                            if (comboCondition.getValue() > 0)
                                                this.show();
                                            else
                                                this.hide();
                                        }
                                        else
                                            this.hide();
                                    }
                                }

                            }
						]
					},

						{
							fieldLabel: 'ჩივილები და პრობლემები',
							name: 'txt',
							xtype: 'textareafield',
							value : data.txt,
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_history').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/history.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('history').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditHistory.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('history').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditHistory.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditHistory.close();
					}
				}]
			}]

		});

		frmEditHistory.show();
	}

	function CreateAddHistory(patient_id, reg_id){
		var me=this;

		var comboCondition = new Ext.form.ComboBox({
			name : 'condition_id',
			width: 220,
			store: storeConditions,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'condition',
			valueField    : 'condition_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('history_conditions_delete_but');
							var butt2 = Ext.getCmp('history_conditions_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmAddHistory= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი ისტორია',
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
				id:'add_history',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					},{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'პაციენტის მდგომარეობა',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboCondition,

							},

							{
								xtype: 'button',
                                width: 18,
                                height: 18,
								margin :'3 5 5 5',
								text:'+',
								icon: '../../resources/images/plus_12.png',

								handler:function(btn){

									CreateAddCondition();
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'history_conditions_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									CreateEditCondition(comboCondition.getValue());
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboCondition.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
                            {
                                xtype: 'button',
                                width: 18,
                                id: 'history_conditions_delete_but',
                                height: 18,
                                margin :'3 0 0 0',
                                text:'-',
                                icon: '../../resources/images/minus_12.png',

                                handler:function(btn){
                                    DeleteValue(comboCondition.getValue(),comboCondition.getRawValue(), this.id, storeConditions, '../../server/fields/conditions.php?act=Delete');
                                },

                                listeners: {
                                    afterrender: function() {
                                        if( acc!='r') {
                                            if (comboCondition.getValue() > 0)
                                                this.show();
                                            else
                                                this.hide();
                                        }
                                        else
                                            this.hide();
                                    }
                                }

                            }
						]
					   },
						{
							fieldLabel: 'ჩივილები და პრობლემები',
							name: 'txt',
							xtype: 'textareafield',
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_history').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/history.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id: reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('history').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddHistory.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('history').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddHistory.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddHistory.close();
					}
				}]
			}]

		});

		frmAddHistory.show();
	}

/*
	function CreateEditTreatment(data){
		var me=this;

		var comboMedicines = new Ext.form.ComboBox({
			name : 'medicine_id',
			width: 260,
			store: storeMedicines,
			mode : 'local',
			listWidth     : 255,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'medicine_id',
			editable      : false,
			forceSelection: true,
		});

		var comboDosage = new Ext.form.ComboBox({
			name : 'dosage_id',
			width: 260,
			store: storeDosage,
			mode : 'local',
			listWidth     : 255,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'dosage_id',
			editable      : false,
			forceSelection: true,
		});


		var transArr = data.date.split(".");
		var d = transArr[0];
		var m = parseInt(transArr[1]-1);
		var Y = transArr[2];

		var frmEditTreatment= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'მკურნალობა',
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
				id:'edit_treatment',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},
					{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'მედიკამენტი',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboMedicines,

							},

							{
								xtype: 'button',
								width: 21,
								margin :'0 5 0 5',
								text:'+',
								icon: '../../resources/images/plus_16.png',

								handler:function(btn){

									CreateAddMedicine();
								},

								listeners: {
									afterrender: function() {
										comboMedicines.setValue(data.medicine_id);
									}
								}
							}
						]
					},
					{

							xtype: 'fieldset',
							margin: '5 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დოზა',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDosage,

								},

								{
									xtype: 'button',
									width: 21,
									margin :'0 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_16.png',

									handler:function(btn){

										CreateAddDosage();
									},

									listeners: {
										afterrender: function() {
											comboDosage.setValue(data.dosage_id);
										}
									}
								}
							]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_treatment').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/treatment.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('treatment').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditTreatment.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('treatment').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditTreatment.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditTreatment.close();
					}
				}]
			}]

		});

		frmEditTreatment.show();
	}
*/
/*
	function CreateAddTreatment(patient_id, reg_id){
		var me=this;

		var comboMedicines = new Ext.form.ComboBox({
			name : 'medicine_id',
			width: 260,
			store: storeMedicines,
			mode : 'local',
			listWidth     : 255,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'medicine_id',
			editable      : false,
			forceSelection: true,
		});

		var comboDosage = new Ext.form.ComboBox({
			name : 'dosage_id',
			width: 260,
			store: storeDosage,
			mode : 'local',
			listWidth     : 255,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'dosage_id',
			editable      : false,
			forceSelection: true,
		});


		var frmAddTreatment= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი მკურნალობა',
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
				id:'add_treatment',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					},
					{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'მედიკამენტი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboMedicines,

								},

								{
									xtype: 'button',
									width: 21,
									margin :'0 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_16.png',

									handler:function(btn){

										CreateAddMedicine();
									}
								}
							]
					},
					{

							xtype: 'fieldset',
							margin: '5 0 5 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დოზა',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDosage,

								},

								{
									xtype: 'button',
									width: 21,
									margin :'0 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_16.png',

									handler:function(btn){

										CreateAddDosage();
									}
								}
							]
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_treatment').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/treatment.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id: reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('treatment').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddTreatment.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('treatment').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddTreatment.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddTreatment.close();
					}
				}]
			}]

		});

		frmAddTreatment.show();
	}
*/
	function CreateAddAnalysis(){

		var me=this;

		var frmAddAnalysis= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი ანალიზი',
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
				id:'f_analysis',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'ანალიზი',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_analysis').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/analysis.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeAnalysis.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddAnalysis.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddAnalysis.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddAnalysis.close();
					}
				}]
			}]

		});

		frmAddAnalysis.show();
	}

	function CreateAddProcedure(){

		var me=this;

		var frmAddProcedure= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი პროცედურა',
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
				id:'f_procedure',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'პროცედურა',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_procedure').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/procedures.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeProcedures.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddProcedure.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddProcedure.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddProcedure.close();
					}
				}]
			}]

		});

		frmAddProcedure.show();
	}

	function CreateAddLabaratory(patient_id, reg_id){
		var me=this;

		var frmAddLabaratory= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი ლაბორატორია',
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
				id:'add_labaratory',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_labaratory').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/labaratory.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id:reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){

										var datar = new Array();
										var resp= Ext.JSON.decode(action.response.responseText);
										//alert(resp.data[0]['date']);
										datar["date"] =resp.data[0]['date'];
										datar["patient_id"]=resp.data[0]['patient_id'];
										datar["reg_id"]=resp.data[0]['reg_id'];
										datar["labaratory_id"]=resp.data[0]['labaratory_id'];

										var grid=Ext.getCmp('fullLabaratory').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddLabaratory.close();
									CreateEditLabaratory(datar);

								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullLabaratory').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','No Record successfully saved');
									frmAddLabaratory.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						var grid=Ext.getCmp('fullLabaratory').getStore();
						grid.reload();
						frmAddLabaratory.close();
					}
				}]
			}]

		});
		frmAddLabaratory.show();
	}

	function CreateAddInstrumental(patient_id, reg_id){
		var me=this;

		var frmAddInstrumental= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი ინსტრუმენტალური',
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
				id:'add_instrumental',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_instrumental').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/instrumental.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id:reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){

										var datar = new Array();
										var resp= Ext.JSON.decode(action.response.responseText);
										//alert(resp.data[0]['date']);
										datar["date"] =resp.data[0]['date'];
										datar["patient_id"]=resp.data[0]['patient_id'];
										datar["reg_id"]=resp.data[0]['reg_id'];
										datar["instrumental_id"]=resp.data[0]['instrumental_id'];

										var grid=Ext.getCmp('fullInstrumental').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddInstrumental.close();
									CreateEditInstrumental(datar);

								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullInstrumental').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','No Record successfully saved');
									frmAddInstrumental.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						var grid=Ext.getCmp('fullInstrumental').getStore();
						grid.reload();
						frmAddInstrumental.close();
					}
				}]
			}]

		});
		frmAddInstrumental.show();
	}

	function CreateEditLabaratory(data){
		var me=this;

		//***AVA*** add parameter to SubLab store
		storeSubLab.load({
			params: {
				labaratory_id : data.labaratory_id
			}
		});

		//***AVA*** context menu (sublab)
		var rightClickSubLab=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('sublab').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddSubLab(data.patient_id, data.labaratory_id);
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('sublab');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditSubLab(model_edit);
					}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('sublab');
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
										url: '../../server/list/sublab.php?act=Delete',
										method: 'POST',
										params:{
											patient_id:model[0].data.patient_id,
											fc:model[0].data.fc,
											labaratory_id:model[0].data.labaratory_id
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
														var grid = Ext.getCmp('sublab').getStore();
														store.load();
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


		var annArr = data.date.split(".");
		var d = annArr[0];
		var m = parseInt(annArr[1]-1);
		var Y = annArr[2];

		var frmEditLabaratory= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ლაბორატორია',
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
				id:'edit_labaratory',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},
						{
							xtype:'grid',
							id:'sublab',
							collapsible:true,
							autoScroll:true,
							store:storeSubLab,
							flex:1,
							columns:[{
								text:'ანალიზის დასახელება',
								flex:25/80,
								dataIndex:'analysis',
								/*
								 renderer: function(value, metadata) {
								 metadata.style = 'white-space: normal;';
								 return value;
								 }
								 */
							},{
								text:'მაჩვენებელი',
								flex:20/80,
								dataIndex:'value'
							}],


							listeners : {
								itemdblclick: function(dv, record, item, index, e) {
									var grid = Ext.getCmp('sublab');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										if(acc!='r') {
											model_edit = model[0].data;
											CreateEditSubLab(model_edit);
										}
									}
								}
							},

							viewConfig: {
								enableTextSelection: true,
								listeners : {
									itemcontextmenu: function(view, record, item, index,          e){
										e.stopEvent();
										if(acc!='r')
										 rightClickSubLab.showAt(e.getXY());
									}
								}
							},
							tbar:[{
								xtype:'button',
								text:'Add',
								id:'btn-c-add-sublab',
								icon: '../../resources/images/plus.png',
								handler:function(btn){
									CreateAddSubLab(data.patient_id, data.labaratory_id);
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-add-sublab',
											html: 'ახალი მკურნალობა',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Edit',
								id:'btn-c-edit-sublab',
								icon: '../../resources/images/edit.png',
								handler:function(btn){
									var grid = Ext.getCmp('sublab');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										model_edit=model[0].data;
										CreateEditSubLab(model_edit);
									}
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-edit-sublab',
											html: 'რედაქტირება',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Delete',
								id:'btn-c-sublab',
								icon: '../../resources/images/cancel.png',
								handler:function(btn){
									var grid = Ext.getCmp('sublab');
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
														url: '../../server/list/sublab.php?act=Delete',
														method: 'POST',
														params:{
															patient_id:model[0].data.patient_id,
															fc:model[0].data.fc,
															labaratory_id:model[0].data.labaratory_id
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
																		var grid = Ext.getCmp('sublab').getStore();
																		store.load();
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
											target:'btn-c-sublab',
											html: 'წაშლა',
											anchor: 'top'
										});
									}
								}
							},'->',{
								xtype:'textfield',
								fieldLabel:'ძიება',
								listeners:{
									change: function(field, newValue, oldValue, options){
										var grid = Ext.getCmp('sublab');
										grid.store.clearFilter();

										if (newValue) {
											var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
											grid.store.filter({
												filterFn: function(record) {
													return matcher.test(record.get('analysis')) ||
														matcher.test(record.get('value'));
												}
											});
										}
									}
								}
							}]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_labaratory').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/labaratory.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc,
									labaratory_id:data.labaratory_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('fullLabaratory').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditLabaratory.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullLabaratory').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditLabaratory.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						Ext.Ajax.request({
							url: '../../server/list/labaratory.php?act=Close',
							method: 'POST',
							params:{
								param_id:data.patient_id,
								labaratory_id:data.labaratory_id
							},
							success: function (response) {
								var result = Ext.JSON.decode(response.responseText);
								if (result.success) {
									;
									/*
									Ext.Msg.show({
										title: 'Information',
										icon: Ext.Msg.INFO,
										msg: 'Record successfully removed!',
										buttons: Ext.Msg.OK,
										fn: function (btn) {
											;
											grid.getStore().reload();
											grid.getView().refresh();
										}
									});
									*/
								}
							  }
							});


						var grid=Ext.getCmp('fullLabaratory').getStore();
						grid.reload();
						frmEditLabaratory.close();
					}
				}]
			}]

		});

		frmEditLabaratory.show();
	}

	function CreateEditTreatment(data){
		var me=this;

		//***AVA*** add parameter to SubLab store
		storeSubTrt.load({
			params: {
				treatment_id : data.treatment_id
			}
		});

		//***AVA*** context menu (sublab)
		var rightClickSubTrt=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('subtrt').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddSubTrt(data.patient_id, data.treatment_id);
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('subtrt');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditSubTrt(model_edit);
					}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('subtrt');
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
										url: '../../server/list/subtrt.php?act=Delete',
										method: 'POST',
										params:{
											patient_id:model[0].data.patient_id,
											fc:model[0].data.fc,
											treatment_id:model[0].data.treatment_id
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
														var grid = Ext.getCmp('subtrt').getStore();
														store.load();
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


		var annArr = data.date.split(".");
		var d = annArr[0];
		var m = parseInt(annArr[1]-1);
		var Y = annArr[2];

		var frmEditTreatment= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'მკურნალობა',
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
				id:'edit_treatment',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},
						{
							xtype:'grid',
							id:'subtrt',
							collapsible:true,
							autoScroll:true,
							store:storeSubTrt,
							flex:1,
							columns:[{
								text:'მედიკამენტი',
								flex:25/80,
								dataIndex:'med',
								/*
								 renderer: function(value, metadata) {
								 metadata.style = 'white-space: normal;';
								 return value;
								 }
								 */
							},{
								text:'დოზა',
								flex:20/80,
								dataIndex:'dosage'
							}],


							listeners : {
								itemdblclick: function(dv, record, item, index, e) {
									var grid = Ext.getCmp('subtrt');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										if(acc!='r') {
											model_edit = model[0].data;
											CreateEditSubTrt(model_edit);
										}
									}
								}
							},

							viewConfig: {
								enableTextSelection: true,
								listeners : {
									itemcontextmenu: function(view, record, item, index,          e){
										e.stopEvent();
										if(acc!='r')
											rightClickSubTrt.showAt(e.getXY());
									}
								}
							},
							tbar:[{
								xtype:'button',
								text:'Add',
								id:'btn-c-add-subtrt',
								icon: '../../resources/images/plus.png',
								handler:function(btn){
									CreateAddSubTrt(data.patient_id, data.treatment_id);
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-add-subtrt',
											html: 'ახალი მკურნალობა',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Edit',
								id:'btn-c-edit-subtrt',
								icon: '../../resources/images/edit.png',
								handler:function(btn){
									var grid = Ext.getCmp('subtrt');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										model_edit=model[0].data;
										CreateEditSubTrt(model_edit);
									}
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-edit-subtrt',
											html: 'რედაქტირება',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Delete',
								id:'btn-c-subtrt',
								icon: '../../resources/images/cancel.png',
								handler:function(btn){
									var grid = Ext.getCmp('subtrt');
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
														url: '../../server/list/subtrt.php?act=Delete',
														method: 'POST',
														params:{
															patient_id:model[0].data.patient_id,
															fc:model[0].data.fc,
															treatment_id:model[0].data.treatment_id
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
																		var grid = Ext.getCmp('subtrt').getStore();
																		store.load();
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
											target:'btn-c-subtrt',
											html: 'წაშლა',
											anchor: 'top'
										});
									}
								}
							},'->',{
								xtype:'textfield',
								fieldLabel:'ძიება',
								listeners:{
									change: function(field, newValue, oldValue, options){
										var grid = Ext.getCmp('subtrt');
										grid.store.clearFilter();

										if (newValue) {
											var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
											grid.store.filter({
												filterFn: function(record) {
													return matcher.test(record.get('med')) ||
														matcher.test(record.get('dosage'));
												}
											});
										}
									}
								}
							}]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_treatment').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/treatment.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc,
									treatment_id:data.treatment_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('fullTreatment').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditTreatment.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullTreatment').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditTreatment.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						Ext.Ajax.request({
							url: '../../server/list/treatment.php?act=Close',
							method: 'POST',
							params:{
								param_id:data.patient_id,
								treatment_id:data.treatment_id
							},
							success: function (response) {
								var result = Ext.JSON.decode(response.responseText);
								if (result.success) {
									;
									/*
									 Ext.Msg.show({
									 title: 'Information',
									 icon: Ext.Msg.INFO,
									 msg: 'Record successfully removed!',
									 buttons: Ext.Msg.OK,
									 fn: function (btn) {
									 ;
									 grid.getStore().reload();
									 grid.getView().refresh();
									 }
									 });
									 */
								}
							}
						});


						var grid=Ext.getCmp('fullTreatment').getStore();
						grid.reload();
						frmEditTreatment.close();
					}
				}]
			}]

		});

		frmEditTreatment.show();
	}

	function CreateAddTreatment(patient_id, reg_id){
		var me=this;

		var frmAddTreatment= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი მკურნალობა',
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
				id:'add_treatment',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_treatment').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/treatment.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,
									reg_id:reg_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){

										var datar = new Array();
										var resp= Ext.JSON.decode(action.response.responseText);
										//alert(resp.data[0]['date']);
										datar["date"] =resp.data[0]['date'];
										datar["patient_id"]=resp.data[0]['patient_id'];
										datar["reg_id"]=resp.data[0]['reg_id'];
										datar["treatment_id"]=resp.data[0]['treatment_id'];

										var grid=Ext.getCmp('fullTreatment').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddTreatment.close();
									CreateEditTreatment(datar);

								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullTreatment').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','No Record successfully saved');
									frmAddTreatment.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						var grid=Ext.getCmp('fullTreatment').getStore();
						grid.reload();
						frmAddTreatment.close();
					}
				}]
			}]

		});
		frmAddTreatment.show();
	}

	function CreateEditInstrumental(data){
		var me=this;

		//***AVA*** add parameter to SubIns store
		storeSubIns.load({
			params: {
				instrumental_id : data.instrumental_id
			}
		});

		//***AVA*** context menu (subins)
		var rightClickSubIns=Ext.create('Ext.menu.Menu',{
			//height:120,
			autoHeight: true,
			width:200,
			items:[{
				text:'Refresh',
				icon: '../../resources/images/refresh.png',
				handler:function(btn){
					var grid=Ext.getCmp('subins').getStore();
					grid.reload();
				}
			},{
				text:'Add',
				icon: '../../resources/images/plus.png',
				handler:function(btn){
					CreateAddSubIns(data.patient_id, data.instrumental_id);
				}
			},{
				text:'Edit',
				icon: '../../resources/images/edit.png',
				handler:function(btn){
					var grid = Ext.getCmp('subins');
					var model = grid.getSelectionModel().getSelection();
					if(model[0].data != null){
						model_edit=model[0].data;
						CreateEditSubIns(model_edit);
					}
				}
			},{
				text:'Delete',
				icon: '../../resources/images/cancel.png',
				handler:function(btn){
					var grid = Ext.getCmp('subins');
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
										url: '../../server/list/subins.php?act=Delete',
										method: 'POST',
										params:{
											patient_id:model[0].data.patient_id,
											fc:model[0].data.fc,
											instrumental_id:model[0].data.instrumental_id
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
														var grid = Ext.getCmp('subins').getStore();
														store.load();
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


		var annArr = data.date.split(".");
		var d = annArr[0];
		var m = parseInt(annArr[1]-1);
		var Y = annArr[2];

		var frmEditInstrumental= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ინსტრუმენტალური',
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
				id:'edit_instrumental',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'თარიღი',
						name: 'date',
						xtype: 'datefield',
						value : new Date(Y,m,d),
						allowBlank:false,
					},
						{
							xtype:'grid',
							id:'subins',
							collapsible:true,
							autoScroll:true,
							store:storeSubIns,
							flex:1,
							columns:[{
								text:'პროცედურის დასახელება',
								flex:25/80,
								dataIndex:'procedure',
								/*
								 renderer: function(value, metadata) {
								 metadata.style = 'white-space: normal;';
								 return value;
								 }
								 */
							},{
								text:'დასკვნა',
								flex:20/80,
								dataIndex:'value',
	    						renderer: function(value, metadata) {
								 metadata.style = 'white-space: normal;';
								 return value;
								}

							}],


							listeners : {
								itemdblclick: function(dv, record, item, index, e) {
									var grid = Ext.getCmp('subins');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										if(acc!='r') {
											model_edit = model[0].data;
											CreateEditSubIns(model_edit);
										}
									}
								}
							},

							viewConfig: {
								enableTextSelection: true,
								listeners : {
									itemcontextmenu: function(view, record, item, index,          e){
										e.stopEvent();
										if(acc!='r')
										 rightClickSubIns.showAt(e.getXY());
									}
								}
							},
							tbar:[{
								xtype:'button',
								text:'Add',
								id:'btn-c-add-subins',
								icon: '../../resources/images/plus.png',
								handler:function(btn){
									CreateAddSubIns(data.patient_id, data.instrumental_id);
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-add-subins',
											html: 'ახალი პროცედურა',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Edit',
								id:'btn-c-edit-subins',
								icon: '../../resources/images/edit.png',
								handler:function(btn){
									var grid = Ext.getCmp('subins');
									var model = grid.getSelectionModel().getSelection();
									if(model[0].data != null){
										model_edit=model[0].data;
										CreateEditSubIns(model_edit);
									}
								},
								listeners: {
									afterrender: function() {
										Ext.create('Ext.tip.ToolTip',{
											target:'btn-c-edit-subins',
											html: 'რედაქტირება',
											anchor: 'top'
										});
									}
								}
							},{
								xtype:'tbseparator',
							},{
								xtype:'button',
								text:'Delete',
								id:'btn-c-subins',
								icon: '../../resources/images/cancel.png',
								handler:function(btn){
									var grid = Ext.getCmp('subins');
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
														url: '../../server/list/subins.php?act=Delete',
														method: 'POST',
														params:{
															patient_id:model[0].data.patient_id,
															fc:model[0].data.fc,
															instrumental_id:model[0].data.instrumental_id
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
																		var grid = Ext.getCmp('subins').getStore();
																		store.load();
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
											target:'btn-c-subins',
											html: 'წაშლა',
											anchor: 'top'
										});
									}
								}
							},'->',{
								xtype:'textfield',
								fieldLabel:'ძიება',
								listeners:{
									change: function(field, newValue, oldValue, options){
										var grid = Ext.getCmp('subins');
										grid.store.clearFilter();

										if (newValue) {
											var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
											grid.store.filter({
												filterFn: function(record) {
													return matcher.test(record.get('procedure')) ||
														matcher.test(record.get('value'));
												}
											});
										}
									}
								}
							}]
						}
					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_instrumental').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/instrumental.php?act=Update',
								method:'post',
								params:{
									param_id:data.patient_id,
									fc:data.fc,
									instrumental_id:data.instrumental_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('fullInstrumental').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditInstrumental.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('fullInstrumental').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditInstrumental.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						Ext.Ajax.request({
							url: '../../server/list/instrumental.php?act=Close',
							method: 'POST',
							params:{
								param_id:data.patient_id,
								instrumental_id:data.instrumental_id
							},
							success: function (response) {
								var result = Ext.JSON.decode(response.responseText);
								if (result.success) {
									;
									/*
									 Ext.Msg.show({
									 title: 'Information',
									 icon: Ext.Msg.INFO,
									 msg: 'Record successfully removed!',
									 buttons: Ext.Msg.OK,
									 fn: function (btn) {
									 ;
									 grid.getStore().reload();
									 grid.getView().refresh();
									 }
									 });
									 */
								}
							}
						});


						var grid=Ext.getCmp('fullInstrumental').getStore();
						grid.reload();
						frmEditInstrumental.close();
					}
				}]
			}]

		});

		frmEditInstrumental.show();
	}

	function CreateAddSubLab(patient_id, labaratory_id){
		var me=this;


		var comboAnalysis = new Ext.form.ComboBox({
			name : 'analysis_id',
			width: 220,
			store: storeAnalysis,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'analysis_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('sublab_analysis_delete_but');
							var butt2 = Ext.getCmp('sublab_analysis_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmAddSubLab= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი ანალიზები',
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
				id:'add_sublab',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'ანალიზის დასახელება',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboAnalysis,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddAnalysis();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'sublab_analysis_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditAnalysis(comboAnalysis.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboAnalysis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'sublab_analysis_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboAnalysis.getValue(),comboAnalysis.getRawValue(), this.id, storeAnalysis, '../../server/fields/analysis.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboAnalysis.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						},
						{
							fieldLabel: 'მაჩვენებელი',
							name: 'value',
							xtype: 'textfield',
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_sublab').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/sublab.php?act=Add',
								method:'post',
								params:{
									patient_id:patient_id,
									labaratory_id: labaratory_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('sublab').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddSubLab.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('sublab').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddSubLab.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddSubLab.close();
					}
				}]
			}]

		});

		frmAddSubLab.show();
	}

	function CreateAddSubTrt(patient_id, treatment_id){
		var me=this;


		var comboMedicines = new Ext.form.ComboBox({
			name : 'medicine_id',
			width: 220,
			store: storeMedicines,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'medicine_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('subtrt_medicine_delete_but');
							var butt2 = Ext.getCmp('subtrt_medicine_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});

		var comboDosage = new Ext.form.ComboBox({
			name : 'dosage_id',
			width: 220,
			store: storeDosage,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'dosage_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('subtrt_dosage_delete_but');
							var butt2 = Ext.getCmp('subtrt_dosage_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmAddSubTrt= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი მედიკამენტები',
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
				id:'add_subtrt',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{
							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'მედიკამენტი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboMedicines,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddMedicine();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'subtrt_medicine_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditMedicine(comboMedicines.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboMedicines.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'subtrt_medicine_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboMedicines.getValue(),comboMedicines.getRawValue(), this.id, storeMedicines, '../../server/fields/medicines.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboMedicines.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						},
						{
							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დოზა',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDosage,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDosage();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'subtrt_dosage_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDosage(comboDosage.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDosage.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'subtrt_dosage_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboDosage.getValue(),comboDosage.getRawValue(), this.id, storeDosage, '../../server/fields/dosage.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboDosage.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_subtrt').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/subtrt.php?act=Add',
								method:'post',
								params:{
									patient_id:patient_id,
									treatment_id: treatment_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('subtrt').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddSubTrt.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('subtrt').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddSubTrt.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddSubTrt.close();
					}
				}]
			}]

		});

		frmAddSubTrt.show();
	}

	function CreateAddSubIns(patient_id, instrumental_id){
		var me=this;


		var comboProcedures = new Ext.form.ComboBox({
			name : 'procedure_id',
			width: 220,
			store: storeProcedures,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'procedure_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('subins_procedure_delete_but');
							var butt2 = Ext.getCmp('subins_procedure_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});


		var frmAddSubIns= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ახალი პროცედურა',
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
				id:'add_subins',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'ანალიზის დასახელება',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboProcedures,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddProcedure();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'subins_procedure_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditProcedure(comboProcedures.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboProcedures.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'subins_procedure_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboProcedures.getValue(),comboProcedures.getRawValue(), this.id, storeProcedures, '../../server/fields/procedures.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboProcedures.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{
							fieldLabel: 'დასკვნა',
							name: 'value',
							xtype: 'textareafield',
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_subins').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/subins.php?act=Add',
								method:'post',
								params:{
									patient_id:patient_id,
									instrumental_id: instrumental_id
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('subins').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddSubIns.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('subins').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddSubIns.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddSubIns.close();
					}
				}]
			}]

		});

		frmAddSubIns.show();
	}

	function CreateEditSubLab(data){
		var me=this;

		var comboAnalysis = new Ext.form.ComboBox({
			name : 'analysis_id',
			width: 220,
			store: storeAnalysis,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'analysis_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('editsublab_analysis_delete_but');
							var butt2 = Ext.getCmp('editsublab_analysis_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmEditSubLab= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'ლაბორატორია',
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
				id:'edit_sublab',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'ანალიზის დასახელება',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboAnalysis,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddAnalysis();
									},

									listeners: {
										afterrender: function() {
											comboAnalysis.setValue(data.analysis_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editsublab_analysis_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditAnalysis(comboAnalysis.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboAnalysis.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'editsublab_analysis_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboAnalysis.getValue(),comboAnalysis.getRawValue(), this.id, storeAnalysis, '../../server/fields/analysis.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboAnalysis.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						},
						{
							fieldLabel: 'მაჩვენებელი',
							name: 'value',
							xtype: 'textfield',
							value: data.value,
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_sublab').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/sublab.php?act=Update',
								method:'post',
								params:{
									patient_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('sublab').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditSubLab.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('sublab').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditSubLab.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditSubLab.close();
					}
				}]
			}]

		});

		frmEditSubLab.show();
	}

	function CreateEditSubTrt(data){
		var me=this;

		var comboMedicines = new Ext.form.ComboBox({
			name : 'medicine_id',
			width: 220,
			store: storeMedicines,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'medicine_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('editsubtrt_medicine_delete_but');
							var butt2 = Ext.getCmp('editsubtrt_medicine_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});

		var comboDosage = new Ext.form.ComboBox({
			name : 'dosage_id',
			width: 220,
			store: storeDosage,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'dosage_id',
			editable      : false,
			forceSelection: true,
            listeners: {
                select:{
                    fn:function(combo, value) {
                        if( acc!='r') {
                            var butt = Ext.getCmp('editsubtrt_dosage_delete_but');
							var butt2 = Ext.getCmp('editsubtrt_dosage_edit_but');
                            if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
                            else {
								butt.hide();
								butt2.hide();
							}
                        }
                    }
                }
            }
		});


		var frmEditSubTrt= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'მკურნალობა',
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
				id:'edit_subtrt',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'მედიკამენტი',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboMedicines,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddMedicine();
									},

									listeners: {
										afterrender: function() {
											comboMedicines.setValue(data.medicine_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editsubtrt_medicine_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditMedicine(comboMedicines.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboMedicines.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'editsubtrt_medicine_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboMedicines.getValue(),comboMedicines.getRawValue(), this.id, storeMedicines, '../../server/fields/medicines.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboMedicines.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						},
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'დოზა',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboDosage,

								},

								{
									xtype: 'button',
                                    width: 18,
                                    height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddDosage();
									},

									listeners: {
										afterrender: function() {
											comboDosage.setValue(data.dosage_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editsubtrt_dosage_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditDosage(comboDosage.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboDosage.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
                                {
                                    xtype: 'button',
                                    width: 18,
                                    id: 'editsubtrt_dosage_delete_but',
                                    height: 18,
                                    margin :'3 0 0 0',
                                    text:'-',
                                    icon: '../../resources/images/minus_12.png',

                                    handler:function(btn){
                                        DeleteValue(comboDosage.getValue(),comboDosage.getRawValue(), this.id, storeDosage, '../../server/fields/dosage.php?act=Delete');
                                    },

                                    listeners: {
                                        afterrender: function() {
                                            if( acc!='r') {
                                                if (comboDosage.getValue() > 0)
                                                    this.show();
                                                else
                                                    this.hide();
                                            }
                                            else
                                                this.hide();
                                        }
                                    }

                                }
							]
						},

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_subtrt').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/subtrt.php?act=Update',
								method:'post',
								params:{
									patient_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('subtrt').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditSubTrt.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('subtrt').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditSubTrt.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditSubTrt.close();
					}
				}]
			}]

		});

		frmEditSubTrt.show();
	}

	function CreateEditSubIns(data){
		var me=this;

		var comboProcedures = new Ext.form.ComboBox({
			name : 'procedure_id',
			width: 220,
			store: storeProcedures,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'procedure_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('editsubins_procedure_delete_but');
							var butt2 = Ext.getCmp('editsubins_procedure_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});


		var frmEditSubIns= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'პროცედურა',
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
				id:'edit_subins',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[
						{

							xtype: 'fieldset',
							margin: '0 0 0 -10',

							layout: 'hbox',
							border: 'none',
							width: 500,
							items: [
								{
									xtype: 'label',
									text: 'პროცედურის დასახელება',
									//margins: '5 43',
									width:165
								},

								{
									xtype: comboProcedures,

								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 5 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddProcedure();
									},

									listeners: {
										afterrender: function() {
											comboProcedures.setValue(data.procedure_id);
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'editsubins_procedure_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditProcedure(comboProcedures.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboProcedures.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'editsubins_procedure_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboProcedures.getValue(),comboProcedures.getRawValue(), this.id, storeProcedures, '../../server/fields/procedures.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboProcedures.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{
							fieldLabel: 'დასკვნა',
							name: 'value',
							xtype: 'textareafield',
							value: data.value,
							allowBlank:true,
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('edit_subins').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/subins.php?act=Update',
								method:'post',
								params:{
									patient_id:data.patient_id,
									fc:data.fc
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										var grid=Ext.getCmp('subins').getStore();
										grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditSubIns.close();
								},
								failure:function(form,action){
									var grid=Ext.getCmp('subins').getStore();
									grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmEditSubIns.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditSubIns.close();
					}
				}]
			}]

		});

		frmEditSubIns.show();
	}

	function CreateAddMedicine(){

		var me=this;

		var frmAddMedicine= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი მედიკამენტი',
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
				id:'f_medicine',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'მედიკამენტი',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_medicine').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/medicines.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeMedicines.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddMedicine.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddMedicine.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddMedicine.close();
					}
				}]
			}]

		});

		frmAddMedicine.show();
	}

	function CreateAddDosage(){

		var me=this;

		var frmAddDosage= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი დოზა',
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
				id:'f_dosage',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'დოზა',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_dosage').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/dosage.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDosage.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddDosage.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddDosage.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddDosage.close();
					}
				}]
			}]

		});

		frmAddDosage.show();
	}

    function CreateAddReg(patient_id){

        var me=this;

        var comboCats = new Ext.form.ComboBox({
            name : 'category_id',
            width: 220,
            store: cats,
            // mode : 'local',
            queryMode: 'local',
            listWidth     : 215,
            triggerAction : 'all',
            displayField  : 'category_name',
            valueField    : 'category_id',
            editable      : false,
            forceSelection: true,
            emptyText: 'Select Category...',
			listeners: {
				select:{
					fn:function(combo, value) {
						if(combo.getValue() == 45)
							CreateAddPatientRemovals(patient_id);
						//Or simply: me.test();
						if( acc!='r') {
							var butt = Ext.getCmp('reg_cats_delete_but');
							var butt2 = Ext.getCmp('reg_cats_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
        });

        var comboCatsSub = new Ext.form.ComboBox({
            name : 'category_id',
            width: 220,
            store: catsSub,
            mode : 'local',
            queryMode: 'local',
            listWidth     : 215,
            //triggerAction : 'all',
            displayField  : 'category_name',
            valueField    : 'category_id',
            editable      : false,
            forceSelection: true,
            emptyText: 'Select Subcategory...',
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('reg_subcats_delete_but');
							var butt2 = Ext.getCmp('reg_subcats_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}

        });




        Ext.ux.SetCascading(comboCats, comboCatsSub);


        var frmAddReg= new Ext.window.Window({
            //height: 400,
            autoHeight: true,
            width: 550,
            title: 'ახალი რეგისტრატურა',
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
                id:'add_med-info',
                border:0,
                items:[{
                    xtype:'panel',
                    layout:'vbox',
                    autoWidth: true,
                    border:0,
                    bodyPadding:10,
                    defaultType: 'textfield',
                    defaults: {
                        width:450,
                        labelWidth:160,
                    },
                    items:[
                       {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',

                        layout: 'hbox',
                        border: 'none',
                        width: 500,
                        items: [
                            {
                                xtype: 'label',
                                text: 'კატეგორიები',
                                //margins: '5 43',
                                width:165
                            },

                            {
                                xtype: comboCats,

                            },

                            {
                                xtype: 'button',
								width: 18,
								height: 18,
                                margin :'3 5 0 5',
                                text:'+',
                                icon: '../../resources/images/plus_12.png',

                                handler:function(btn){

                                    CreateAddCats();
                                }
                            }
                            ,
							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'reg_cats_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									CreateEditCats(comboCats.getValue(),0);
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboCats.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								id: 'reg_cats_delete_but',
								height: 18,
								margin :'3 0 0 0',
								text:'-',
								icon: '../../resources/images/minus_12.png',

								handler:function(btn){
									DeleteValue(comboCats.getValue(),comboCats.getRawValue(), this.id, cats, '../../server/fields/cats.php?act=Delete');
								},

								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboCats.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}

							}
                        ]
                    },
                        {

                            xtype: 'fieldset',
                            margin: '5 0 5 -10',

                            layout: 'hbox',
                            border: 'none',
                            width: 500,
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'ქვეკატეგორიები',
                                    //margins: '5 43',
                                    width:165
                                },

                                {
                                    xtype: comboCatsSub

                                }
                                ,

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',

									handler:function(btn){

										CreateAddCats();
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'reg_subcats_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										CreateEditCats(comboCatsSub.getValue(),1);
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCatsSub.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'reg_subcats_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboCatsSub.getValue(),comboCatsSub.getRawValue(), this.id, cats, '../../server/fields/cats.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCatsSub.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}

                            ]
                        }

                    ]
                }],
                buttons:[{
                    xtype:'button',
                    text:'Save',
                    icon: '../../resources/images/ok.png',
                    handler:function(btn){
                        var form = Ext.getCmp('add_med-info').getForm();
                        if(form.isValid()){
                            form.submit({
                                url:'../../server/fields/categories.php?act=Add',
                                method:'post',
                                params:{
                                    patient_id:patient_id,
                                    category_id: comboCatsSub.getValue()
                                },
                                waitMsg:'Please wait...',
                                reset:true,
                                success:function(form,action){
                                    if(action.result.success){
                                        Ext.Msg.alert('Message','Record successfully saved');
                                    }else{
                                        Ext.Msg.alert('Message','Record failed to save');
                                    }
                                    frmAddReg.close();
                                },
                                failure:function(form,action){

                                    //***AVA*** check failure
                                    //Ext.Msg.alert('Message','Record failed to save');
                                    Ext.Msg.alert('Message','Record successfully saved');
                                    frmAddReg.close();
                                }

                            });
                        }
                    }
                },{
                    xtype:'button',
                    text:'Close',
                    icon: '../../resources/images/cancel.png',
                    handler:function(btn){
                        frmAddReg.close();
                    }
                }]
            }]

        });

        frmAddReg.show();
    }

    function CreateAddCats(){

        var me=this;

        var comboParentCats = new Ext.form.ComboBox({
            name : 'parent_category_id',
            width: 185,
            store: cats,
            // mode : 'local',
            queryMode: 'local',
            listWidth     : 185,
            triggerAction : 'all',
            displayField  : 'category_name',
            valueField    : 'category_id',
            editable      : false,
            forceSelection: true,
            emptyText: 'Select Category...'
        });


        var frmAddCats= new Ext.window.Window({
            autoHeight: true,
            width: 480,
            title: 'ახალი კატეგორია',
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
                id:'f_cats',
                border:0,
                items:[{
                    xtype:'panel',
                    layout:'vbox',
                    autoWidth: true,
                    bodyPadding:10,
                    items:[{
                        xtype:'textfield',
                        labelWidth:135,
                        name:'category_name',
                        fieldLabel:'დასახელება',
                        allowBlank:false,
                        width:350,
                        value:''
                    },
                        {
                            xtype:'textfield',
                            labelWidth:135,
                            name:'prefix',
                            fieldLabel:'პრეფიქსი',
                            allowBlank:true,
                            width:350,
                            value:''
                        },
                        {

                            xtype: 'fieldset',
                            margin: '5 0 5 -10',
                            width: 400,
                            layout: 'hbox',
                            border: 'none',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'მშობელი კატეგორია',
                                    //margins: '5 43',
                                    width:140
                                },

                                {
                                    xtype: comboParentCats,
                                }

                            ]
                        }

                    ]
                }],
                buttons:[{
                    xtype:'button',
                    text:'შენახვა',
                    icon: '../../resources/images/ok.png',
                    handler:function(btn){
                        var form = Ext.getCmp('f_cats').getForm();
                        if(form.isValid()){
                            form.submit({
                                url:'../../server/fields/cats.php?act=Add',
                                method:'post',
                                waitMsg:'Please wait...',
                                reset:true,
                                success:function(form,action){
                                    if(action.result.success){
                                        //var grid=Ext.getCmp(id+'grid_city').getStore();
                                        cats.reload();
                                        catsSub.reload();
                                        Ext.Msg.alert('Message','Record successfully saved');
                                    }else{
                                        Ext.Msg.alert('Message','Record failed to save');
                                    }
                                    frmAddCats.close();
                                },
                                failure:function(form,action){
                                    Ext.Msg.alert('Message','Record failed to save');
                                    frmAddCats.close();
                                }

                            });
                        }
                    }
                },{
                    xtype:'button',
                    text:'Close',
                    icon: '../../resources/images/cancel.png',
                    handler:function(btn){
                        frmAddCats.close();
                    }
                }]
            }]

        });

        frmAddCats.show();
    }


	function CreateAddPatientRemovals(patient_id){
		var me=this;

		var comboRemovals = new Ext.form.ComboBox({
			name : 'removal_id',
			width: 220,
			store: storeRemovals,
			mode : 'local',
			listWidth     : 215,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'removal_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('removals_delete_but');
							var butt2 = Ext.getCmp('removals_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});


		var frmAddPatientRemovals= new Ext.window.Window({
			//height: 400,
			autoHeight: true,
			width: 550,
			title: 'მოხსნა',
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
				id:'add_removal',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					border:0,
					bodyPadding:10,
					defaultType: 'textfield',
					defaults: {
						width:450,
						labelWidth:160,
					},
					items:[,{
						fieldLabel: 'მოხსნის თარიღი',
						name: 'date',
						xtype: 'datefield',
						allowBlank:false,
					},{

						xtype: 'fieldset',
						margin: '0 0 0 -10',

						layout: 'hbox',
						border: 'none',
						width: 500,
						items: [
							{
								xtype: 'label',
								text: 'მოხსნის მიზეზი',
								//margins: '5 43',
								width:165
							},

							{
								xtype: comboRemovals,

							},

							{
								xtype: 'button',
								width: 18,
								height: 18,
								margin :'3 5 5 5',
								text:'+',
								icon: '../../resources/images/plus_12.png',

								handler:function(btn){

									CreateAddRemovals();
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								height: 18,
								id: 'removals_edit_but',
								margin :'3 5 0 0',
								text:'+',
								icon: '../../resources/images/edit3.png',

								handler:function(btn){
									CreateEditRemovals(comboRemovals.getValue(),0);
								},
								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboRemovals.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}
							}
							,
							{
								xtype: 'button',
								width: 18,
								id: 'removals_delete_but',
								height: 18,
								margin :'3 0 0 0',
								text:'-',
								icon: '../../resources/images/minus_12.png',

								handler:function(btn){
									DeleteValue(comboRemovals.getValue(),comboRemovals.getRawValue(), this.id, storeRemovals, '../../server/fields/removals.php?act=Delete');
								},

								listeners: {
									afterrender: function() {
										if( acc!='r') {
											if (comboRemovals.getValue() > 0)
												this.show();
											else
												this.hide();
										}
										else
											this.hide();
									}
								}

							}
						]
					}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'Save',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('add_removal').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/list/patientremovals.php?act=Add',
								method:'post',
								params:{
									param_id:patient_id,

								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp('history').getStore();
										//grid.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddPatientRemovals.close();
								},
								failure:function(form,action){
									//var grid=Ext.getCmp('history').getStore();
									//grid.reload();
									//***AVA*** check failure
									//Ext.Msg.alert('Message','Record failed to save');
									Ext.Msg.alert('Message','Record successfully saved');
									frmAddPatientRemovals.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddPatientRemovals.close();
					}
				}]
			}]

		});

		frmAddPatientRemovals.show();
	}

	function CreateAddRemovals(){

		var me=this;

		var frmAddRemoval= new Ext.window.Window({
			height: 130,
			width: 400,
			title: 'ახალი მოხსნა',
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
				id:'f_removal',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'მოხსნა',
						allowBlank:false,
						width:350,
						value:''
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('f_removal').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/removals.php?act=Add',
								method:'post',
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeRemovals.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmAddRemoval.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmAddRemoval.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmAddRemoval.close();
					}
				}]
			}]

		});

		frmAddRemoval.show();
	}

	function DeleteValue(value, text, id, store, url){
		Ext.Msg.show({
			title: 'Confirm',
			msg: 'Are you sure you want to permanently delete "' +  text + '"?',
			icon: Ext.Msg.QUESTION,
			buttons: Ext.Msg.YESNO,
			fn: function (btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url:url,
						method: 'POST',
						params:{
							param_id:value,
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
										store.reload();
										var butt = Ext.getCmp(id);
										butt.hide();
									}
								});
							} else {
								Ext.Msg.show({
									title: 'Error',
									icon: Ext.Msg.ERROR,
									msg: 'Record failed deleted! '+ result.responseStatusObject.reason,
									buttons: Ext.Msg.OK,
									fn: function () {
										store.reload();
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


	//***AVA***  EDITORS

	function CreateEditCity(id){

		var me=this;

		var record = storeCities.findRecord('city_id', id);

		var frmEditCity= new Ext.window.Window({
			height: 130,
			width: 430,
			title: 'ქალაქი',
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
				id:'fe_city',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'ქალაქი',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_city').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/cities.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeCities.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditCity.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditCity.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditCity.close();
					}
				}]
			}]

		});

		frmEditCity.show();
	}

	function CreateEditCountry(id){

		var me=this;

		var record = storeCountries.findRecord('country_id', id);

		var frmEditCountry= new Ext.window.Window({
			height: 130,
			width: 430,
			title: 'ქვეყანა',
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
				id:'fe_country',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'ქვეყანა',
						allowBlank:false,
						width:350,
						value: record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_country').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/countries.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeCountries.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditCountry.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditCountry.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditCountry.close();
					}
				}]
			}]

		});

		frmEditCountry.show();
	}

	function CreateEditClinic(id){

		var me=this;

		var record = storeClinics.findRecord('clinic_id', id);

		var comboCity = new Ext.form.ComboBox({
			name : 'city_id',
			width: 145,
			store: storeCities,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'city_id',
			editable      : true,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('clinic_city_delete_but');
							var butt2 = Ext.getCmp('clinic_city_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});

		var comboCountry = new Ext.form.ComboBox({
			name : 'country_id',
			width: 145,
			store: storeCountries,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'name',
			valueField    : 'country_id',
			editable      : true,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('clinic_country_delete_but');
							var butt2 = Ext.getCmp('clinic_country_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}

		});

		var frmEditClinic= new Ext.window.Window({
			autoHeight: true,
			width: 480,
			title: 'კლინიკა',
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
				id:'fe_clinic',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:135,
						name:'clinicdesc',
						value:  record.get('clinicdesc'),
						fieldLabel:'კლინიკის დასახელება',
						allowBlank:false,
						width:350,

					},
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
							width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'ქვეყანა',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboCountry,
								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddCountry();
									},

									listeners: {
										afterrender: function() {
											comboCountry.setValue(record.get('country_id'));
										}
									}

								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'clinic_country_edit_but',
									height: 18,
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
	  								  CreateEditCountry(comboCountry.getValue());
									}
									,
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCountry.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'clinic_country_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboCountry.getValue(),comboCountry.getRawValue(), this.id, storeCountries, '../../server/fields/countries.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCountry.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
							width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'ქალაქი',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboCity,
								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddCity();
									},

									listeners: {
										afterrender: function() {
											comboCity.setValue(record.get('city_id'));
										}
									}

								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'clinic_city_edit_but',
									height: 18,
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

										CreateEditCity(comboCity.getValue());
									}
									,
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCity.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'clinic_city_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboCity.getValue(),comboCity.getRawValue(), this.id, storeCities, '../../server/fields/cities.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboCity.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'clinicaddressur',
							value: record.get('clinicaddressur'),
							fieldLabel:'მისამართი',
							allowBlank:true,
							width:350,

						},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'clinicphone',
							value: record.get('clinicphone'),
							fieldLabel:'კლინიკის ტელეფონი',
							allowBlank:true,
							width:350,

						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_clinic').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/clinics.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeClinics.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditClinic.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditClinic.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditClinic.close();
					}
				}]
			}]

		});

		frmEditClinic.show();
	}

	function CreateEditDiagnosis(id){

		var me=this;

		var record = storeDiagnosis.findRecord('diagnosis_id', id);

		var frmEditDiagnosis= new Ext.window.Window({
			height: 130,
			width: 430,
			title: 'დიაგნოზი',
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
				id:'fe_diagnosis',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'txt',
						fieldLabel:'დიაგნოზი',
						allowBlank:false,
						width:350,
						value: record.get('txt')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_diagnosis').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/diagnosis.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDiagnosis.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditDiagnosis.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditDiagnosis.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditDiagnosis.close();
					}
				}]
			}]

		});

		frmEditDiagnosis.show();
	}

	function CreateEditDonors(id){

		var me=this;

		var record = storeDonors.findRecord('donor_type_id', id);

		var frmEditDonors= new Ext.window.Window({
			height: 130,
			width: 430,
			title: 'დონორის სტატუსი',
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
				id:'fe_donors',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'დონორი',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_donors').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/donors.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDonors.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditDonors.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditDonors.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditDonors.close();
					}
				}]
			}]

		});

		frmEditDonors.show();
	}

	function CreateEditCondition(id){

		var me=this;

		var record = storeConditions.findRecord('condition_id', id);

		var frmEditCondition= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'მდგომარეობა',
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
				id:'fe_condition',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'condition',
						fieldLabel:'მდგომარეობა',
						allowBlank:false,
						width:350,
						value:record.get('condition')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_condition').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/conditions.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeConditions.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditCondition.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditCondition.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditCondition.close();
					}
				}]
			}]

		});

		frmEditCondition.show();
	}

	function CreateEditDoctor(id){

		var me=this;

		var record = storeDoctors.findRecord('doctor_id', id);

		var comboClinic = new Ext.form.ComboBox({
			name : 'clinic_id',
			width: 145,
			store: storeClinics,
			mode : 'local',
			listWidth     : 145,
			triggerAction : 'all',
			displayField  : 'clinicdesc',
			valueField    : 'clinic_id',
			editable      : false,
			forceSelection: true,
			listeners: {
				select:{
					fn:function(combo, value) {
						if( acc!='r') {
							var butt = Ext.getCmp('doctor_clinic_delete_but');
							var butt2 = Ext.getCmp('doctor_clinic_edit_but');
							if (combo.getValue() > 0) {
								butt.show();
								butt2.show();
							}
							else {
								butt.hide();
								butt2.hide();
							}
						}
					}
				}
			}
		});


		var frmEditDoctor= new Ext.window.Window({
			autoHeight: true,
			width: 480,
			title: 'ექიმი',
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
				id:'fe_doctor',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:135,
						name:'doctorname',
						fieldLabel:'სახელი',
						allowBlank:true,
						width:350,
						value:record.get('doctorname')
					},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'doctorlastname',
							fieldLabel:'გვარი',
							allowBlank:true,
							width:350,
							value:record.get('doctorlastname')
						},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'phone1',
							fieldLabel:'მობილური',
							allowBlank:true,
							width:350,
							value:record.get('phone1')
						},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'email',
							fieldLabel:'ელ-ფოსტა',
							allowBlank:true,
							width:350,
							vtype:'email',
							value:record.get('email')
						},						,
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
							width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'კლინიკა',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboClinic,
								},

								{
									xtype: 'button',
									width: 18,
									height: 18,
									margin :'3 5 0 5',
									text:'+',
									icon: '../../resources/images/plus_12.png',
									handler:function(btn){
										CreateAddClinic();
									}
									,
									listeners: {
										afterrender: function() {
											comboClinic.setValue(record.get('clinic_id'));
										}
									}

								}
								,
								{
									xtype: 'button',
									width: 18,
									height: 18,
									id: 'doctor_clinic_edit_but',
									margin :'3 5 0 0',
									text:'+',
									icon: '../../resources/images/edit3.png',

									handler:function(btn){
										//var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);

										CreateEditClinic(comboClinic.getValue());
									},
									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboClinic.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}
								}
								,
								{
									xtype: 'button',
									width: 18,
									id: 'doctor_clinic_delete_but',
									height: 18,
									margin :'3 0 0 0',
									text:'-',
									icon: '../../resources/images/minus_12.png',

									handler:function(btn){
										DeleteValue(comboClinic.getValue(),comboClinic.getRawValue(), this.id, storeClinics, '../../server/fields/clinics.php?act=Delete');
									},

									listeners: {
										afterrender: function() {
											if( acc!='r') {
												if (comboClinic.getValue() > 0)
													this.show();
												else
													this.hide();
											}
											else
												this.hide();
										}
									}

								}
							]
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_doctor').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/doctors.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDoctors.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditDoctor.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditDoctor.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditDoctor.close();
					}
				}]
			}]

		});

		frmEditDoctor.show();
	}

	function CreateEditAnalysis(id){

		var me=this;

		var record = storeAnalysis.findRecord('analysis_id', id);

		var frmEditAnalysis= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'ანალიზი',
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
				id:'fe_analysis',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'ანალიზი',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_analysis').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/analysis.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeAnalysis.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditAnalysis.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditAnalysis.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditAnalysis.close();
					}
				}]
			}]

		});

		frmEditAnalysis.show();
	}

	function CreateEditProcedure(id){

		var me=this;

		var record = storeProcedures.findRecord('procedure_id', id);

		var frmEditProcedure= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'პროცედურა',
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
				id:'fe_procedure',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'პროცედურა',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_procedure').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/procedures.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeProcedures.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditProcedure.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditProcedure.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditProcedure.close();
					}
				}]
			}]

		});

		frmEditProcedure.show();
	}

	function CreateEditMedicine(id){

		var me=this;

		var record = storeMedicines.findRecord('medicine_id', id);

		var frmEditMedicine= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'მედიკამენტი',
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
				id:'fe_medicine',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'მედიკამენტი',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_medicine').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/medicines.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeMedicines.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditMedicine.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditMedicine.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditMedicine.close();
					}
				}]
			}]

		});

		frmEditMedicine.show();
	}

	function CreateEditDosage(id){

		var me=this;

		var record = storeDosage.findRecord('dosage_id', id);

		var frmEditDosage= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'დოზა',
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
				id:'fe_dosage',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'დოზა',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_dosage').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/dosage.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeDosage.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditDosage.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditDosage.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditDosage.close();
					}
				}]
			}]

		});

		frmEditDosage.show();
	}

	function CreateEditCats(id, sub){

		var me=this;

		if(sub == 0)
		  var record = cats.findRecord('category_id', id);
		else
		  var record = catsSub.findRecord('category_id', id);

		var comboParentCats = new Ext.form.ComboBox({
			name : 'parent_category_id',
			width: 185,
			store: cats,
			// mode : 'local',
			queryMode: 'local',
			listWidth     : 185,
			triggerAction : 'all',
			displayField  : 'category_name',
			valueField    : 'category_id',
			editable      : false,
			forceSelection: true,
			emptyText: 'Select Category...'
		});


		var frmEditCats= new Ext.window.Window({
			autoHeight: true,
			width: 480,
			title: 'კატეგორია',
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
				id:'fe_cats',
				border:0,
				items:[{
					xtype:'panel',
					layout:'vbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:135,
						name:'category_name',
						fieldLabel:'დასახელება',
						allowBlank:false,
						width:350,
						value:record.get('category_name')
					},
						{
							xtype:'textfield',
							labelWidth:135,
							name:'prefix',
							fieldLabel:'პრეფიქსი',
							allowBlank:true,
							width:350,
							value:record.get('prefix')
						},
						{

							xtype: 'fieldset',
							margin: '5 0 5 -10',
							width: 400,
							layout: 'hbox',
							border: 'none',
							items: [
								{
									xtype: 'label',
									text: 'მშობელი კატეგორია',
									//margins: '5 43',
									width:140
								},

								{
									xtype: comboParentCats,

								}


							]
							,
							listeners: {

								afterrender: function() {
									comboParentCats.setValue(record.get('parent_category_id'));
								}
							}
						}

					]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_cats').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/cats.php?act=Update',
								method:'post',
								params:{
									category_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										cats.reload();
										catsSub.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditCats.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditCats.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditCats.close();
					}
				}]
			}]

		});

		frmEditCats.show();
	}

	function CreateEditRemovals(id){

		var me=this;

		var record = storeRemovals.findRecord('removal_id', id);

		var frmEditRemoval= new Ext.window.Window({
			height: 130,
			width: 420,
			title: 'მოხსნა',
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
				id:'fe_removal',
				border:0,
				items:[{
					xtype:'panel',
					layout:'hbox',
					autoWidth: true,
					bodyPadding:10,
					items:[{
						xtype:'textfield',
						labelWidth:75,
						name:'name',
						fieldLabel:'მოხსნა',
						allowBlank:false,
						width:350,
						value:record.get('name')
					}]
				}],
				buttons:[{
					xtype:'button',
					text:'შენახვა',
					icon: '../../resources/images/ok.png',
					handler:function(btn){
						var form = Ext.getCmp('fe_removal').getForm();
						if(form.isValid()){
							form.submit({
								url:'../../server/fields/removals.php?act=Update',
								method:'post',
								params:{
									param_id:id,
								},
								waitMsg:'Please wait...',
								reset:true,
								success:function(form,action){
									if(action.result.success){
										//var grid=Ext.getCmp(id+'grid_city').getStore();
										storeRemovals.reload();
										Ext.Msg.alert('Message','Record successfully saved');
									}else{
										Ext.Msg.alert('Message','Record failed to save');
									}
									frmEditRemoval.close();
								},
								failure:function(form,action){
									Ext.Msg.alert('Message','Record failed to save');
									frmEditRemoval.close();
								}

							});
						}
					}
				},{
					xtype:'button',
					text:'Close',
					icon: '../../resources/images/cancel.png',
					handler:function(btn){
						frmEditRemoval.close();
					}
				}]
			}]

		});

		frmEditRemoval.show();
	}

		 Ext.onReady(function() {
            win.show();
        });


});