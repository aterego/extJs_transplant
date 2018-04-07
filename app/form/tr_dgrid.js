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

Ext.onReady(function() {

    /**
     * create grid
     *
     * @return void
     * @param column data in ExtJS format
     */
    var createGrid = function(columndata) {
        grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: columndata,
            stripeRows: true,
            renderTo: Ext.getBody(),
            width: '100%',
            tbar:[
                {
                    text: 'Print',
                    iconCls: 'icon-print',
                    handler : function(){
                        //var grid = Ext.getCmp('med_info');
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.print(grid);
                    }
                }
                ,

                {
                    text: 'Export',
                    iconCls: 'icon-excel',
                    handler : function(){
                        grid.doExcelExport({
                            apiKey: '2109e0c559c4900aa772f2648437c5c0',
                            startCell: 'B8',
                            templatefile: "temp.xlsx",
                            destinationfile: 'მკურნალობის სია_' + getParameterByName('pid') + '.xlsx'
                        });
                    }
                }
            ]
            
            

        });
    }

    /**
     * create store
     *
     * @return void
     * @param field data in ExtJS format
     * @param values in ExtJS format
     */
    var createStore = function(fielddata, values) {
        store = Ext.create('Ext.data.ArrayStore', {
            fields: fielddata,
            data: values

        });
    }



    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
     * get the data via ajax request
     *
     * @return void
     */
    Ext.Ajax.request({
        url: '../../server/list/treatment_list2.php?pid=' + getParameterByName('pid') + '&rid=' + getParameterByName('rid') ,
        success: function(response){
            var data = Ext.decode(response.responseText);

            createStore(data.fielddata, data.values);
            createGrid(data.columndata);
        }
    });

});