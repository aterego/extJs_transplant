// JavaScript Document
Ext.define('Ext.mod.store.HomeClinic4',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.HomeClinic4',
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
            		read: '../../server/list/homeClinic4.php'
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