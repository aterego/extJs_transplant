// JavaScript Document
Ext.define('Ext.mod.store.SubIns',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.SubIns',
		autoLoad: { params: { start: 0, limit: 100 } },
		autoSync:true,
		expandData: true,
    	pageSize: 100,
		proxy: {
			actionMethods: {
        			read: 'POST'
   			 },
        		type: 'ajax',
				api: {
            		read: '../../server/list/subins.php?act=View'
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