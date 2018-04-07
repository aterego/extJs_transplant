// JavaScript Document
Ext.define('Ext.mod.store.Home4',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Home4',
		autoLoad: true,
		autoSync:true,
		expandData: true,
    	pageSize: 15,
		proxy: {
			actionMethods: {
        			read: 'POST'
   			 },
        		type: 'ajax',
				api: {
            		read: '../../server/list/home4.php'
        		},
        		reader:{
				type:'json',
				root:'items'

			},
			writer: {
                type: 'json'
            },
         },
});