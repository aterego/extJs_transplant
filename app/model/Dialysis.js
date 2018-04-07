// JavaScript Document
Ext.define('Ext.mod.model.Dialysis',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'dialysis_id',type:'integer'},
		{name:'dialysis',type:'string'},
		{name:'date', type:'string'}
	],
});