// JavaScript Document
Ext.define('Ext.mod.model.SubTrt',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'treatment_id', type:'integer'},
		{name:'med', type:'string'},
		{name:'medicine_id', type:'integer'},
		{name:'dosage_id', type:'integer'},
		{name:'dosage',type:'string'}

	],	
});