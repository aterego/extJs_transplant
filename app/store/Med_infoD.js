// JavaScript Document
Ext.define('Ext.mod.store.Med_infoD',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Med_infoD',
		autoLoad:{ params: { start: 0, limit: 15 } },
		autoSync:true,
		expandData: true,
    	pageSize: 15,
		proxy: {
			actionMethods: {
        			read: 'POST'
   			 },
        		type: 'ajax',
				api: {
            		read: '../../server/list/med_info.php?act=View&donor=1'
        		},
        		reader:{
				type:'json',
				root:'items'	,
				totalProperty: 'totalCount'
			},
			writer: {
                type: 'json'
            },
         },
});