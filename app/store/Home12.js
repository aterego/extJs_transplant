// JavaScript Document
Ext.define('Ext.mod.store.Home12',{
	extend: 'Ext.data.Store',
	model:'Ext.mod.model.Home12',
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
            		read: '../../server/list/home12.php?act=View'
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