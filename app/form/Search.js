// JavaScript Document
/**
 * Developed by AVA - A.Avetisov.
 * Date: 15.07.2016
 */
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
        'Application.view.layout.Center'
        //'Ext.grid.plugin.BufferedRenderer'
       // 'Ext.ux.DataTip'
    ]

    //Ext.QuickTips.init();
    var bd = Ext.getBody();

    var me=this;
    var id='tab-city_';
    var id2='tab-country_';



    var storeSearchPatients=Ext.create('Ext.mod.store.SearchPatients',{
        model: 'Ext.mod.model.SearchPatients'
    });

    var storeCities=Ext.create('Ext.mod.store.Cities',{
        model: 'Ext.mod.model.Cities'
    });

    var storeCountries=Ext.create('Ext.mod.store.Countries',{
        model: 'Ext.mod.model.Countries'
    });

    var storeClinics=Ext.create('Ext.mod.store.Clinics',{
        model: 'Ext.mod.model.Clinics'
    });

    var storeDiagnosis=Ext.create('Ext.mod.store.Diagnosis',{
        model: 'Ext.mod.model.Diagnosis'
    });

    var storeDonors=Ext.create('Ext.mod.store.Donors',{
        model: 'Ext.mod.model.Donors'
    });

    var storeDoctors=Ext.create('Ext.mod.store.Doctors',{
        model: 'Ext.mod.model.Doctors'
    });

    var storePatients=Ext.create('Ext.mod.store.Patients',{
        model:'Ext.mod.model.Patients'
    });

    var storeMedicines=Ext.create('Ext.mod.store.Medicines',{
        model: 'Ext.mod.model.Medicines'
    });

    var storeConditions=Ext.create('Ext.mod.store.Conditions',{
        model: 'Ext.mod.model.Conditions'
    });

    var storeDialysis=Ext.create('Ext.mod.store.Dialysis',{
        model: 'Ext.mod.model.Dialysis'
    });

    var comboPatient = new Ext.form.ComboBox({
        name : 'patient_id',
        id: 'cpatient',
        width: 170,
        store: storePatients,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'patientFull',
        valueField    : 'patient_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'
    });

    var comboHistoryID = new Ext.form.ComboBox({
        name : 'history_id',
        id: 'chistoryid',
        width: 170,
        store: storePatients,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'history_id',
        valueField    : 'history_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'
    });

    var comboMedicines = new Ext.form.ComboBox({
        name : 'medicine_id',
        id: 'cmeds',
        width: 170,
        store: storeMedicines,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'medicine_id',
        editable      : false,
        forceSelection: false,
        multiSelect: true,
        listeners: {
            change: function (combo, eOpts) {
                var store = combo.getStore();
                var values = [];
                Ext.Array.each(combo.value, function (id) {
                    values.push(store.getById(id + ''));
                });
                //combo.setValue(values);
            }
        }
    });



    var comboCity = new Ext.form.ComboBox({
        name : 'city_id',
        id: 'ccity',
        width: 170,
        store: storeCities,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'city_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'

        /*
         trigger1Cls: 'x-form-clear-trigger',
         onTrigger1Click: function() {
         this.clearValue();
         },
         */
        /*
         listConfig: {

         getInnerTpl: function() {

         return '<div><div  data-qtip="{name}">{name}</div><div ><button class="dd" style="width: 16px;height: 16px" onclick="storeCities.add(\'ddd\');storeCities.reload();"></button></div></div>';
         }
         },
         */

    });

    var comboCountry = new Ext.form.ComboBox({
        name : 'country_id',
        id: 'ccountry',
        width: 170,
        store: storeCountries,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'country_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'

    });

    var comboCCountry = new Ext.form.ComboBox({
        name : 'country_id',
        id: 'cCcountry',
        width: 170,
        store: storeCountries,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'country_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'

    });


    var comboClinic = new Ext.form.ComboBox({
        name : 'clinic_id',
        id: 'cclinic',
        width: 170,
        store: storeClinics,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'clinicdesc',
        valueField    : 'clinic_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local',
        tpl: '<tpl for="."><div class="x-boundlist-item">{clinicdesc}</div><tpl><hr /></tpl></tpl>',
    });

    var comboDiagnosis = new Ext.form.ComboBox({
        name : 'diagnosis_id',
        id: 'cdiagnosis',
        width: 170,
        store: storeDiagnosis,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'txt',
        valueField    : 'diagnosis_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local',
        tpl: '<tpl for="."><div class="x-boundlist-item">{txt}</div><tpl><hr /></tpl></tpl>',
    });

    var comboDonors = new Ext.form.ComboBox({
        name : 'donor_type_id',
        id: 'cdonor',
        width: 170,
        store: storeDonors,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'donor_type_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'
    });

    var comboDoctors = new Ext.form.ComboBox({
        name : 'doctor_id',
        id: 'cdoctor',
        width: 170,
        store: storeDoctors,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'dnameFull',
        valueField    : 'doctor_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local'
    });

    var comboConditions = new Ext.form.ComboBox({
        name : 'condition_id',
        id: 'ccondition',
        width: 170,
        store: storeConditions,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'condition',
        valueField    : 'condition_id',
        editable      : true,
        forceSelection: true,
        queryMode: 'local',
        tpl: '<tpl for="."><div class="x-boundlist-item">{condition}</div><tpl><hr /></tpl></tpl>',
    });

    //Ext.select('.dd').on('click', c);

    /*
     * ================  Simple form  =======================
     */
    //bd.createChild({tag: 'h5', html: 'ზოგადი ინფორმაცია'});

    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';



    var search =   Ext.widget({
        xtype: 'form',
        layout: 'form',
        collapsible: false,
        id: 'searchForm',
        frame: true,
        bodyPadding: '5',
        width: '100%',
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 135
        },
        defaults: {
            anchor: '80%'
        },

        defaultType: 'textfield',
        items: [
            {
            xtype:'fieldset',
            title: '<strong>გადანერგილები</strong>',
            defaultType: 'textfield',
            collapsible: false,
             defaults: {
                anchor: '60%'
            },
            items :[
                {
                xtype: 'checkboxgroup',
                fieldLabel: 'აირჩიეთ კატეგორია',
                //arrange Checkboxes into 3 columns
                columns: 3,
                allowBlank: true,
                itemId: 'Categories',
                id: 'Cats',
                items: [
                    {
                        xtype: 'checkbox',
                        boxLabel: 'თირკმელი',
                        name: 'cat',
                        checked: false,
                        inputValue: '44,57'
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'ღვიძლი',
                        name: 'cat',
                        inputValue: '43,59'
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'რქოვანა',
                        name: 'cat',
                        inputValue: '42,58'
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'ძვალი',
                        name: 'cat',
                        inputValue: '41,60'
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'გული',
                        name: 'cat',
                        inputValue: '65,68'
                    }
                ]
            }

                /*
                ,
                {
                    xtype:'panel',
                    padding: '5 0 10 0',
                    html:'<div id="gg"></div>',
                    border: 0,
                }
                */
           ]
          },

            {
                xtype:'fieldset',
                title: '<strong>დონორები</strong>',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                items :[
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'აირჩიეთ კატეგორია',
                        //arrange Checkboxes into 3 columns
                        columns: 3,
                        allowBlank: true,
                        itemId: 'Donors',
                        id: 'Dons',
                        items: [
                            {
                                xtype: 'checkbox',
                                boxLabel: 'თირკმელი',
                                name: 'don',
                                checked: false,
                                inputValue: '32,61'
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'ღვიძლი',
                                name: 'don',
                                inputValue: '36,62'
                            }

                        ]
                    }

                    /*
                     ,
                     {
                     xtype:'panel',
                     padding: '5 0 10 0',
                     html:'<div id="gg"></div>',
                     border: 0,
                     }
                     */
                ]
            },

            {
                xtype:'fieldset',
                title: '<strong>არქივი</strong>',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                items :[
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'აირჩიეთ არქივი',
                        //arrange Checkboxes into 3 columns
                        columns: 3,
                        allowBlank: true,
                        itemId: 'Archives',
                        id: 'Arch',
                        items: [
                            {
                                xtype: 'checkbox',
                                boxLabel: 'არქივი თირკმელი',
                                name: 'arc',
                                inputValue: '57'
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'არქივი ღვიძლი',
                                name: 'arc',
                                inputValue: '59'
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'არქივი რქოვანა',
                                name: 'arc',
                                inputValue: '58'
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'არქივი ძვალი',
                                name: 'arc',
                                inputValue: '60'
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'არქივი გული',
                                name: 'arc',
                                inputValue: '68'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '<strong>საერთო მონაცემები</strong>',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                layout:{
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                padding: '10',
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        border: 'none',
                        items: [
                            {
                                xtype: 'label',
                                text: 'პაციენტი',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboPatient,

                            }
                        ]
                    }
                    ,
                   {
                    xtype: 'fieldset',
                    margin: '0 0 0 -10',
                    layout: 'hbox',
                    border: 'none',
                    items: [
                         {
                         xtype: 'label',
                         text: 'ქვეყანა',
                         margin: '0 5 0 5'
                        },
                        {
                            xtype: comboCountry,

                        }
                     ]
                   }
                   ,
                   {
                    xtype: 'fieldset',
                    margin: '0 0 0 -10',
                    layout: 'hbox',
                    border: 'none',
                    items: [
                      {
                        xtype: 'label',
                        text: 'ქალაქი',
                        margin: '0 5 0 5'
                      },
                      {
                        xtype: comboCity,
                      }
                    ]
                  }
                  ,
                   {
                      xtype: 'fieldset',
                      margin: '0 0 0 -10',
                      layout: 'hbox',
                      border: 'none',
                      items: [
                         {
                            xtype: 'label',
                            text: 'ისტორიის №',
                            margin: '0 5 0 5'
                         },
                         {
                            xtype: comboHistoryID,
                         }
                       ]
                    }

                ]
            },
            {
                xtype: 'fieldset',
                title: '<strong>სამედიცინო მონაცემები</strong>',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                layout: {
                    type: 'table',
                    columns: 4,
                    trAttrs: { height: 50 },

                    //tableAttrs:{border:'1px solid #ccc'}
                },
                padding: '10',
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        border: 'none',
                        width:240,
                        items: [
                            {
                                xtype: 'label',
                                text: 'ექიმი',
                                margin: '0 5 0 5',

                            },
                            {
                                xtype: comboDoctors,
                            }
                        ]
                    },

                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        width:270,
                        border: 'none',
                        items: [
                            {
                                xtype: 'label',
                                text: 'დიაგნოზი',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboDiagnosis,
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        border: 'none',
                        width:270,
                        items: [
                            {
                                xtype: 'label',
                                text: 'დონორი',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboDonors,
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        border: 'none',
                        width:270,
                        items: [
                            {
                                xtype: 'label',
                                text: 'მდგომა-ბა',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboConditions,
                            }
                        ]
                    }
                    ,
                    {
                        xtype: 'radiogroup',
                        vertical: false,
                        columns: 2,
                        id: 'dialysis',
                        width: 450,
                        fieldLabel: 'დიალიზი',
                        colspan: 2,
                        margin: '0 5 0 5',
                        items: [
                            {boxLabel: 'პერიტონიალური', name: 'dialysis', inputValue: '70'},
                            {boxLabel: 'ჰემოდიალიზი', name: 'dialysis', inputValue: '71'},
                        ]


                    }
                    ,
                    {
                        xtype: 'spacer',
                        border: 0,
                        height: 0,
                        colspan: 2,
                        width: 300

                    }
                    ,


                ]
            }

            ,

            {
                xtype: 'fieldset',
                title: '<strong>გადანერგვა</strong>',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                layout: {
                    type: 'table',
                    columns: 3,
                    trAttrs: { height: 50 },
                    /*
                    tableAttrs: {
                        border: '1px solid #cccccc'
                    },
                    */

                },
                padding: '10',
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        width:260,
                        layout: 'hbox',
                        border: 'none',
                        items: [
                            {
                                xtype: 'label',
                                text: 'ქვეყანა',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboCCountry,

                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        colspan: 2,
                        border: 'none',
                        items: [
                            {
                                xtype: 'label',
                                text: 'კლინიკა',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboClinic,
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        width: 330,
                        border: 'none',

                        items: [
                            {
                                xtype: 'datefield',
                                id: 'cdate1',
                                minDate: new Date(),
                                width: 100,
                            },
                            {
                                xtype: 'label',
                                text: '-დან',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: 'datefield',
                                id: 'cdate2',
                                minDate: new Date(),
                                width: 100,
                            },
                            {
                                xtype: 'label',
                                text: '-მდე',
                                margin: '0 5 0 5'
                            }


                        ]
                    }

                    ,
                    {
                        xtype: 'fieldset',
                        margin: '0 0 0 -10',
                        layout: 'hbox',
                        width: 290,
                        border: 'none',
                        items: [
                            {
                                xtype: 'label',
                                text: 'მედიკამენტები',
                                margin: '0 5 0 5'
                            },
                            {
                                xtype: comboMedicines,
                            }
                        ]
                    },

                    {
                        xtype: 'radiogroup',
                        vertical: false,
                        columns: 2,
                        width:110,
                        id: 'medC',
                        margin: '0 5 0 5',
                        items: [
                            {boxLabel: 'AND', name: 'medC', inputValue: '1', checked: true},
                            {boxLabel: ' OR', name: 'medC', inputValue: '2'},
                        ]


                    }

                ]
            }
            ,

            {
                xtype: 'fieldset',
                margin: '30 0 30 0',
                layout: 'hbox',
                border: 'none',
                items: [
                    {
                        xtype: 'label',
                        text: 'საკვანძო სიტყვა',
                        margin: '0 5 0 5'
                    },
                    {
                        xtype:'textfield',
                        id: 'sw',
                        width: '200'
                    }
                ]

            }

        ],


        buttons: [{
            text: 'ძიება',
            handler: function () {
                //this.up('form').getForm().isValid();
                var form = Ext.getCmp('searchForm').getForm();
                if(form.isValid()){

                    var cats = Ext.getCmp('Cats').getChecked();

                    //value of the selected Checkboxes
                    var resultString = "";

                        Ext.each(cats, function(obj, index){
                            if(index == 0)
                                resultString = resultString + obj.getSubmitValue();
                            else
                                resultString =  resultString + ',' + obj.getSubmitValue();
                        });


                    var catvalues = resultString;


                    var dons = Ext.getCmp('Dons').getChecked();

                    //value of the selected Checkboxes
                    var resultString = "";

                    Ext.each(dons, function(obj, index){
                        if(index == 0)
                            resultString = resultString + obj.getSubmitValue();
                        else
                            resultString =  resultString + ',' + obj.getSubmitValue();
                    });


                    var donvalues = resultString;



                    var archs = Ext.getCmp('Arch').getChecked();

                    //value of the selected Checkboxes
                    var resultString = "";

                    Ext.each(archs, function(obj, index){
                        if(index == 0)
                            resultString = resultString + obj.getSubmitValue();
                        else
                            resultString =  resultString + ',' + obj.getSubmitValue();
                    });


                    var archvalues = resultString;



                    var cpatient = (Ext.getCmp('cpatient').getValue()!=null)?Ext.getCmp('cpatient').getValue():'';
                    var ccountry = (Ext.getCmp('ccountry').getValue()!=null)?Ext.getCmp('ccountry').getValue():'';
                    var cCcountry = (Ext.getCmp('cCcountry').getValue()!=null)?Ext.getCmp('cCcountry').getValue():'';
                    var ccity = (Ext.getCmp('ccity').getValue()!=null)?Ext.getCmp('ccity').getValue():'';
                    var cclinic = (Ext.getCmp('cclinic').getValue()!=null)?Ext.getCmp('cclinic').getValue():'';
                    var cdoctor = (Ext.getCmp('cdoctor').getValue()!=null)?Ext.getCmp('cdoctor').getValue():'';
                    var cdiagnosis = (Ext.getCmp('cdiagnosis').getValue()!=null)?Ext.getCmp('cdiagnosis').getValue():'';
                    var cdonor = (Ext.getCmp('cdonor').getValue()!=null)?Ext.getCmp('cdonor').getValue():'';
                    var chistoryid = (Ext.getCmp('chistoryid').getValue()!=null)?Ext.getCmp('chistoryid').getValue():'';
                    var ccondition = (Ext.getCmp('ccondition').getValue()!=null)?Ext.getCmp('ccondition').getValue():'';
                    var cdialysis = (Ext.getCmp('dialysis').getChecked()!=null && Ext.getCmp('dialysis').getChecked()!='')?Ext.getCmp('dialysis').getValue()['dialysis']:'';
                    var cmeds = (Ext.getCmp('cmeds').getValue()!=null)?Ext.getCmp('cmeds').getValue():'';
                    var cmedC = (Ext.getCmp('medC').getChecked()!=null)?Ext.getCmp('medC').getValue()['medC']:'';
                    var cdate1 = (Ext.getCmp('cdate1').getValue()!=null)?Ext.getCmp('cdate1').getValue():'';
                    var cdate2 = (Ext.getCmp('cdate2').getValue()!=null)?Ext.getCmp('cdate2').getValue():'';
                    var sw = (Ext.getCmp('sw').getValue()!=null)?Ext.getCmp('sw').getValue():'';

                    if(cdate1!=''){
                        var m = cdate1.getMonth() + 1;
                        var d = cdate1.getDate();
                        var Y = cdate1.getFullYear();
                        cdate1 = m + "/" + d + "/" + Y;
                    }

                    if(cdate2!=''){
                        var m2 = cdate2.getMonth() + 1;
                        var d2 = cdate2.getDate();
                        var Y2 = cdate2.getFullYear();
                        cdate2 = m2 + "/" + d2 + "/" + Y2;
                    }


                    form.submit({
                        success:function(form,action){

                            var src = "../module/search.php?catvalues=" + catvalues + "&donvalues=" + donvalues + "&archvalues=" + archvalues + "&cpatient=" + cpatient  + "&ccountry=" + ccountry + "&cCcountry=" + cCcountry + "&ccity=" + ccity + "&cclinic=" + cclinic + "&cdoctor=" + cdoctor + "&cdiagnosis=" + cdiagnosis + "&cdonor=" + cdonor + "&cmeds=" + cmeds + "&cmedC=" + cmedC + "&cdate1=" + cdate1 + "&cdate2=" + cdate2 + "&sw=" + encodeURI(sw);
                            ShowSearch(encodeURI(src));
                        }
                        ,
                        failure:function(form,action){
                           /*
                            window.open ("http://localhost/example/app/module/test.php?catvalues=" + catvalues + "&archvalues=" + archvalues + "&ccountry=" + ccountry + "&ccity=" + ccity +
                                "&cclinic=" + cclinic + "&cdoctor=" + cdoctor + "&cdiagnosis=" + cdiagnosis + "&cdonor=" + cdonor +"","mywindow","location=1,status=1,scrollbars=1, width=1000,height=600");
                            */
                            var src = "../module/search.php?catvalues=" + catvalues + "&donvalues=" + donvalues + "&archvalues=" + archvalues + "&cpatient=" + cpatient + "&ccountry=" + ccountry + "&cCcountry=" + cCcountry + "&ccity=" + ccity + "&cclinic=" + cclinic + "&cdoctor=" + cdoctor + "&cdiagnosis=" + cdiagnosis + "&cdonor=" + cdonor + "&chistoryid=" + chistoryid + "&ccondition=" + ccondition + "&cdialysis=" + cdialysis + "&cmeds=" + cmeds + "&cmedC=" + cmedC + "&cdate1=" + cdate1 + "&cdate2=" + cdate2 + "&sw=" + encodeURI(sw);
                            //alert(src);
                            ShowSearch(encodeURI(src));
                            /*
                            storeSearchPatients.reload();
                            var grid=Ext.getCmp('search_info').getStore();
                            grid.reload();
                            //grid.reload();

                            var datar = new Array();
                            datar["id"]='m7';
                            datar["name"] = 'ღვიძლგადანერგილები Liv';
                            datar["leaf"] = true;
                            datar["readOnly"] = true;


                            var myWindow = Ext.create('Application.view.layout.Center', {
                            });


                            myWindow.showModule(datar);
                            */
                            /*
                            var cmp = Ext.getCmp('searchForm');
                            
                            //alert(d);​
                            var myWindow = new Application.view.layout.Center ({
                                renderTo: d
                            });



                            myWindow.showModule(datar);
                             */


                        }


                    });

                }


            }
        }, {
            text: 'წაშლა',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }]
    });


    search.render(document.body);



    function ShowSearch(src) {

      var  frmShowSearch= new Ext.window.Window({
            autoWidth: true,
            autoHeight: true,
            minHeight: Ext.getBody().getHeight() + 80,
            width: Ext.getBody().getWidth() - 20,
            x: 5,
            y:5,
            title: "ძიების შედეგი",
            constrain: true,
            renderTo: Ext.getBody(),
            closable: true,
            autoScroll: true,
            modal: true,
            layout: 'fit',
            items: [{
              xtype: "component",
              autoEl: {
                  frameborder: 0,
                  tag: "iframe",
                  width: '100%',
                  layout: 'fit',
                  src: src
              }
            }]

        });

        frmShowSearch.show();

    }



/*
   var  grid = Ext.create('Ext.grid.Panel', {
        renderTo: 'gg',
        width: '100%',
        id:'search_info',
        collapsible:true,
        autoScroll:true,
        store:storeSearchPatients,
        flex:1,
        columns:[{
            text:'გადანერგვის თარიღი',
            flex:25/100,
            dataIndex:'date'
        },{
            text:'კლინიკა',
            flex:25/100,
            dataIndex:'clinic',

        }
        ],

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
    */


});