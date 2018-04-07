// JavaScript Document
Ext.define('Ext.mod.model.Clinics',{
	extend:'Ext.data.Model',
	fields:[
		{name:'clinic_id',type:'integer'},
		{name:'clinicdesc',type:'string'},
		{name:'country_id',type:'integer'},
		{name:'country',type:'string'},
		{name:'city_id',type:'integer'},
		{name:'city',type:'string'},
		{name:'clinicaddressur',type:'string'},
		{name:'clinicphone',type:'string'}
	],
});