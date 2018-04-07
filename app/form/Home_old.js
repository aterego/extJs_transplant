/**
 * Created by Avetis.Avetisov on 29.06.2016.
 */
// JavaScript Document
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.mod': '../../app',
        'Ext.ux': '../../ext/ux'
    }
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

    var  myDataStore = Ext.create('Ext.data.JsonStore', {
        fields: ['year', 'liv', 'kd'],
        data: [
            { year: '2005', liv: 20, kd: 37 },
            { year: '2006', liv: 20, kd: 37},
            { year: '2007', liv: 19, kd: 36},
            { year: '2008', liv: 18, kd: 36 },
            { year: '2009', liv: 18, kd: 35},
            { year: '2010', liv: 17, kd: 34},
            { year: '2011', liv: 16, kd: 34 },
            { year: '2012', liv: 16, kd: 33 },
            { year: '2013', liv: 16, kd: 32 },
            { year: '2014', liv: 16, kd: 32 },
            { year: '2015', liv: 15, kd: 31 },
            { year: '2016', liv: 15, kd: 31 }
        ]
    });



    var total = 0;
    var total2 = 0;

    Ext.define('Ext.chart.theme.ColumnTheme', {
        extend: 'Ext.chart.theme.Base',
        constructor: function(config) {
            this.callParent([Ext.apply({

                colors: ['rgb(255, 192, 0)','rgb(38, 120, 13)','rgb(0, 126, 198)', 'rgb(67, 56, 64)', 'rgb(171, 12, 4)']

            }, config)]);
        }
    });

   var win = Ext.create('Ext.window.Window', {
     //title: 'Home',
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
      items: [
       {
        xtype: 'chart',
        height: 410,
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

        }],
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
              height: 410,
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
                      text  : 'საქართველოში წარმოებული გადანერგვები, სულ :',
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

          ,

          {
              xtype: 'chart',
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
                  text  : 'საქართველოში გასული 12 წლის განმავლობაში წარმოებული გადანერგვები',
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

      ]

});


    Ext.onReady(function() {
        win.show();
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
            Ext.get('chText2').update('<tspan x="40" dy="6.546875">საქართველოში წარმოებული გადანერგვები, სულ : ' + total2 + '</tspan>');

        });


    });


});

