/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
Ext.define('Application.view.layout.North', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.north',
    region: 'north',
    height: 85,
    bodyPadding: 3,
    html: '<div><div style="float: left"><img src="resources/images/logo.jpg" /></div><div style="float: left; margin: 20px 10px"><img src="resources/images/logo2.png" /></div></div>',
    cls: 'header',                  
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
            
        });
        me.callParent( arguments );
    } 
});