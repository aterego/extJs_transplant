// JavaScript Document
Ext.define('Ext.mod.model.TreatmentList',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'med1', type:'string'},
		{name:'med2', type:'string'},
	],
});