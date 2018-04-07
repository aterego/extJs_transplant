// JavaScript Document
Ext.define('Ext.mod.model.ArchHtx',{
	extend:'Ext.data.Model',
	fields:[
		{name:'id',type:'integer'},
		{name:'reg_id',type:'integer'},
		{name:'patientlastname', type:'string'},
		{name:'patientname', type:'string'},
		{name:'birthday', type:'string'},
		{name:'patronymic',type:'string'},
		{name:'country_id',type:'integer'},
		{name:'country_name',type:'string'},
		{name:'city_id',type:'integer'},
		{name:'city_name',type:'string'},
		{name:'personalid',type:'string'},
		{name:'history_id',type:'string'},
		{name:'gendercode',type:'integer'},
		{name:'gender',type:'string'},
		{name:'phone1',type:'string'},
		{name:'phone2',type:'string'},
		{name:'email',type:'string'},
		{name:'address1',type:'string'},
		{name:'address2',type:'string'},
		{name:'work_phone',type:'string'},
		{name:'work',type:'string'},
		{name:'editorcode',type:'string'},
		{name:'transdate', type:'string'},
		{name:'clinic', type:'string'},
		{name:'donor', type:'string'},
		{name:'con_date', type:'string'},
		{name:'condition', type:'string'},
		{name:'med1', type:'string'},
		{name:'med2', type:'string'},
		{name:'med3', type:'string'},
		{name:'blood_type_id', type:'integer'},
		{name:'rhesus', type:'integer'},
		{name:'info', type:'string'},
		{name:'removal', type:'string'},
		{name:'removal_id', type:'string'},
		{name:'removal_date', type:'string'},
		{name : 'pimage', type: 'auto'},
		{name : 'lastdate', type: 'string'}
	],	
});