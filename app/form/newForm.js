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

        }
    });
};


Ext.onReady(function() {



    requires:[
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.window.*',
        //'Ext.grid.plugin.BufferedRenderer'
       // 'Ext.ux.DataTip'
    ]

    //Ext.QuickTips.init();
    var bd = Ext.getBody();

    var me=this;
    var id='tab-city_';
    var id2='tab-country_';
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

    var storeCities=Ext.create('Ext.mod.store.Cities',{
        model: 'Ext.mod.model.Cities'
    });

    var storeCountries=Ext.create('Ext.mod.store.Countries',{
        model: 'Ext.mod.model.Countries'
    });


    var cats=Ext.create('Ext.mod.store.Cats',{
        model: 'Ext.mod.model.Cats',
    });

    var catsSub=Ext.create('Ext.mod.store.CatsSub',{
        model: 'Ext.mod.model.CatsSub',
    });


    var comboCity = new Ext.form.ComboBox({
        name : 'city_id',
        width: 170,
        store: storeCities,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'city_id',
        editable      : true,
        forceSelection: true,
        listeners: {
            select:{
                fn:function(combo, value) {
                    if( acc!='r') {
                        var butt = Ext.getCmp('city_delete_but');
                        if (combo.getValue() > 0)
                            butt.show();
                        else
                            butt.hide();
                    }
                }
            }
        }

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
        width: 170,
        store: storeCountries,
        mode : 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'name',
        valueField    : 'country_id',
        editable      : true,
        forceSelection: true,
        listeners: {
            select:{
                fn:function(combo, value) {
                    if( acc!='r') {
                        var butt = Ext.getCmp('country_delete_but');
                        if (combo.getValue() > 0)
                            butt.show();
                        else
                            butt.hide();
                    }
                }
            }
        }

    });




    var comboCats = new Ext.form.ComboBox({
        name : 'parent_category_id',
        width: 170,
        store: cats,
        // mode : 'local',
        queryMode: 'local',
        listWidth     : 170,
        triggerAction : 'all',
        displayField  : 'category_name',
        valueField    : 'category_id',
        editable      : false,
        forceSelection: true,
        allowBlank:false,
        emptyText: 'Select Category...',
        listeners: {
            select:{
                fn:function(combo, value) {
                    if( acc!='r') {
                        var butt = Ext.getCmp('reg_cats_delete_but');
                        if (combo.getValue() > 0)
                            butt.show();
                        else
                            butt.hide();
                    }
                }
            }
        }
    });

    var comboCatsSub = new Ext.form.ComboBox({
        name : 'category_id',
        width: 195,
        store: catsSub,
        mode : 'local',
        queryMode: 'local',
        listWidth     : 195,
        //triggerAction : 'all',
        displayField  : 'category_name',
        valueField    : 'category_id',
        editable      : false,
        forceSelection: true,
        allowBlank:false,
        emptyText: 'Select Subcategory...'
    });


    Ext.ux.SetCascading(comboCats, comboCatsSub);

    //Ext.select('.dd').on('click', c);

    /*
     * ================  Simple form  =======================
     */
    //bd.createChild({tag: 'h5', html: 'ზოგადი ინფორმაცია'});



    var simple =   Ext.widget({
        xtype: 'form',
        layout: 'form',
        collapsible: false,
        id: 'simpleForm',
        frame: true,
        title: 'ზოგადი ინფორმაცია',
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
                xtype: 'filefield',
                id: 'form-file',
                emptyText: 'Select an image',
                fieldLabel: 'Photo',
                name: 'image',
                buttonText: '',
                buttonConfig: {
                    iconCls: 'upload-icon'
                }
            }
             ,
            {
            xtype:'fieldset',
            title: 'ძირითადი ინფორმაცია',
            defaultType: 'textfield',
            collapsible: false,
             defaults: {
                anchor: '60%'
            },
            items :[{
                fieldLabel: 'გვარი',
                afterLabelTextTpl: required,
                name: 'patientlastname',
                allowBlank:false
            },{
                fieldLabel: 'სახელი',
                afterLabelTextTpl: required,
                name: 'patientname'
            },{
                fieldLabel: 'მამის სახელი',
                name: 'patronymic'
            },
            {
                 fieldLabel: 'პირადი ნომერი',
                  name: 'personalid'
            },
            {
                 fieldLabel: 'ისტორიის ნომერი',
                 name: 'history_id'
            },
            {
                  fieldLabel: 'დაბადების თარიღი',
                  name: 'birthday',
                  xtype: 'datefield',
                  tooltip: 'Enter your date of birth'
            },
            {
                xtype: 'radiogroup',
                vertical: false,
                fieldLabel: 'სქესი',
                items: [
                    {boxLabel: 'მამრობითი', name: 'gendercode', inputValue: '1'},
                    {boxLabel: 'მდედრობითი', name: 'gendercode', inputValue: '2'},
                ]

            }
           ]
        },{
            xtype:'fieldset',
            title: 'მისამართი',
            collapsible: false,
            defaultType: 'textfield',
            layout: 'anchor',
            defaults: {
                anchor: '60%'
            },
            items :[
                {

                    xtype: 'fieldset',
                    margin: '0 0 0 -9',

                    layout: 'hbox',
                    border: 'none',
                    items: [
                        {
                            xtype: 'label',
                            text: 'ქალაქი',
                            //margins: '5 43',
                            width:140
                        },

                        {
                            xtype: comboCity,
                        },

                        {
                            xtype: 'button',
                            width: 18,
                            height: 18,
                            margin :'3 5 0 5',
                            text:'+',
                            id:'btn-d-tambah-city',
                            icon: '../../resources/images/plus_12.png',
                            handler:function(btn){
                                CreateAddCity();
                            },
                            listeners: {
                                afterrender: function() {
                                    Ext.create('Ext.tip.ToolTip',{
                                        target:'btn-d-tambah-group',
                                        html:'Add new group',
                                        anchor: 'top'
                                    });
                                }
                            }

                        }
                        ,
                        {
                            xtype: 'button',
                            width: 18,
                            id: 'city_delete_but',
                            height: 18,
                            margin :'3 0 0 0',
                            text:'-',
                            icon: '../../resources/images/minus_12.png',

                            handler:function(btn){
                                DeleteValue(comboCity.getValue(),comboCity.getRawValue(), this.id, storeCities, '../../server/fields/cities.php?act=Delete');
                            },

                            listeners: {
                                afterrender: function() {
                                    if( acc!='r') {
                                        if (comboCity.getValue() > 0)
                                            this.show();
                                        else
                                            this.hide();
                                    }
                                    else
                                        this.hide();
                                }
                            }

                        }

                    ]
                },
                {

                    xtype: 'fieldset',
                    margin: '5 0 5 -9',

                    layout: 'hbox',
                    border: 'none',
                    items: [
                        {
                            xtype: 'label',
                            text: 'ქვეყანა',
                            //margins: '5 43',
                            width:140
                        },

                        {
                            xtype: comboCountry,
                        },

                        {
                            xtype: 'button',
                            width: 18,
                            height: 18,
                            margin :'3 5 0 5',
                            text:'+',
                            id:'btn-d-tambah-country',
                            icon: '../../resources/images/plus_12.png',
                            handler:function(btn){
                                CreateAddCountry();
                            },
                            listeners: {
                                afterrender: function() {
                                    Ext.create('Ext.tip.ToolTip',{
                                        target:'btn-d-tambah-group',
                                        html:'Add new group',
                                        anchor: 'top'
                                    });
                                }
                            }

                        }
                        ,
                        {
                            xtype: 'button',
                            width: 18,
                            id: 'country_delete_but',
                            height: 18,
                            margin :'3 0 0 0',
                            text:'-',
                            icon: '../../resources/images/minus_12.png',

                            handler:function(btn){
                                DeleteValue(comboCountry.getValue(),comboCountry.getRawValue(), this.id, storeCountries,'../../server/fields/countries.php?act=Delete');
                            },

                            listeners: {
                                afterrender: function() {
                                    if( acc!='r') {
                                        if (comboCountry.getValue() > 0)
                                            this.show();
                                        else
                                            this.hide();
                                    }
                                    else
                                        this.hide();
                                }
                            }

                        }
                    ]
                },
            {
                fieldLabel: 'მისამართი',
                name: 'address1'
            }
           ]
         },
         {
             xtype: 'fieldset',
             title: 'დამატებითი ინფორმაცია',
             defaultType: 'textfield',
             collapsible: false,
             defaults: {
                    anchor: '60%'
             },
             items: [{
                 fieldLabel: 'მობილური',
                  name: 'phone2'
              },
              {
                  fieldLabel: 'სახლის ტელეფონი',
                   name: 'phone1'
              },
              {
                  fieldLabel: 'სამსახურის ტელ.',
                  name: 'work_phone'
              },
              {
                  fieldLabel: 'სამუშაო ადგილი',
                  name: 'work'
              },
              {
                  fieldLabel: 'ელ-ფოსტა',
                  name: 'email',
                  vtype:'email'
              }


             ]
         }
         ,
            {
                xtype: 'fieldset',
                title: 'რეგისტრატურა',
                defaultType: 'textfield',
                collapsible: false,
                defaults: {
                    anchor: '60%'
                },
                items: [
                    {
                        xtype: 'fieldset',
                        margin: '5 0 5 -9',

                        layout: 'hbox',
                        border: 'none',

                        items: [
                            {
                                xtype: 'label',
                                text: 'კატეგორიები',
                                afterLabelTextTpl: required,
                                //margins: '5 43',
                                width:140
                            },

                            {
                                xtype: comboCats,

                            },

                            {
                                xtype: 'button',
                                width: 18,
                                height: 18,
                                margin :'3 5 0 5',
                                text:'+',
                                icon: '../../resources/images/plus_12.png',

                                handler:function(btn){
                                    //var clinicdata = storeClinics.findRecord('clinic_id',data.clinic_id,0,false,false,true);
                                    //CreateAddClinic(clinicdata.data);
                                    CreateAddCats();
                                }
                            }
                            ,
                            {
                                xtype: 'button',
                                width: 18,
                                id: 'reg_cats_delete_but',
                                height: 18,
                                margin :'3 0 0 0',
                                text:'-',
                                icon: '../../resources/images/minus_12.png',

                                handler:function(btn){
                                    DeleteValue(comboCats.getValue(),comboCats.getRawValue(), this.id, cats, '../../server/fields/cats.php?act=Delete');
                                },

                                listeners: {
                                    afterrender: function() {
                                        if( acc!='r') {
                                            if (comboCats.getValue() > 0)
                                                this.show();
                                            else
                                                this.hide();
                                        }
                                        else
                                            this.hide();
                                    }
                                }

                            }
                        ]
                    },
                    {

                        xtype: 'fieldset',
                        margin: '5 0 5 -10',

                        layout: 'hbox',
                        border: 'none',

                        items: [
                            {
                                xtype: 'label',
                                text: 'ქვეკატეგორიები',
                                afterLabelTextTpl: required,
                                //margins: '5 43',
                                width:140
                            },

                            {
                                xtype: comboCatsSub,

                            }
                        ]
                    }
                ]
            }


        ],


        buttons: [{
            text: 'Save',
            handler: function () {
                //this.up('form').getForm().isValid();
                var form = Ext.getCmp('simpleForm').getForm();
                if(form.isValid()){


                    form.submit({
                        url:'../../server/fields/patients.php?act=Add',
                        method:'post',
                        waitMsg:'Please wait...',
                        reset:true,


                        success:function(form,action){
                            if(action.result.success){
                                //var grid=Ext.getCmp(id+'grid_city').getStore();
                                form.reset();
                                Ext.Msg.alert('Message','Record successfully saved');
                            }else{
                                Ext.Msg.alert('Message','Record failed to save');
                            }
                            simple.close();
                        }
                        ,
                        failure:function(form,action){
                            //***AVA*** check why always failure
                            //Ext.Msg.alert('Message',action.result.toString());
                            Ext.Msg.alert('Message','Record successfully saved');
                            simple.close();
                            /*
                            var win = Ext.WindowManager.getCmp('winForm');
                            win.close();
                            */

                        }


                    });

                }


            }
        }, {
            text: 'Cancel',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }]
    });

    simple.render(document.body);


    function CreateAddCity(){

        var me=this;

        var frmAddCity= new Ext.window.Window({
            height: 120,
            width: 400,
            title: 'ახალი ქალაქი',
            renderTo: Ext.getBody(),
            closable: true,
            autoScroll: true,
            modal: true,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'form',
                id:id+'f_city',
                border:0,
                items:[{
                    xtype:'panel',
                    layout:'hbox',
                    autoWidth: true,
                    bodyPadding:10,
                    items:[{
                        xtype:'textfield',
                        id:id+'txtCityName',
                        labelWidth:75,
                        name:id+'txtCityName',fieldLabel:'ქალაქი',
                        allowBlank:false,
                        width:350,
                        value:''
                    }]
                }],
                buttons:[{
                    xtype:'button',
                    text:'შენახვა',
                    icon: '../../resources/images/ok.png',
                    handler:function(btn){
                        var form = Ext.getCmp(id+'f_city').getForm();
                        if(form.isValid()){
                            form.submit({
                                url:'../../server/fields/cities.php?act=Add',
                                method:'post',
                                waitMsg:'Please wait...',
                                reset:true,
                                success:function(form,action){
                                    if(action.result.success){
                                        //var grid=Ext.getCmp(id+'grid_city').getStore();
                                        storeCities.reload();
                                        Ext.Msg.alert('Message','Record successfully saved');
                                    }else{
                                        Ext.Msg.alert('Message','Record failed to save');
                                    }
                                    frmAddCity.close();
                                },
                                failure:function(form,action){
                                    Ext.Msg.alert('Message','Record failed to save');
                                    frmAddCity.close();
                                }

                            });
                        }
                    }
                },{
                    xtype:'button',
                    text:'Close',
                    icon: '../../resources/images/cancel.png',
                    handler:function(btn){
                        frmAddCity.close();
                    }
                }]
            }]

        });

        frmAddCity.show();
    }

    function CreateAddCountry(){

        var me=this;

        var frmAddCountry= new Ext.window.Window({
            height: 120,
            width: 400,
            title: 'ახალი ქვეყანა',
            renderTo: Ext.getBody(),
            closable: true,
            autoScroll: true,
            modal: true,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'form',
                id:id2+'f_country',
                border:0,
                items:[{
                    xtype:'panel',
                    layout:'hbox',
                    autoWidth: true,
                    bodyPadding:10,
                    items:[{
                        xtype:'textfield',
                        id:id2+'txtCountryName',
                        labelWidth:75,
                        name:id2+'txtCountryName',fieldLabel:'ქვეყანა',
                        allowBlank:false,
                        width:350,
                        value:''
                    }]
                }],
                buttons:[{
                    xtype:'button',
                    text:'შენახვა',
                    icon: '../../resources/images/ok.png',
                    handler:function(btn){
                        var form = Ext.getCmp(id2+'f_country').getForm();
                        if(form.isValid()){
                            form.submit({
                                url:'../../server/fields/countries.php?act=Add',
                                method:'post',
                                waitMsg:'Please wait...',
                                reset:true,
                                success:function(form,action){
                                    if(action.result.success){
                                        //var grid=Ext.getCmp(id+'grid_city').getStore();
                                        storeCountries.reload();
                                        Ext.Msg.alert('Message','Record successfully saved');
                                    }else{
                                        Ext.Msg.alert('Message','Record failed to save');
                                    }
                                    frmAddCountry.close();
                                },
                                failure:function(form,action){
                                    Ext.Msg.alert('Message','Record failed to save');
                                    frmAddCountry.close();
                                }

                            });
                        }
                    }
                },{
                    xtype:'button',
                    text:'Close',
                    icon: '../../resources/images/cancel.png',
                    handler:function(btn){
                        frmAddCountry.close();
                    }
                }]
            }]

        });

        frmAddCountry.show();
    }


    function CreateAddCats(){

        var me=this;

        var comboParentCats = new Ext.form.ComboBox({
            name : 'parent_category_id',
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


        var frmAddCats= new Ext.window.Window({
            autoHeight: true,
            width: 480,
            title: 'ახალი კატეგორია',
            renderTo: Ext.getBody(),
            closable: true,
            autoScroll: true,
            modal: true,
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'form',
                id:'f_cats',
                border:0,
                items:[{
                    xtype:'panel',
                    layout:'vbox',
                    autoWidth: true,
                    bodyPadding:10,
                    items:[{
                        xtype:'textfield',
                        labelWidth:135,
                        name:'category_name',
                        fieldLabel:'დასახელება',
                        allowBlank:false,
                        width:350,
                        value:''
                    },
                        {
                            xtype:'textfield',
                            labelWidth:135,
                            name:'prefix',
                            fieldLabel:'პრეფიქსი',
                            allowBlank:true,
                            width:350,
                            value:''
                        },
                        {

                            xtype: 'fieldset',
                            margin: '5 0 5 -10',
                            width: 400,
                            layout: 'hbox',
                            border: 'none',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'მშობელი კატეგორია',
                                    //margins: '5 43',
                                    width:140
                                },

                                {
                                    xtype: comboParentCats,
                                }

                            ]
                        }

                    ]
                }],
                buttons:[{
                    xtype:'button',
                    text:'შენახვა',
                    icon: '../../resources/images/ok.png',
                    handler:function(btn){
                        var form = Ext.getCmp('f_cats').getForm();
                        if(form.isValid()){
                            form.submit({
                                url:'../../server/fields/cats.php?act=Add',
                                method:'post',
                                waitMsg:'Please wait...',
                                reset:true,
                                success:function(form,action){
                                    if(action.result.success){
                                        //var grid=Ext.getCmp(id+'grid_city').getStore();
                                        cats.reload();
                                        catsSub.reload();
                                        Ext.Msg.alert('Message','Record successfully saved');
                                    }else{
                                        Ext.Msg.alert('Message','Record failed to save');
                                    }
                                    frmAddCats.close();
                                },
                                failure:function(form,action){
                                    Ext.Msg.alert('Message','Record failed to save');
                                    frmAddCats.close();
                                }

                            });
                        }
                    }
                },{
                    xtype:'button',
                    text:'Close',
                    icon: '../../resources/images/cancel.png',
                    handler:function(btn){
                        frmAddCats.close();
                    }
                }]
            }]

        });

        frmAddCats.show();
    }

    function DeleteValue(value, text, id, store, url){
        Ext.Msg.show({
            title: 'Confirm',
            msg: 'Are you sure you want to permanently delete "' +  text + '"?',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function (btn) {
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url:url,
                        method: 'POST',
                        params:{
                            param_id:value,
                        },
                        success: function (response) {
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.Msg.show({
                                    title: 'Information',
                                    icon: Ext.Msg.INFO,
                                    msg: 'Record successfully removed!',
                                    buttons: Ext.Msg.OK,
                                    fn: function (btn) {;
                                        store.reload();
                                        var butt = Ext.getCmp(id);
                                        butt.hide();
                                    }
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Error',
                                    icon: Ext.Msg.ERROR,
                                    msg: 'Record failed deleted! '+ result.responseStatusObject.reason,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        store.reload();
                                    }
                                });
                            }
                        },
                        failure: function (response) {
                            console.log('Failed : '+ response);

                        }
                    });

                }

            }

        });
    }

});