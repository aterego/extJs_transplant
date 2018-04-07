// JavaScript Document
Ext.define('Ext.mod.model.CatsSub',{
	extend:'Ext.data.Model',
	fields:[
		{name:'category_id',type:'integer'},
		{name:'parent_category_id',type:'integer'},
		{name:'category_name',type:'string'},
		{name:'prefix',type:'string'}
	],
});