/**
 * Created by Avetis.Avetisov on 29.06.2016.
 */
// JavaScript Document
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.mod': '../../app',
        'Ext.ux': '../../ext/ux'
    },
});


Ext.onReady(function() {


    var storeHome=Ext.create('Ext.mod.store.Home',{
        model: 'Ext.mod.model.Home'
    });

    var storeHome2=Ext.create('Ext.mod.store.Home2',{
        model: 'Ext.mod.model.Home2'
    });


    var storeHome3=Ext.create('Ext.mod.store.Home3',{
        model: 'Ext.mod.model.Home3'
    });

     var storeHome4=Ext.create('Ext.mod.store.Home4',{
        model: 'Ext.mod.model.Home4'
    });

    var  myDataStore = Ext.create('Ext.data.JsonStore', {
        fields: ['year', 'liv', 'dd'],
        data: [
            { year: '2005', liv: [
                {
                    "count": 20,
                    "name": "vvvvvvv",

                } ], dd: [
                {
                    "count": 18,
                    "name": "ddddd",

                } ]},

        ]
    });



    var total = 0;
    var total2 = 0;
    var total3 = 0;

    Ext.define('Ext.chart.theme.ColumnTheme', {
        extend: 'Ext.chart.theme.Base',
        constructor: function(config) {
            this.callParent([Ext.apply({

                colors: ['rgb(255, 192, 0)','rgb(38, 120, 13)','rgb(0, 126, 198)', 'rgb(67, 56, 64)', 'rgb(171, 12, 4)']

            }, config)]);
        }
    });

   var win = Ext.create('Ext.panel.Panel', {
     //title: 'Home',
       renderTo: Ext.getBody(),
     closable: false,
     autoHeight: false,
     autoScroll: true,
        /*
         width: 350,
         height:400,
         */

      showClose :false,
      maximized:true,
       layout:'column',
      items: [
       {
        xtype: 'chart',
        height: 320,

        columnWidth: .5,
        id: 'ch1',
        padding: '10 0 0 0',
        style: 'background: #fff',
        animate: true,
        theme:'ColumnTheme',
        shadow: true,
        store: storeHome,
        insetPadding: 40,
        legend: {
            field: 'name',
            position: 'bottom',
            boxStrokeWidth: 0,
            labelFont: '12px Helvetica'
        },
        items: [
            {
            type  : 'text',
            id: 'chText',
            text  : 'აღრიცხვაზე მყოფი პაციენტები, სულ :',
            font  : '22px Helvetica',
            width : 100,
            height: 30,
            x : 40, //the sprite x position
            y : 12  //the sprite y position

           }



           ],
        series: [{
            type: 'pie',
            angleField: 'percent',
            label: {
                field: 'name',
                display: 'outside',
                cls:'biggertext',
                calloutLine: true,
                renderer: function(v, label, storeItem) {
                    // storeItem is your model, so return the value you want as label
                    return v + " - "  + storeItem.get('value');
                }
            },
            showInLegend: true,
            highlight: {
                segment: {
                    margin: 20
                }
            },
            tips: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('percent') + '%');
                }
            }
        }]
    }
     ,
       {
              xtype: 'chart',
           height: 320,

           columnWidth: .5,
              id: 'ch2',
              padding: '10 0 0 0',
              style: 'background: #fff',
              animate: true,
              theme:'ColumnTheme',
              shadow: true,
              store: storeHome2,
              insetPadding: 40,
              legend: {
                  field: 'name',
                  position: 'bottom',
                  boxStrokeWidth: 0,
                  labelFont: '12px Helvetica'
              },
              items: [
                  {
                      type  : 'text',
                      id: 'chText2',
                      text  : 'საქ-ში წარმოებული გადანერგვები, სულ :',
                      font  : '22px Helvetica',
                      width : 100,
                      height: 30,
                      x : 40, //the sprite x position
                      y : 12  //the sprite y position

                  }],
              series: [{
                  type: 'pie',
                  angleField: 'percent',
                  label: {
                      field: 'name',
                      cls:'biggertext',
                      display: 'outside',
                      calloutLine: true,
                      renderer: function(v, label, storeItem) {
                          // storeItem is your model, so return the value you want as label
                          return v + " - "  + storeItem.get('value');
                      }
                  },
                  showInLegend: true,
                  highlight: {
                      segment: {
                          margin: 20
                      }
                  },
                  tips: {
                      trackMouse: true,
                      renderer: function(storeItem, item) {
                          this.setTitle(storeItem.get('name') + ': ' + storeItem.get('percent') + '%');
                      }
                  }
              }]
          }


      ]

});

   var win2 =  Ext.create('Ext.panel.Panel', {
        //title: 'Home',
       renderTo: Ext.getBody(),
        closable: false,
        autoHeight: true,
        autoScroll: true,
        /*
         width: 350,
         height:400,
         */
        showClose :false,
        maximized:true,
        layout:'fit',
        layout: {
            type: 'vbox',
            align : 'stretch',
            pack  : 'start',
        },

/*
       dockedItems: [{
           xtype: 'toolbar',
           items: [{
               xtype: 'button',
               docked: 'bottom',
               text: 'ჩამოტვირთეთ PNG',
               handler: function(btn, e, eOpts) {
                   btn.up('panel').down("chart").save({
                       type: 'image/png',
                       filename: "საქართველოში წარმოებული გადანერგვები წლების მიხედვით"
                   })
               }

           }]
       }],
*/
        items: [

            {
                xtype: 'chart',
                id: 'cha',
                height: 410,
                padding: '10 0 0 0',
                animate: true,
                shadow: false,
                theme:'ColumnTheme',
                style: 'background: #fff;',
                legend: {
                    position: 'bottom',
                    boxStrokeWidth: 0,
                    labelFont: '12px Helvetica'
                },
                store: storeHome3,
                insetPadding: 40,
                items: [{
                    type  : 'text',
                    text  : 'საქართველოში წარმოებული გადანერგვები წლების მიხედვით, სულ :',
                    id: 'chText3',
                    font  : '22px Helvetica',
                    width : 100,
                    height: 30,
                    x : 40, //the sprite x position
                    y : 12  //the sprite y position
                },/* {
                 type: 'text',
                 text: 'Data',
                 font: '10px Helvetica',
                 x: 12,
                 y: 380
                 }, {
                 type: 'text',
                 text: 'Source',
                 font: '10px Helvetica',
                 x: 12,
                 y: 390
                 }
                 */],
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: 'liv',
                    grid: true,
                    minimum: 0,
                    label: {
                        renderer: function(v) { return v; }
                    }
                }, {
                    type: 'category',
                    position: 'bottom',
                    fields: 'year',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }],
                series: [{
                    type: 'column',
                    axis: 'left',
                    title: [ 'LivTx ღვიძლი', 'KdTx თირკმელი' ],
                    xField: 'year',
                    yField: [ 'liv', 'kd'],
                    style: {
                        opacity: 0.80
                    },
                    highlight: {
                        fill: '#000',
                        'stroke-width': 1,
                        stroke: '#000'
                    },
                    tips: {
                        trackMouse: true,
                        style: 'background: #FFF',
                        height: 20,
                        renderer: function(storeItem, item) {
                            var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                            this.setTitle(browser + ' for ' + storeItem.get('year') + ': ' + storeItem.get(item.yField));
                        }
                    }
                }]
            }
            ,

            {
                xtype: 'toolbar',
                items: [{
                    xtype: 'button',
                    docked: 'bottom',
                    text: 'ჩამოტვირთეთ PNG',
                    handler: function(btn, e, eOpts) {
                        btn.up('panel').down("chart").save({
                            type: 'image/png',
                            filename: "საქართველოში წარმოებული გადანერგვები წლების მიხედვით"
                        })
                    }

                }]
            }
            ,
            {
                xtype:'panel',
                padding: '4 25 0 0',
                margin: '10',
                id: 'lastupdated',
                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                border: 0
            }

    ]

    });



 var win3 =  Ext.create('Ext.panel.Panel', {
        //title: 'Home',
       renderTo: Ext.getBody(),
        closable: false,
        autoHeight: true,
        autoScroll: true,
        /*
         width: 350,
         height:400,
         */
        showClose :false,
        maximized:true,
        layout:'fit',
        layout: {
            type: 'vbox',
            align : 'stretch',
            pack  : 'start',
        },

/*
       dockedItems: [{
           xtype: 'toolbar',
           items: [{
               xtype: 'button',
               docked: 'bottom',
               text: 'ჩამოტვირთეთ PNG',
               handler: function(btn, e, eOpts) {
                   btn.up('panel').down("chart").save({
                       type: 'image/png',
                       filename: "საქართველოში წარმოებული გადანერგვები წლების მიხედვით"
                   })
               }

           }]
       }],
*/
        items: [

            {
                xtype: 'chart',
                id: 'cha4',
                height: 410,
                padding: '10 0 0 0',
                animate: true,
                shadow: false,
                theme:'ColumnTheme',
                style: 'background: #fff;',
                legend: {
                    position: 'bottom',
                    boxStrokeWidth: 0,
                    labelFont: '12px Helvetica',
                    color: 'red',
                         renderer: function(storeItem, item) {
                           this.title = [ 'ggg', 'kd', 'md', 'dd', 'rr' , 'ss', 'ss1', 'ss2', 'ss3', 'ss4', 'ss5'];
                        }
                },
                store: myDataStore,
                insetPadding: 40,
                items: [{
                    type  : 'text',
                    text  : 'საქართველოში წარმოებული გადანერგვები წლების მიხედვით, სულ :',
                    id: 'chText4',
                    font  : '22px Helvetica',
                    width : 100,
                    height: 30,
                    x : 40, //the sprite x position
                    y : 12  //the sprite y position
                },/* {
                 type: 'text',
                 text: 'Data',
                 font: '10px Helvetica',
                 x: 12,
                 y: 380
                 }, {
                 type: 'text',
                 text: 'Source',
                 font: '10px Helvetica',
                 x: 12,
                 y: 390
                 }
                 */],
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: 'liv',
                    grid: true,
                    minimum: 0,
                    label: {
                        renderer: function(v) {  return v; }
                    }
                }, {
                    type: 'category',
                    position: 'bottom',
                    fields: 'year',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }],
                series: [{
                    type: 'column',
                    axis: 'left',

                    xField: 'year',

                    style: {
                        opacity: 0.80
                    },
                    highlight: {
                        fill: '#000',
                        'stroke-width': 1,
                        stroke: '#000',
                    },
                    tips: {
                        trackMouse: true,
                        style: 'background: #FFF',
                        height: 20,
                        renderer: function(storeItem, item) {

                            var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                            this.setTitle(browser + ' for ' + storeItem.get('year') + ': ' + storeItem.get(item.yField));
                        }
                    },
          label: {
                         font: '12px Arial',
              display: 'insideEnd',
              'text-anchor': 'middle',
                field: [ 'liv', 'kd', 'md', 'dd', 'rr' , 'ss', 'ss1', 'ss2', 'ss3', 'ss4', 'ss5'],
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'vertical',
                color: '#333'
            },

                   /*
                   listeners: {

					    afterrender: function() {
	                      this.title = [ 'ggg', 'kd', 'md', 'dd', 'rr' , 'ss', 'ss1', 'ss2', 'ss3', 'ss4', 'ss5'];

					   }
				    }
				    */
                }]
            }
            ,

            {
                xtype: 'toolbar',
                items: [{
                    xtype: 'button',
                    docked: 'bottom',
                    text: 'ჩამოტვირთეთ PNG',
                    handler: function(btn, e, eOpts) {
                        btn.up('panel').down("chart").save({
                            type: 'image/png',
                            filename: "საქართველოში წარმოებული გადანერგვები წლების მიხედვით"
                        })
                    }

                }]
            }
            ,
            {
                xtype:'panel',
                padding: '4 25 0 0',
                margin: '10',
                id: 'lastupdated',
                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                border: 0
            }

    ]



    });


    Ext.onReady(function() {

        storeHome.on('load', function(store, records, successful){
            storeHome.filter([
                {
                    fn   : function(record) {
                        total = total + record.get('value');
                        return record.get('value')
                    },
                    scope: this
                }
            ])

          //Ext.get('chText').setHTML('hello');
           Ext.get('chText').update('<tspan x="40" dy="6.546875">აღრიცხვაზე მყოფი პაციენტები, სულ : ' + total + '</tspan>');

        });

        storeHome2.on('load', function(store, records, successful){
            storeHome2.filter([
                {
                    fn   : function(record) {
                        total2 = total2 + record.get('value');
                        return record.get('value')
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText2').update('<tspan x="40" dy="6.546875">საქ-ში წარმოებული გადანერგვები, სულ : ' + total2 + '</tspan>');

        });

        var last = '';
        storeHome3.on('load', function(store, records, successful){

            storeHome3.filter([
                {

                    fn   : function(record) {


                         total3 = total3 + record.get('kd') + record.get('liv');
                         last = record.get('last');
                       // alert(last);
                        return record.get('last')
                    },
                    scope: this
                }
            ])

           Ext.get('chText3').update('<tspan x="40" dy="6.5">საქართველოში წარმოებული გადანერგვები წლების მიხედვით, სულ : ' + total3 + '</tspan>');
           Ext.get('lastupdated').update('<div style="float:right">განახლებულია: <strong>' + last + '</strong></div>');
        });

/*
        storeHome4.on('load', function(store, records, successful){
var chart = Ext.get('cha4');

            //alert(chart.series.title);

            chart.title = [ 'xxx', 'kd', 'md', 'dd', 'rr' , 'ss', 'ss1', 'ss2', 'ss3', 'ss4', 'ss5'];
             chart.yField = [ 'xxx', 'kd', 'md', 'dd', 'rr' , 'ss', 'ss1', 'ss2', 'ss3', 'ss4', 'ss5'];


        //alert(chart.series);

        var serie =
        {
                       type:'column',
                       xField: 'year',
                       yField: [ 'liv', 'kd', 'md'],
        };

// add the serie to the chart (the variable 'chart' holds the complete chart component)

chart.series.removeAll();
chart.series.addAll(NewSeries);
chart.redraw();
chart.refresh();


        });

*/
/*
        storeHome4.on('load', function(store, records, successful){

            var chart = Ext.get('cha4');
            chart.title = ['liv','dd'];
       });

*/
/*
storeHome4.on('load', function(store, records, successful){

    var chart = Ext.getCmp('cha4');
    var count = 0;
    var series = chart.series.getAt(0);
    var yFields = series.yField;
    series.title = ['ff','dd'];
    yFields =records[0].get('liv')['count'];


    alert(store.fields[0]);



                storeHome4.filter([
                {

                    fn   : function(record) {
                        //alert(count);

                        //alert(record.get('liv'));
                        //alert(record.get('liv')['clinic']);
                        //yFields = record.get('liv')['count'];
                        count++;

                    },
                    scope: this
                }
            ])
});
*/

    });


});

