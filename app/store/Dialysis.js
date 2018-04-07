// JavaScript Document
Ext.define('Ext.mod.store.Dialysis',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Dialysis',
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
            		read: '../../server/list/dialysis.php?act=View'
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