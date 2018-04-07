// JavaScript Document
Ext.define('Ext.mod.model.PatientRemovals',{
	extend:'Ext.data.Model',
	fields:[
		{name:'patient_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'removal_id', type:'integer'},
		{name:'removal', type:'string'},
	],
});