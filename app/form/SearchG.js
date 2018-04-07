// JavaScript Document
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.mod': '../../app'
    }
});



Ext.onReady(function() {



    requires:[
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.window.*',
        //'Ext.grid.plugin.BufferedRenderer'
       // 'Ext.ux.DataTip'
    ]



    var storeSearchPatients=Ext.create('Ext.mod.store.SearchPatients',{
        model: 'Ext.mod.model.SearchPatients'
    });



    Ext.create('Ext.grid.Panel', {
        renderTo: Ext.getBody(),
        width: '100%',
        id:'search_info',
        collapsible:true,
        autoScroll:true,
        store:storeSearchPatients,
        flex:1,
        columns:[{
            text:'გადანერგვის თარიღი',
            flex:25/100,
            dataIndex:'transdate'
        },{
            text:'კლინიკა',
            flex:25/100,
            dataIndex:'clinic',
            /*
             renderer: function(value, metadata) {
             metadata.style = 'white-space: normal;';
             return value;
             }
             */
        }
        ],
        /*
         dockedItems:[{
         xtype:'pagingtoolbar',
         dock:'bottom',
         store:storeUser,
         displayInfo:'true'
         }],
         */
        listeners : {
            itemdblclick: function(dv, record, item, index, e) {
                var grid = Ext.getCmp('search_info');
                var model = grid.getSelectionModel().getSelection();
                if(model[0].data != null){
                    model_edit=model[0].data;
                    CreateEditMedInfo(model_edit);
                }
            }
        }


    });




});