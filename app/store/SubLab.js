// JavaScript Document
Ext.define('Ext.mod.store.SubLab',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.SubLab',
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
            		read: '../../server/list/sublab.php?act=View'
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