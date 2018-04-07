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

     var storeHome5=Ext.create('Ext.mod.store.Home5',{
        model: 'Ext.mod.model.Home5'
    });

     var storeHomeClinic4=Ext.create('Ext.mod.store.HomeClinic4',{
        model: 'Ext.mod.model.HomeClinic4'
    });

     var storeHomeClinic10=Ext.create('Ext.mod.store.HomeClinic10',{
        model: 'Ext.mod.model.HomeClinic10'
    });

     var storeHomeClinic11=Ext.create('Ext.mod.store.HomeClinic11',{
        model: 'Ext.mod.model.HomeClinic11'
    });


     var storeHome6=Ext.create('Ext.mod.store.Home6',{
        model: 'Ext.mod.model.Home6'
    });

     var storeHome7=Ext.create('Ext.mod.store.Home7',{
        model: 'Ext.mod.model.Home7'
    });


     var storeHome8=Ext.create('Ext.mod.store.Home8',{
        model: 'Ext.mod.model.Home8'
    });

     var storeHome9=Ext.create('Ext.mod.store.Home9',{
        model: 'Ext.mod.model.Home9'
    });

    var storeHome10=Ext.create('Ext.mod.store.Home10',{
        model: 'Ext.mod.model.Home10'
    });

    var storeHome11=Ext.create('Ext.mod.store.Home11',{
        model: 'Ext.mod.model.Home11'
    });

    var storeHome12=Ext.create('Ext.mod.store.Home12',{
        model: 'Ext.mod.model.Home12'
    });

    var storeHome13=Ext.create('Ext.mod.store.Home13',{
        model: 'Ext.mod.model.Home13'
    });

/*
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
*/

      var  myDataStore = Ext.create('Ext.data.JsonStore', {
        fields: ['year', 'liv', 'dd'],
        data: [
            { year: '2005', liv: 25},
            { year: '2006', liv: 30}
              ]
      });



    var total = 0;
    var total2 = 0;
    var total3 = 0;
    var total4 = 0;
    var total5 = 0;
    var total6 = 0;
    var total7 = 0;
    var total8 = 0;
    var total9 = 0;
    var total10 = 0;
    var total11 = 0;
    var total12 = 0;
    var total13 = 0;

    Ext.define('Ext.chart.theme.ColumnTheme', {
        extend: 'Ext.chart.theme.Base',
        constructor: function(config) {
            this.callParent([Ext.apply({

                colors: ['rgb(255, 192, 0)','rgb(38, 120, 13)','rgb(0, 126, 198)', 'rgb(118, 9, 241)',
                         'rgb(216, 9, 241)','rgb(171, 142, 7)', 'rgb(156, 23, 39)',
                         'rgb(8, 59, 39)','rgb(9, 8, 59)','rgb(121, 112, 40)', 'rgb(23, 156, 104)',
                         'rgb(253, 143, 0)', 'rgb(208, 253, 0)', 'rgb(0, 253, 24)', 'rgb(0, 253, 250)']

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


        layout: {
    type: 'vbox',
    align : 'stretch',
    pack  : 'start',
},
    items:[



            {
                xtype:'panel',
                padding: '4 25 0 0',
                margin: '10',
                id: 'lastupdated',
                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                border: 0
            },


        {
            xtype : 'panel',
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
        },
   /*     {
            xtype : 'panel',
            height: 520,
            layout: 'fit',
                x: 150,
    y: 150,
            items: [
   {
              xtype: 'chart',
       layout: 'fit',
              height: 520,
              id: 'ch22',
              padding: '20',
              style: 'background: #fff',
              animate: true,
              theme:'ColumnTheme',
              shadow: true,
              store: storeHome6,
              insetPadding: 100,
              legend: {
                  field: 'name',
                  position: 'right',
                  boxStrokeWidth: 0,
                  labelFont: '12px Helvetica'
              },
              items: [
                  {
                      type  : 'text',
                      id: 'chText22',
                      text  : ' test საქ-ში წარმოებული გადანერგვები, სულ :',
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
                      cls:'biggertexts',
                      display: 'outside',
                      calloutLine: true,
                      renderer: function(v, label, storeItem) {
                          // storeItem is your model, so return the value you want as label
                          // return v + " - "  + storeItem.get('value');
                           return  storeItem.get('value');
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
        }  */
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
                    position: 'right',
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

                    position: 'right',
/*
                    x: 0,
                    y:270,
*/

                    boxFill: 'none',
                    boxStrokeWidth: 0,
                    //labelFont: '9px Helvetica',
itemTpl: [
        '<tpl if="value != 0">', // <= template condition
            '<span class="x-legend-item-marker {[values.disabled?\'x-legend-inactive\':\'\']}" style="background:{mark};"></span>{name}',
        '</tpl>'
    ]

                },
                store: storeHome4,
                insetPadding: 40,
                items: [{
                    type  : 'text',
                    text  : 'Number of Transplantation by Clinic in Georgia since 1995.',
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
   style : {
            'stroke-width': 2, // set desired value here
        },
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: 'c1',
                    grid: true,

                    /*
                    grid: {

                        odd: {
                            opacity: 1,
                            fill: '#ddd',
                            stroke: '#bbb',
                            'stroke-width': 1
                        }
                    },
                    */
                    dashSize: 0,
                    minimum: 0,
                    label: {
                        renderer: function(v) { return v; }
                    },

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
                    title: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
                    xField: 'year',
                    yField: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
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

                            renderer: function (storeItem, item) {
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
                            filename: "საქ-ში ​შესრულებული ​ტრანსპლანტაციათა რაოდენობა 1995 წლიდან კლინიკების მიხედვით."
                        })
                    }

                }]
            }
            ,
            /*
            {
                xtype:'panel',
                padding: '4 25 0 0',
                margin: '10',
                id: 'lastupdated',
                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                border: 0
            }
            */

    ]

    });

 var win5 =  Ext.create('Ext.panel.Panel', {
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
                xtype : 'panel',
                layout: 'anchor',
                items: [

            {
                xtype: 'chart',
                id: 'cha5',
                height: 410,
                anchor: '80%',
                padding: '10 0 0 0',

                animate: true,
                shadow: false,
                theme:'ColumnTheme',
                style: 'background: #fff;',

                /*
                legend: {
                    position: 'right',
                    boxStrokeWidth: 0,
                    labelFont: '12px Helvetica',

                },
                */

                store: storeHome5,
                insetPadding: 40,
                items: [{
                    type  : 'text',
                    text  : 'აღრიცხვაზე მყოფ ორგანოგადანერგილ პაციენტთა რაოდენობა 1995 წლიდან.',
                    id: 'chText5',
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
                    fields: 'tcount',
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
                    title: ['Number of OrganTx Patients'],
                    xField: 'year',
                    yField: ['tcount'],
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
                            //this.setTitle(browser + ' for ' + storeItem.get('year') + ': ' + storeItem.get(item.yField));
                            this.setTitle('\xa0' + storeItem.get(item.yField));
                        }
                    },

                    style: {
                      fill: 'red',
                      width: 20
                    },
                     renderer: function(sprite, record, attr, index, store){
                         return Ext.apply(attr, {
                         fill: 'rgb(255, 192, 0)'
                         });
                    }


                }]


            }
            ,


                ]
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
                        xtype : 'panel',
                        height: 520,
                        layout: 'fit',




                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 520,
                          id: 'ch6',
                          padding: '20',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome6,
                          insetPadding: 100,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText6',
                                  text  : 'Number of Transplantation by Country',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                  renderer: function(v, label, storeItem) {
                                      // storeItem is your model, so return the value you want as label
                                      // return v + " - "  + storeItem.get('value');

                                      if(storeItem.get('value') < 2) {
                                          return "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + storeItem.get('value');
                                      }

                                      if(storeItem.get('name') == "სომხეთი")
                                        return "\xa0\xa0\xa0\xa0" + storeItem.get('value');

                                      if(storeItem.get('name') == "შვედეთი")
                                        return "\xa0\xa0\xa0\xa0" + storeItem.get('value');


                                       return  storeItem.get('value');
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

                        ]
                ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "რომელ ქვეყანაში განხორცილდა გადანერგვა"
                                    })
                                }


                       }],

                    }
            ,
            {
                        xtype : 'panel',
                        height: 420,
                        layout: 'fit',
                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 420,
                          id: 'ch7',
                          padding: '20',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome7,
                          insetPadding: 80,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText7',
                                  text  : 'საქ-ში წარმოებული ღვიძლის გადანერგვათა რაოდენობა კლინიკების მიხედვით',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                  renderer: function(v, label, storeItem) {
                                      // storeItem is your model, so return the value you want as label
                                      // return v + " - "  + storeItem.get('value');
                                       return  storeItem.get('value');
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

                ,

                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "Number of Liver Transplantation in Georgia"
                                    })
                                }


                       }],
                    }
            ,
            {
                        xtype : 'panel',
                        height: 420,
                        layout: 'fit',
                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 420,
                          id: 'ch8',
                          padding: '20',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome8,
                          insetPadding: 80,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText8',
                                  text  : 'საქ-ში წარმოებული თირკმლის გადანერგვათა რაოდენობა კლინიკების მიხედვით',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                  renderer: function(v, label, storeItem) {
                                      // storeItem is your model, so return the value you want as label
                                      // return v + " - "  + storeItem.get('value');
                                       return  storeItem.get('value');
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
                      ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "Number of Liver Transplantation in Georgia"
                                    })
                                }


                       }],
                    }
            ,
            {
                        xtype : 'panel',
                        height: 520,
                        layout: 'fit',




                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 520,
                          id: 'ch9',
                          padding: '20',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome9,
                          insetPadding: 100,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText9',
                                  text  : 'Number of Transplantation by Country',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                  renderer: function(v, label, storeItem) {
                                      // storeItem is your model, so return the value you want as label
                                      // return v + " - "  + storeItem.get('value');

                                      if(storeItem.get('value') < 2) {
                                          return "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + storeItem.get('value');
                                      }

                                      if(storeItem.get('name') == "სომხეთი")
                                        return "\xa0\xa0\xa0\xa0" + storeItem.get('value');

                                      if(storeItem.get('name') == "შვედეთი")
                                        return "\xa0\xa0\xa0\xa0" + storeItem.get('value');


                                       return  storeItem.get('value');
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

                        ]
                ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "რომელ ქვეყანაში განხორცილდა გადანერგვა"
                                    })
                                }


                       }],

                    }
            ,

            {
                xtype: 'panel',
                height: 420,

                layout: 'fit',
                  items: [

                            {
                                xtype: 'chart',
                                id: 'cha10',
                                height: 410,
                                padding: '10 0 0 0',
                                animate: true,
                                shadow: false,
                                theme:'ColumnTheme',
                                style: 'background: #fff;',
                                legend: {

                                    position: 'right',
                /*
                                    x: 0,
                                    y:270,
                */
                                    padding: 45,
                                    boxFill: 'none',
                                    boxStrokeWidth: 0,
                                    //labelFont: '9px Helvetica',
                itemTpl: [
                        '<tpl if="value != 0">', // <= template condition
                            '<span class="x-legend-item-marker {[values.disabled?\'x-legend-inactive\':\'\']}" style="background:{mark};"></span>{name}',
                        '</tpl>'
                    ]

                                },
                                store: storeHome10,
                                insetPadding: 40,
                                items: [{
                                    type  : 'text',
                                    text  : 'Number of Transplantation by Clinic in Georgia since 1995.',
                                    id: 'chText10',
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
                                    fields: 'c1',
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
                                    title: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
                                    xField: 'year',
                                    yField: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
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

                                            renderer: function (storeItem, item) {
                                                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                                                this.setTitle(browser + ' for ' + storeItem.get('year') + ': ' + storeItem.get(item.yField));
                                            }


                                    }
                                }]
                            }
                            ,





                            /*
                            {
                                xtype:'panel',
                                padding: '4 25 0 0',
                                margin: '10',
                                id: 'lastupdated',
                                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                                border: 0
                            }
                            */

                    ]
                    ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "ღვიძლის გადანერგვის რაოდენობა კლინიკების მიხედვით დინამიკაში"
                                    })
                                }


                       }],

            }
            ,
            {
                xtype: 'panel',
                height: 420,
                layout: 'fit',
                  items: [

                            {
                                xtype: 'chart',
                                id: 'cha11',
                                height: 410,
                                padding: '10 0 0 0',
                                animate: true,
                                shadow: false,
                                theme:'ColumnTheme',
                                style: 'background: #fff;',
                                legend: {

                                    position: 'right',
                /*
                                    x: 0,
                                    y:270,
                */

                                    boxFill: 'none',
                                    boxStrokeWidth: 0,
                                    //labelFont: '9px Helvetica',
                itemTpl: [
                        '<tpl if="value != 0">', // <= template condition
                            '<span class="x-legend-item-marker {[values.disabled?\'x-legend-inactive\':\'\']}" style="background:{mark};"></span>{name}',
                        '</tpl>'
                    ]

                                },
                                store: storeHome11,
                                insetPadding: 40,
                                items: [{
                                    type  : 'text',
                                    text  : 'Number of Transplantation by Clinic in Georgia since 1995.',
                                    id: 'chText11',
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
                                    fields: 'c1',
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
                                    title: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
                                    xField: 'year',
                                    yField: [ 'c1','c2','c3','c4','c5', 'c6','c7','c8','c9','c10','c11','c12'],
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

                                            renderer: function (storeItem, item) {
                                                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                                                this.setTitle(browser + ' for ' + storeItem.get('year') + ': ' + storeItem.get(item.yField));
                                            }


                                    }
                                }]
                            }
                            ,





                            /*
                            {
                                xtype:'panel',
                                padding: '4 25 0 0',
                                margin: '10',
                                id: 'lastupdated',
                                html: '<div style="float:right"><strong>განახლებულია : </strong></div> ',
                                border: 0
                            }
                            */

                    ]
                    ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "თირკმლის გადანერგვის რაოდენობა კლინიკების მიხედვით დინამიკაში"
                                    })
                                }


                       }],

            }
            ,
             {
                        xtype : 'panel',
                        height: 450,
                        layout: 'fit',




                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 450,
                          id: 'ch12',
                          padding: '20',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome12,
                          insetPadding: 100,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText12',
                                  text  : 'Number of Transplantation by Country',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                    renderer: function(v, label, storeItem) {
                                        // storeItem is your model, so return the value you want as label
                                        return  storeItem.get('value');
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

                        ]
                ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "რომელ ქვეყანაში განხორცილდა გადანერგვა"
                                    })
                                }


                       }],

                    }
            ,
            {
                        xtype : 'panel',
                        height: 450,
                        layout: 'fit',




                        items: [
               {
                          xtype: 'chart',
                          layout: 'fit',
                          height: 450,
                          id: 'ch13',
                          padding: '75',
                          style: 'background: #fff',
                          animate: true,
                          theme:'ColumnTheme',
                          shadow: true,
                          store: storeHome13,
                          insetPadding: 100,
                          legend: {
                              field: 'name',
                              position: 'right',
                              boxStrokeWidth: 0,
                              labelFont: '12px Helvetica'
                          },
                          items: [
                              {
                                  type  : 'text',
                                  id: 'chText13',
                                  text  : 'Number of Transplantation by Country',
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
                                  cls:'biggertexts',
                                  display: 'outside',
                                  calloutLine: true,
                                    renderer: function(v, label, storeItem) {
                                        // storeItem is your model, so return the value you want as label
                                        return  storeItem.get('value');
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

                        ]
                ,
                        bbar: [
                       {
                                xtype: 'button',
                                docked: 'left',
                                text: 'ჩამოტვირთეთ PNG',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("chart").save({
                                        type: 'image/png',
                                        filename: "რომელ ქვეყანაში განხორცილდა გადანერგვა"
                                    })
                                }


                       }],

                    }

    ]


            ,





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



        storeHomeClinic4.on('load', function(store, records, successful){

            var chart = Ext.getCmp('cha4');
            var count = 0;
            var series = chart.series.getAt(0);

            var $i = 1;
            var title = '[';
            var yFields = '[';

            var count = store.getTotalCount();


             store.each(function(record){
                 if(record.get('clinic').length > 28)
                  title  += ("'" + record.get('clinic').substring(0, 28) + " ..." + "'");
                 else
                  title  += ("'" + record.get('clinic') + "'");
                 yFields += '"c' + $i + '",';
                 if(count != $i)
                     title += ",";
                 $i++;
            });
            title +="]";
            yFields +="]";


            series.title = eval(title);
            series.yField = eval(yFields);

        });


        storeHome4.on('load', function(store, records, successful){
            storeHome4.filter([
                {
                    fn   : function(record) {
                        total4 = total4 + record.get('c1') + record.get('c2') + record.get('c3') + record.get('c4') +
                                  record.get('c5') + record.get('c6') + record.get('c7') + record.get('c8') +
                                  record.get('c9') + record.get('c10') + record.get('c11') + record.get('c12');
                        return 1;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText4').update('<tspan x="40" dy="6.546875">საქ-ში ​შესრულებული ​ტრანსპლანტაციათა რაოდენობა 1995 წლიდან კლინიკების მიხედვით. სულ: ' + total4 + '</tspan>');

        });

        storeHome5.on('load', function(store, records, successful){
            storeHome5.filter([
                {
                    fn   : function(record) {
                        total5 = total5 + record.get('count');
                        return 2;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText5').update('<tspan x="40" dy="6.546875">აღრიცხვაზე მყოფ ორგანოგადანერგილ პაციენტთა რაოდენობა 1995 წლიდან. სულ: ' + total5 + '</tspan>');

        });

        storeHome6.on('load', function(store, records, successful){
            storeHome6.filter([
                {
                    fn   : function(record) {
                        total6 = total6 + record.get('value');
                        return 6;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText6').update('<tspan x="40" dy="6.546875">რომელ ქვეყანაში განხორცილდა გადანერგვა. სულ: ' + total6 + '</tspan>');

        });

        storeHome7.on('load', function(store, records, successful){
            storeHome7.filter([
                {
                    fn   : function(record) {
                        total7 = total7 + record.get('value');
                        return 7;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText7').update('<tspan x="40" dy="6.546875">საქ-ში წარმოებული ღვიძლის გადანერგვათა რაოდენობა კლინიკების მიხედვით. სულ: ' + total7 + '</tspan>');

        });

        storeHome8.on('load', function(store, records, successful){
            storeHome8.filter([
                {
                    fn   : function(record) {
                        total8 = total8 + record.get('value');
                        return 8;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText8').update('<tspan x="40" dy="6.546875">საქ-ში წარმოებული თირკმლის გადანერგვათა რაოდენობა კლინიკების მიხედვით. სულ: ' + total8 + '</tspan>');

        });

        storeHome9.on('load', function(store, records, successful){
            storeHome9.filter([
                {
                    fn   : function(record) {
                        total9 = total9 + record.get('value');
                        return 9;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText9').update('<tspan x="40" dy="6.546875">გადანერგვათა რაოდენობა ქვეყნების მიხედვით აღრიცხვაზე მყოფ პაციენტთა შორის. სულ: ' + total9 + '</tspan>');

        });

        storeHomeClinic10.on('load', function(store, records, successful){

            var chart = Ext.getCmp('cha10');
            var count = 0;
            var series = chart.series.getAt(0);

            var $i = 1;
            var title = '[';
            var yFields = '[';

            var count = store.getTotalCount();


             store.each(function(record){
                 if(record.get('clinic').length > 28)
                  title  += ("'" + record.get('clinic').substring(0, 28) + " ..." + "'");
                 else
                  title  += ("'" + record.get('clinic') + "'");
                 yFields += '"c' + $i + '",';
                 if(count != $i)
                     title += ",";
                 $i++;
            });
            title +="]";
            yFields +="]";


            series.title = eval(title);
            series.yField = eval(yFields);

        });


        storeHome10.on('load', function(store, records, successful){
            storeHome10.filter([
                {
                    fn   : function(record) {
                        total10 = total10 + record.get('c1') + record.get('c2') + record.get('c3') + record.get('c4') +
                                  record.get('c5') + record.get('c6') + record.get('c7') + record.get('c8') +
                                  record.get('c9') + record.get('c10') + record.get('c11') + record.get('c12');
                        return 1;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText10').update('<tspan x="40" dy="6.546875">ღვიძლის გადანერგვის რაოდენობა კლინიკების მიხედვით დინამიკაში. სულ: ' + total10 + '</tspan>');

        });

        storeHomeClinic11.on('load', function(store, records, successful){

            var chart = Ext.getCmp('cha11');
            var count = 0;
            var series = chart.series.getAt(0);

            var $i = 1;
            var title = '[';
            var yFields = '[';

            var count = store.getTotalCount();


             store.each(function(record){
                 if(record.get('clinic').length > 28)
                  title  += ("'" + record.get('clinic').substring(0, 28) + " ..." + "'");
                 else
                  title  += ("'" + record.get('clinic') + "'");
                 yFields += '"c' + $i + '",';
                 if(count != $i)
                     title += ",";
                 $i++;
            });
            title +="]";
            yFields +="]";


            series.title = eval(title);
            series.yField = eval(yFields);

        });


        storeHome11.on('load', function(store, records, successful){
            storeHome11.filter([
                {
                    fn   : function(record) {
                        total11 = total11 + record.get('c1') + record.get('c2') + record.get('c3') + record.get('c4') +
                                  record.get('c5') + record.get('c6') + record.get('c7') + record.get('c8') +
                                  record.get('c9') + record.get('c10') + record.get('c11') + record.get('c12');
                        return 1;
                    },
                    scope: this
                }
            ])

            //Ext.get('chText').setHTML('hello');
            Ext.get('chText11').update('<tspan x="40" dy="6.546875">თირკმლის გადანერგვის რაოდენობა კლინიკების მიხედვით დინამიკაში. სულ: ' + total11 + '</tspan>');

        });

        storeHome12.on('load', function(store, records, successful){
            storeHome12.filter([
                {
                    fn   : function(record) {
                        total12 = total12 + record.get('value');
                        return record.get('value')
                    },
                    scope: this
                }
            ])

          //Ext.get('chText').setHTML('hello');
           //Ext.get('chText12').update('<tspan x="40" dy="6.546875">აღრიცხვაზე მყოფი პაციენტები, სულ : ' + total12 + '</tspan>');
            Ext.get('chText12').update('<tspan x="40" dy="6.546875">იმუნოსუპრესიული მედიკამენტების მომხმარებლები</tspan>');

        });

        storeHome13.on('load', function(store, records, successful){
            storeHome13.filter([
                {
                    fn   : function(record) {
                        total13 = total13 + record.get('value');
                        return record.get('value')
                    },
                    scope: this
                }
            ])

          //Ext.get('chText').setHTML('hello');
           Ext.get('chText13').update('<tspan x="40" dy="6.546875">დონორთა კატეგორიები, სულ : ' + total13 + '</tspan>');


        });


    });


/*
 Ext.chart.LegendItem.override({
    updateSpecPosition: function(positionTo) {
        var me = this,
            items = me.items,
            ln = items.length,
            i = 0,
            item;
		var posX = positionTo.x;
		var posY = positionTo.y;
        for (; i <ln; i++) {
            item = items[i];
            switch (item.type) {
                case 'text':
                    item.setAttributes({
                        x: 20 + posX,
                        y: posY
                    }, true);
                    break;
                case 'rect':
                    item.setAttributes({
                        translate: {
                            x: posX,
                            y: posY - 6
                        }
                    }, true);
                    break;
                default:
                    item.setAttributes({
                        translate: {
                            x: posX,
                            y: posY
                        }
                    }, true);
            }
        }
    }
});
Ext.chart.Legend.override({
 updatePosition: function() {
        var me = this,
            items = me.items,
            pos, i, l, bbox;

        if (me.isDisplayed()) {

            pos = me.calcPosition();

            me.x = pos.x;
            me.y = pos.y;

           //items[i].updatePosition({x:100,y:100});

            var posX = me.x;
            var posY = me.y;
            for (i = 0, l = items.length; i <l; i++) {
            	posX = me.x;
            	posY = me.y;
            	//items[i].updatePosition();
            	if(i%2>0)
            	{
            		posX += 120;
            	}

            	posY += parseInt(i/2)*20;

            	items[i].updateSpecPosition({x:posX,y:posY});
            }

            bbox = me.getBBox();






            if (isNaN(bbox.width) || isNaN(bbox.height)) {
                if (me.boxSprite) {
                    me.boxSprite.hide(true);
                }
            }
            else {
                if (!me.boxSprite) {
                    me.createBox();
                }


                me.boxSprite.setAttributes(bbox, true);
                me.boxSprite.show(true);
            }
        }
    }
});
*/


});

