// JavaScript Document
Ext.define('Ext.mod.store.Home3',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Home3',
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
            		read: '../../server/list/home3.php'
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