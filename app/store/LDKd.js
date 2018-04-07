// JavaScript Document
Ext.define('Ext.mod.store.LDKd',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.LDKd',
		autoLoad:{ params: { start: 0, limit: 25 } },
		autoSync:true,
		expandData: true,
    	pageSize: 25,
		proxy: {
			actionMethods: {
        			read: 'POST'
   			 },
        		type: 'ajax',
				api: {
            		read: '../../server/list/ldkd.php?act=View'
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