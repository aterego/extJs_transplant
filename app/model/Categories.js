// JavaScript Document
Ext.define('Ext.mod.model.Categories',{
	extend:'Ext.data.Model',
	fields:[
		{name:'category_id',type:'integer'},
		{name:'reg_id',type:'integer'},
		{name:'parent_category_id',type:'integer'},
		{name:'category_name',type:'string'},
		{name:'prefix',type:'string'},
		{name:'patient_id',type:'integer'},
		{name:'date',type:'integer'}
	],
});