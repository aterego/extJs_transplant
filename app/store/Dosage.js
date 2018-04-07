// JavaScript Document
Ext.define('Ext.mod.store.Dosage',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Dosage',
		autoLoad:true,
		autoSync:true,
		expandData: true,
    	pageSize: 100,
		proxy: {
			actionMethods: {
        			create: 'POST',
        			destroy: 'DELETE',
        			read: 'POST',
        			update: 'POST'
   			 },
        		type: 'ajax',
				api: {
            		read: '../../server/fields/dosage.php?act=View'
        		},
        		reader:{
				type:'json',
				root:'item'	
			},
			writer: {
                type: 'json'
            },
         },
});