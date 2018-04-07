// JavaScript Document
Ext.define('Ext.mod.model.Doctors',{
	extend:'Ext.data.Model',
	fields:[
		{name:'doctor_id',type:'integer'},
		{name:'doctorname',type:'string'},
		{name:'doctorlastname',type:'string'},
		{name:'dnameFull',type:'string'},
		{name:'clinic_id',type:'integer'},
		{name:'clinic',type:'string'},
		{name:'phone1',type:'string'},
		{name:'email',type:'string'}
	],
});