// JavaScript Document
Ext.define('Ext.mod.store.HomeClinic11',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.HomeClinic11',
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
            		read: '../../server/list/homeClinic11.php'
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