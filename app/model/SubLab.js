// JavaScript Document
Ext.define('Ext.mod.model.SubLab',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'labaratory_id', type:'integer'},
		{name:'analysis', type:'string'},
		{name:'analysis_id', type:'integer'},
		{name:'value',type:'string'}

	],	
});