// JavaScript Document
Ext.define('Application.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: {
    type: 'border',
  },
  items: [
    { xtype: 'layout.north' },
        { xtype: 'layout.west' },
        { xtype: 'layout.center' }
  ]
});