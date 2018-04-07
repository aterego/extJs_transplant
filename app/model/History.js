// JavaScript Document
Ext.define('Ext.mod.model.History',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'reg_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'condition_id', type:'integer'},
		{name:'txt', type:'string'},
		{name:'cond',type:'string'}
	],	
});