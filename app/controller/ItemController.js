// JavaScript Document
Ext.define('Application.controller.ItemController', {
  extend: 'Ext.app.Controller',
  //stores: ['Items'],
  //models: ['Item'],
  views: ['layout.North','layout.West','layout.Center'],
  refs: [
    {
      ref: 'itemShowDesc',
      selector: 'itemShow > #item-description'
    }
  ],
  init: function() {
    this.control({
      'itemList': {
        // Action to be performed on select
        select: this.onItemSelect
      }
    });
  },
  onItemSelect: function(selModel, selection) {
    // Executed only when selection is a leaf
    (selection.data.leaf) ? this.getItemShowDesc().update(selection.raw.description) : null;
  }
});