// JavaScript Document
Ext.define('Ext.mod.store.History',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.History',
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
            		read: '../../server/list/history.php?act=View'
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