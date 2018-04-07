// JavaScript Document
Ext.define('Ext.mod.model.Instrumental',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'reg_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'instrumental_id', type:'integer'},
		{name:'procedure', type:'string'},
		{name:'procedure_id', type:'integer'},
		{name:'value',type:'string'}

	],	
});