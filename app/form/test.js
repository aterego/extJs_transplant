// JavaScript Document
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.mod': '../../app',
        'Ext.ux': '../../ext/ux'
    }
});

Ext.require([
    'Ext.ux.grid.Printer',
    'Ext.ux.RowExpander'
]);

Ext.ux.SetCascading = function(parent, child) {
    child.setDisabled(!parent.isValid());

    parent.on('select', function() {
        child.clearValue();
        child.setDisabled(!parent.isValid());
    });

    child.on('focus', function() {
        if(!child.disabled) {
            var parentValue = parent.getValue();

            //alert(parentValue);
            //var childParams = child.store.baseParams;

            child.store.reload({
                params: {parent_category_id: parentValue}
            });

            //child.reload();

        }
    });
};

Ext.onReady(function() {

    var cats=Ext.create('Ext.mod.store.Cats',{
        model: 'Ext.mod.model.Cats',
    });

    var catsSub=Ext.create('Ext.mod.store.CatsSub',{
        model: 'Ext.mod.model.CatsSub',
    });

    var comboCats = new Ext.form.ComboBox({
        name : 'category_id',
        width: 185,
        store: cats,
       // mode : 'local',
        queryMode: 'local',
        listWidth     : 185,
        triggerAction : 'all',
        displayField  : 'category_name',
        valueField    : 'category_id',
        editable      : false,
        forceSelection: true,
        emptyText: 'Select Category...'
    });


    var comboCatsSub = new Ext.form.ComboBox({
        name : 'category_id',
        width: 185,
        store: catsSub,
        mode : 'local',
        queryMode: 'local',
        listWidth     : 185,
        //triggerAction : 'all',
        displayField  : 'category_name',
        valueField    : 'category_id',
        editable      : false,
        forceSelection: true,
        emptyText: 'Select Subcategory...'
    });





    Ext.ux.SetCascading(comboCats, comboCatsSub);

/*
    comboCats.load({
        params: {
            labaratory_id : data.labaratory_id
        }
    });
*/

/*
    var users = Ext.create('Ext.data.ArrayStore', {
        fields: ['id', 'category_id', 'number'],
        data: {'items':[
            { 'id': '01',  "category_id":"1", "number":"aaa"},
            { 'id': '02',  "category_id":"1", "number":"bbb" },
            { 'id': '03',  "category_id":"2", "number":"ccc" },
            { 'id': '04',  "category_id":"2", "number":"ddd" },
            { 'id': '05',  "category_id":"2", "number":"eee" }
        ]},
        autoLoad: true,
        filters: [{
            property: 'category_id',
            disabled: true,
            value: '{categoryCombo.selection.id}'


        }]

    });

*/

    var frmShowPatient= new Ext.window.Window({
        autoWidth: true,
        autoHeight: true,
        minHeight: 400,
        width: 800,
        x: 0,
        title: "Test",
        constrain: true,
        renderTo: Ext.getBody(),
        closable: true,
        autoScroll: true,
        modal: true,
        layout:'fit',
        items:[
            {
                xtype: 'form',
                //id: 'patientForm',
                collapsible: true,

                //bodyPadding: 5,
                //width: 600,
                fieldDefaults: {
                    //labelAlign: 'top',
                    msgTarget: 'side',
                    labelStyle: 'font-weight:bold;'
                },
                defaults: {
                    anchor: '100%'
                },

                items: [
                    {
                        xtype: comboCats,
                        anchor: '95%'
                    },
                    {
                        xtype: comboCatsSub,
                        anchor: '95%'
                    }
                    /*
                    {
                        xtype: 'combo',
                        name: 'user',
                        id: 'user',
                        store: users,
                        reference: 'userCombo',
                        fieldLabel: 'User',
                        displayField: 'number',
                        valueField: 'id',
                        hiddenName: 'id',
                        emptyText: 'Select a user...',
                        anchor: '95%',


                    }
                    */
                ]
            }]
    });

    frmShowPatient.show();





});