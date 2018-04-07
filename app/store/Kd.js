// JavaScript Document
Ext.define('Ext.mod.store.Kd',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Kd',
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
            		read: '../../server/list/kd.php?act=View'
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