// JavaScript Document
Ext.define('Ext.mod.model.Med_infoD',{
	extend:'Ext.data.Model',
	fields:[
		{name:'fc',type:'integer'},
		{name:'patient_id',type:'integer'},
		{name:'reg_id',type:'integer'},
		{name:'date', type:'string'},
		{name:'donor_type_id', type:'integer'},
		{name:'donor_info', type:'string'},
		{name:'doctor_id', type:'integer'},
		{name:'dname', type:'string'},
		{name:'dlastname',type:'string'},
		{name:'dnameFull', type:'string'},
		{name:'operator_id',type:'integer'},
		{name:'oname',type:'string'},
		{name:'olastname',type:'string'},
		{name:'onameFull', type:'string'},
		{name:'diagnosis_id',type:'integer'},
		{name:'diagnosis',type:'string'},
		{name:'donor',type:'string'},
		{name:'clinic_id',type:'integer'},
		{name:'clinic',type:'string'},
		{name:'con_date',type:'string'},
		{name:'condition',type:'string'}
	],	
});