<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Search Result</title>

    <link type="text/css" rel="stylesheet" href="http://extjs.cachefly.net/ext-3.2.0/resources/css/ext-all.css"/>
    <!--    <link type="text/css" rel="stylesheet" href="../../ext/resources/ext-theme-classic/ext-theme-classic-all.css"/> -->
    <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.2.0/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.2.0/ext-all-debug.js"></script>
    <script type="text/javascript" src="../../ext/ux/Printer.js"></script>
    <script type="text/javascript" src="../../ext/ux/renderers/Base.js"></script>
    <script type="text/javascript" src="../../ext/ux/renderers/GridPanel.js"></script>


    <style type="text/css">
        .x-filter-condition td {
            padding: 4px;
        }

        .add-button {
            background: url(../../resources/images/add.png)!important;
        }

        .delete-button {
            background: url(../../resources/images/delete.png)!important;
        }

        .condition-row-disabled {
            background: url(../../resources/images/cancel.png)!important;
        }

        .condition-row-enabled {
            background: url(../../resources/images/ok.png)!important;
        }
        .icon-print{
            background: url(../../resources/images/print.png) no-repeat!important;
        }


    </style>


    <script type="text/javascript">
        Ext.BLANK_IMAGE_URL = 'http://extjs.cachefly.net/ext-3.2.0/resources/images/default/s.gif';
        Ext.override(Ext.Element, {
            getDistanceTo: function(x, y) {
                var b = this.getBox();
                if (y > b.bottom) {
                    y = b.y - (y - b.bottom);
                }
                if (x > b.right) {
                    x = b.x - (x - b.right);
                }
                if (x > b.x) {
                    return b.y - y;
                }
                if (y > b.y) {
                    return b.x - x;
                }
                return Math.round(Math.sqrt(Math.pow(b.y - y, 2) + Math.pow(b.x - x, 2)));
            }
        });

        /**
         * @class Ext.ux.ProximityFader
         * Manages visibility of a Component based on the proximity of the mouse to a configured trigger Element:<pre><code>
         new Ext.ux.ProximityFader({
    threshold: 100,                    // When within 100 pixels of
    trigger: proximityTriggerEl,    // this Element,
    component: myFloatingPanel        // Begin fading in this Component.
});
         */
        Ext.ux.ProximityFader = Ext.extend(Object, {
            constructor: function(config) {
                Ext.apply(this, config);
                if (this.component) {
                    this.init(this.component);
                }
            },

            init: function(component) {
                this.component = component;
                if (component.rendered) {
                    this.onComponentRender(component);
                } else {
                    component.on({
                        render: this.onComponentRender,
                        single: true,
                        scope: this,
                        delay: 1
                    });
                }
                component.on({
                    beforemove: this.onBeforeComponentMove,
                    move: this.onComponentMove,
                    scope: this
                });

//      If we have not been configured with a trigger
                if (!this.trigger) {
                    component.on({
                        show: this.onShow,
                        hide: this.onHide,
                        scope: this
                    });
                }
            },

            onBeforeComponentMove: function() {
                if (this.locked) {
                    this.ignoreMove = true;
                } else {
                    this.lock();
                }
            },

            onComponentMove: function() {
                if (this.ignoreMove) {
                    delete this.ignoreMove;
                } else {
                    this.unlock();
                }
            },

            lock: function() {
                this.locked = true;
                this.component.show();
                this.el.setOpacity(1);
            },

            unlock: function() {
                this.locked = false;
            },

            onMouseMove: function(e) {

                if (this.locked) return;

                var o = 1, d = this.el.getDistanceTo.apply(this.trigger, e.getXY());
                if (d > this.threshold) {
                    this.component.hide();
                } else if (d > 0) {

//          Mouse is within range of the trigger, so show the Component if its not already visible
                    if (this.trigger && !this.component.isVisible()) {
                        this.component.show();
                    }
                    var o = 1 - (d / this.threshold);
                }
                this.el.setOpacity(o);
                if (this.shadow) {
                    this.shadow.setOpacity(o);
                }
            },

            onComponentRender: function(c) {
                if (!this.trigger) {
                    this.trigger = c.el;
                }
                this.el = c.el;
                if (this.el.shadow) {
                    this.shadow = this.el.shadow.el;
                }
            },

            onShow: function() {
                if (this.locked) return;
                Ext.getDoc().on('mousemove', this.onMouseMove, this);
            },

            onHide: function() {
                if (this.locked) return;
                Ext.getDoc().un('mousemove', this.onMouseMove, this);
            }
        });

        Ext.override(String, {
            startsWith: function(prefix) {
                return this.substr(0, prefix.length) == prefix;
            },

            endsWith: function(suffix) {
                var start = this.length - suffix.length;
                return (start > -1) && (this.substr(start) == suffix);
            }
        });

        Ext.override(Ext.Window.DD, {
            startDrag : Ext.Window.DD.prototype.startDrag.createInterceptor(function(){
                this.win.fireEvent("beforemove", this.win);
            })
        });

        Ext.ux.FilterCondition = Ext.extend(Ext.Container, {
            layout: {
                type: 'hbox'
            },
            defaults: {
                margins: '0 2 4 2'
            },

            cls: 'x-filter-condition',

            Field: Ext.data.Record.create(['name', 'type']),

            filterTestStore: function(testRec) {

                var types = Ext.data.Types,
                        f = this.fieldCombo,
                        idx = f.store.find(f.valueField, f.getValue());

//      A Field is selected, so we can filter the test types available
                if (idx != -1) {
                    var fieldType = f.store.getAt(idx).data.type,
                            inc = testRec.data.include,
                            exc = testRec.data.exclude;

                    if (fieldType == types.AUTO) {
                        return true;
                    }

//          Explicitly including data types mean *ONLY* include those types
                    if (inc) {
                        return inc.hasOwnProperty(fieldType.type);
                    }

//          If a type is excluded, return false
                    if (exc && exc.hasOwnProperty(fieldType.type)) {
                        return false;
                    }

//          Default to including a test.
                    return true;
                }
            },

            initComponent: function() {
                var tests = [
                    [ '<', null, {boolean: true} ],
                    [ '<=', null, {boolean: true} ],
                    [ '=', null, null ],
                    [ '!=', null, null ],
                    [ '>=', null, {boolean: true} ],
                    [ '>', null, {boolean: true} ],
                    [ 'Starts with', {string: true}, null ],
                    [ 'Ends with', {string: true}, null ],
                    [ 'Contains', {string: true}, null ],
                    [ 'Between', null, null ]
                ];
                this.testStore = new Ext.data.ArrayStore({
                    idIndex: 0,
                    fields: ['test', 'include', 'exclude'],
                    data: tests,
                    autoDestroy: true,
                    filterFn: this.filterTestStore,
                    filterScope: this
                });

//      Bit flag to indicate when all fields have actualy been set to something so that autoApply filters
//      Don't get applied before the user has actually set them up.
                this.fieldsChanged = 0;

                this.fields = this.store.reader.recordType.prototype.fields;
                this.fieldStore = new Ext.data.Store();

//      Create a Store containing the field names and types
//      in the passed Store.
                this.fields.each(function(f) {
                    this.fieldStore.add(new this.Field(f))
                }, this);

//      Create a Combo which allows selection of a field
                this.fieldCombo = new Ext.form.ComboBox({
                    triggerAction: 'all',
                    store: this.fieldStore,
                    valueField: 'name',
                    displayField: 'comboname',
                    editable: false,
                    forceSelection: true,
                    mode: 'local',
                    listeners: {
                        select: this.onFieldSelect,
                        scope: this
                    }
                });

//      Create a Combo which allows selection of a test
                this.testCombo = new Ext.form.ComboBox({
                    width: 100,
                    editable: false,
                    forceSelection: true,
                    valueField: 'test',
                    displayField: 'test',
                    mode: 'local',
                    store: this.testStore,
                    doQuery: Ext.form.ComboBox.prototype.onLoad,
                    listeners: {
                        select: this.onTestSelect,
                        scope: this
                    }
                });

//      Inputs for each type of field. Hidden and shown as necessary
                this.booleanInput = new Ext.form.Checkbox({
                    hidden: true,
                    testFilter: function(rec) {
                        var t = rec.text;
                        return (t == '=') || (t == '!=');
                    },
                    listeners: {
                        check: this.onTestValueChange,
                        scope: this
                    }
                });
                this.intInput = new Ext.form.NumberField({
                    allowDecimals: false,
                    hidden: true,
                    listeners: {
                        valid: this.onTestValueChange,
                        scope: this
                    }
                });
                this.floatInput = new Ext.form.NumberField({
                    hidden: true,
                    listeners: {
                        valid: this.onTestValueChange,
                        scope: this
                    }
                });
                this.textInput = new Ext.form.TextField({
                    hidden: true,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: {
                            fn: this.onTestValueChange,
                            buffer: 50
                        },
                        change: this.onTestValueChange,
                        scope: this
                    }
                });
                this.dateInput = new Ext.form.DateField({
                    hidden: true,
                    //***AVA*** do not convert
                    /*
                    convertValue: function(d) {
                        return d.valueOf();
                    },
                    */
                    listeners: {
                        select: this.onTestValueChange,
                        valid: this.onTestValueChange,
                        scope: this
                    }
                });

                this.cls = 'x-filter-condition';
                this.items = [{
                    xtype: 'button',
                    margins: '0 2 0 0',
                    iconCls: 'delete-button',
                    handler: this.removeSelf,
                    scope: this,
                    tooltip: 'Remove this condition'
                }, {
                    xtype: 'button',
                    handler: this.toggleEnabled,
                    scope: this,
                    iconCls: 'condition-row-enabled',
                    tooltip: 'Enable/disable this condition'
                }, this.fieldCombo, this.testCombo, this.booleanInput, this.intInput, this.floatInput, this.textInput, this.dateInput];
                Ext.ux.FilterCondition.superclass.initComponent.apply(this, arguments);
            },

            removeSelf: function() {
                var o = this.ownerCt;
                o.remove(this, true);
                o.doLayout();
            },

            toggleEnabled: function(b) {
                b = Ext.get(b.el.query(b.buttonSelector));
                if (this.disabled) {
                    b.removeClass('condition-row-disabled');
                    b.addClass('condition-row-enabled');
                    this.enable();
                } else {
                    b.removeClass('condition-row-enabled');
                    b.addClass('condition-row-disabled');
                    this.disable();
                }
            },

            focus: function() {
                this.fieldCombo.focus();
            },

            onDisable: function() {
                for (var i = 0, it = this.items.items, l = it.length; i < l; i++) {
                    if (!(it[i] instanceof Ext.Button)) {
                        it[i].disable();
                    }
                }
                this.disabled = true;
                this.fireChangeEvent();
            },

            onEnable: function() {
                for (var i = 0, it = this.items.items, l = it.length; i < l; i++) {
                    it[i].enable();
                }
                this.disabled = false;
                this.fireChangeEvent();
            },

            onFieldSelect: function(combo, rec, index) {
//      Refresh the tests dropdown
                this.testStore.filterBy(this.filterTestStore, this);
                this.testStore.fireEvent('datachanged', this.fieldStore);

                var types = Ext.data.Types;
                this.booleanInput.hide();
                this.intInput.hide();
                this.floatInput.hide();
                this.textInput.hide();
                this.dateInput.hide();
                var t = rec.get('type');
                if (t == types.BOOLEAN) {
                    this.booleanInput.show();
                    this.valueInput = this.booleanInput;
                } else if (t == types.INT) {
                    this.intInput.show();
                    this.valueInput = this.intInput;
                } else if (t == types.FLOAT) {
                    this.floatInput.show();
                    this.valueInput = this.floatInput;
                } else if (t == types.DATE) {
                    this.dateInput.show();
                    this.valueInput = this.dateInput;
                } else {
                    this.textInput.show();
                    this.valueInput = this.textInput;
                }
                this.doLayout();
                this.fieldsChanged |= 1;
                this.fireChangeEvent();
            },

            onTestSelect: function(combo, rec, index) {
                this.fieldsChanged |= 2;
                this.fireChangeEvent();
                if (rec.get("test") == "Between") {
                    if (this.valueInput) {
                        this.secondValueInput = this.valueInput.cloneConfig();
                        this.add(this.secondValueInput);
                        this.secondValueInput.show();
                        this.doLayout();
                    }
                } else {
                    if (this.secondValueInput) {
                        this.remove(this.secondValueInput);
                        this.doLayout();
                        delete this.secondValueInput;
                    }
                }
            },

            onTestValueChange: function() {
                this.fieldsChanged |= 4;
                this.fireChangeEvent();
            },

//  Only fire the change event if it's an actually applied filter.
//  During first run through, the change event should not fire.
            fireChangeEvent: function() {
                if (this.fieldsChanged == 7) {
                    this.fireEvent("change", this);
                }
            },

            getValue: function() {
                return {
                    field: this.fieldCombo.getValue(),
                    test: this.testCombo.getValue(),
                    value: this.valueInput.getValue()
                };
            },

            getXml: function() {
                if (!this.testCombo || !this.testCombo.getValue() || !this.valueInput) {
                    return '';
                }
                return '<condition test="' + this.testCombo.getValue() + '">\n' +
                        '  <field>' + this.fieldCombo.getValue() + '</field>\n' +
                        '  <value>' + this.valueInput.getRawValue() + '</value>\n' +
                        '</condition>';
            },

            getFilterFunction: function() {
                if (!this.filterFunction) {
                    this.filterFunction = this.filterFunctionImpl.createDelegate(this);
                }
                return this.filterFunction;
            },

            filterFunctionImpl: function(rec) {
                var fieldValue = rec.get(this.fieldCombo.getValue()),
                        v = this.valueInput.getValue(),
                        v1 = this.secondValueInput ? this.secondValueInput.getValue() : null;

//      If the field knows how to preprocess...
                if (this.valueInput.convertValue) {
                    fieldValue = this.valueInput.convertValue(fieldValue);
                    v = this.valueInput.convertValue(v);
                    v1 = this.valueInput.convertValue(v1);
                }

                switch (this.testCombo.getValue()) {
                    case '<':
                        return fieldValue < v;

                    case '<=':
                        return fieldValue <= v;

                    case '=':
                        return fieldValue == v;

                    case '!=':
                        return fieldValue != v;

                    case '>=':
                        return fieldValue >= v;

                    case '>':
                        return fieldValue > v;

                    case 'Starts with':
                        return (Ext.isString(fieldValue) && fieldValue.startsWith(v));

                    case 'Ends with':
                        return (Ext.isString(fieldValue) && fieldValue.endsWith(v));

                    case 'Contains':
                        return (Ext.isString(fieldValue) && (fieldValue.indexOf(v) !== -1));

                    case 'Between':
                        return (fieldValue >= v) && (fieldValue <= v1);

                }
            },

            isEmpty: function() {
                return ((this.fieldCombo.getValue.length == 0) && (this.testCombo.getValue().length == 0)) || !this.valueInput;
            }
        });

        Ext.ux.StoreFilter = Ext.extend(Ext.Panel, {
            constructor: function(config) {
                config = Ext.apply({}, {
                    layout: 'anchor',
                    bodyStyle: {
                        padding: '10px 0px 10px 10px',
                        overflow: 'auto'
                    },
                    defaults: {
                        xtype: 'container',
                        autoEl: {}
                    },
                    items: [{
                        cls: 'x-condition-header',
                        anchor: '-25',
                        layout: 'column',
                        style: {
                            'text-decoration': 'underline',
                            'font': 'bold small verdana',
                            'margin-bottom': '5px'
                        },
                        defaults: {
                            xtype: 'box',
                            style: {
                                'padding-left': '5px'
                            }
                        },
                        items: [{
                            style: {
                                'padding-left': '65px'
                            },
                            width: 235,
                            autoEl: {html: 'ველი'}
                        }, {
                            width: 95,
                            autoEl: {html: 'ტიპი'}
                        }, {
                            autoEl: {html: 'მონაცემები'}
                        }]
                    }, this.addConditionButton = new Ext.Button({
                        iconCls: 'add-button',
                        handler: this.onAddConditionButtonClick,
                        scope: this,
                        tooltip: 'Add condition'
                    })],
                    bbar: new Ext.Toolbar([
                        this.filterButton = new Ext.Button({
                            text: "Filter",
                            tooltip: 'Filter grid',
                            handler: this.doFilter,
                            scope: this
                        }),
                        this.clearFilterButton = new Ext.Button({
                            text: "Clear Filter",
                            tooltip: 'Clear filters',
                            handler: this.clearFilter,
                            scope: this
                        })
                    ])
                }, config);
                Ext.ux.StoreFilter.superclass.constructor.call(this, config);
            },

            onAddConditionButtonClick: function() {
                var c, j = this.items.getCount();
                if (j > 2) {
                    c = this.items.items[j - 2];
                    if (c.isEmpty()) {
                        return;
                    }
                }
                c = new Ext.ux.FilterCondition({store: this.store});
                if (this.autoApply) {
                    c.on({
                        change: this.doFilter,
                        destroy: this.doFilter,
                        scope: this
                    })
                }
                this.insert(this.items.getCount() - 1, c);
                this.doLayout();
                this.addConditionButton.getEl().scrollIntoView(this.body);
                c.focus();
            },

            doFilter: function() {
                this.store.filterBy(this.getFilterFunction());
            },

            clearFilter: function() {
                this.store.clearFilter();
            },

            getFilterFunction: function() {
                if (!this.filterFunction) {
                    this.filterFunction = this.filterFunctionImpl.createDelegate(this);
                }
                return this.filterFunction;
            },

            filterFunctionImpl: function(rec) {
                for (var i = 0, it = this.items.items, l = it.length; i < l; i++) {
                    var c = it[i];
                    if ((c instanceof Ext.ux.FilterCondition) && (!c.isEmpty()) && (!c.disabled)) {
                        var fn = c.getFilterFunction();
                        if (!fn(rec)) {
                            return false;
                        }
                    }
                }
                return true;
            }
        });


/*
        Ext.require([
            'Ext.ux.grid.Printer',
            'Ext.ux.RowExpander'
        ]);
*/


        Ext.onReady(function(){

            Ext.QuickTips.init();


            // create the data store
            var store = new Ext.data.ArrayStore({
                fields: [
                    {name: 'patient_id'},
                    {name: 'patientlastname', comboname: 'გვარი (პაციენტის)'},
                    {name: 'patientname', comboname: 'სახელი (პაციენტის)'},
                    {name: 'birthday',  comboname: 'დაბადების თარიღი', type: 'date', dateFormat: 'd.m.Y'},
                    {name: 'patronymic', comboname: 'მამის სახელი'},
                    {name: 'country_name', comboname: 'ქვეყანა'},
                    {name: 'ccountry_name', comboname: 'ქვეყანა (კლინიკა)'},
                    {name: 'city_name', comboname: 'ქალაქი'},
                    {name: 'personalid', comboname: 'პირადობის ნომერი'},
                    {name: 'history_id', comboname: 'ისტორიის ნომერი'},
                    //{name: 'gender', comboname: 'სქესი'},
                    {name: 'phone1', comboname: 'სახლის ტელეფონი'},
                    {name: 'phone2', comboname: 'მობილური'},
                    {name: 'email', comboname: 'ელ-ფოსტა'},
                    {name: 'address1', comboname: 'მისამართი'},
                    {name: 'work_phone', comboname: 'სამსახურის ტელეფონი'},
                    {name: 'work', comboname: 'სამუშაო ადგილი'},
                    {name: 'transdate', comboname: 'გადანერგვის თარიღი',type: 'date', dateFormat: 'd.m.Y'},
                    {name: 'clinic', comboname: 'კლინიკა'},
                    {name: 'donor', comboname: 'დონორი'},
                    {name: 'donor_info', comboname: 'ინფ. დონორზე'},
                    {name: 'docname', comboname: 'სახელი (მკურნალი ექიმი)'},
                    {name: 'doclastname', comboname: 'გვარი (მკურნალი ექიმი)'},
                    {name: 'opname', comboname: 'სახელი (ოპერატორი)'},
                    {name: 'oplastname', comboname: 'გვარი (ოპერატორი)'},
                    {name: 'condition', comboname: 'პაციენტის მდგომარეობა'},
                    {name: 'dialysis', comboname: 'დიალიზი'},
                    {name: 'dialysis_date', comboname: 'დიალიზი თარიღი', type: 'date', dateFormat: 'd.m.Y'},
                    {name: 'diagnosis', comboname: 'დიაგნოზი'},
                    {name: 'medicine', comboname: 'მედიკამენტები'},
                    {name: 'dosage', comboname: 'დოზა'},
                    {name: 'info', comboname: 'ინფორმაცია'},
                    {name: 'category', comboname: 'სტატუსი'},
                    {name: 'regdate', comboname: 'აღრიცხვაზე აყვანის თარიღი'},
                    {name: 'removaldate', comboname: 'აღრიცხვიდან მოხსნის თარიღი'},
                    {name: 'removal', comboname: 'არღიცხვიდან მოხსნის მიზეზი'},

                ],
                comparator: function(r1, r2){
                    var v1 = r1.data[this.sortInfo.field], v2 = r2.data[this.sortInfo.field];
                    return -(v1 > v2 ? 1 : (v1 < v2 ? -1 : 0));
                },
                //sortInfo: { field: "patientlastname", direction: "ASC" },
            });

            //store.loadData(myData);

                Ext.Ajax.request({
                    url: '../../server/list/searchpatients.php?act=View&catvalues=<?php echo $_GET['catvalues'];?>&donvalues=<?php echo $_GET['donvalues'];?>&archvalues=<?php echo $_GET['archvalues'];?>&cpatient=<?php echo $_GET['cpatient'];?>&ccountry=<?php echo $_GET['ccountry'];?>&cCcountry=<?php echo $_GET['cCcountry'];?>&ccity=<?php echo $_GET['ccity'];?>&cclinic=<?php echo $_GET['cclinic'];?>&cdoctor=<?php echo $_GET['cdoctor'];?>&cdiagnosis=<?php echo $_GET['cdiagnosis'];?>&cdonor=<?php echo $_GET['cdonor'];?>&chistoryid=<?php echo $_GET['chistoryid'];?>&ccondition=<?php echo $_GET['ccondition'];?>&cdialysis=<?php echo $_GET['cdialysis'];?>&cmeds=<?php echo $_GET['cmeds'];?>&cmedC=<?php echo $_GET['cmedC'];?>&cdate1=<?php echo $_GET['cdate1'];?>&cdate2=<?php echo $_GET['cdate2'];?>&sw=<?php echo urlencode($_GET['sw']);?>',
                    params: {
                        start: 0,
                        limit: 20000
                    },
                    callback : function(options, success, response){
                        //alert(response.responseText);
                        //myData['company']
                        var jsonData  = Ext.decode(response.responseText);
                        for (var key in jsonData['items']) {


                            var birth = '';
                            if(jsonData['items'][key].birthday!=null) {
                                var birthArr = jsonData['items'][key].birthday.split(".");

                                if (parseInt(birthArr[0]) > 0) {
                                    var d = birthArr[0];
                                    var m = parseInt(birthArr[1] - 1);
                                    var Y = birthArr[2];
                                    birth = new Date(Y, m, d);
                                }
                            }

                            var trans = '';
                            if(jsonData['items'][key].transdate!=null) {
                                var transArr = jsonData['items'][key].transdate.split(".");

                                if (parseInt(transArr[0]) > 0) {
                                    var d = transArr[0];
                                    var m = parseInt(transArr[1] - 1);
                                    var Y = transArr[2];
                                    trans = new Date(Y, m, d);
                                }
                            }

                            var dial = '';
                            if(jsonData['items'][key].dialysis_date!=null) {
                                var dialArr = jsonData['items'][key].dialysis_date.split(".");

                                if (parseInt(dialArr[0]) > 0) {
                                    var d = dialArr[0];
                                    var m = parseInt(dialArr[1] - 1);
                                    var Y = dialArr[2];
                                    dial = new Date(Y, m, d);
                                }
                            }

                            var rem = '';
                            if(jsonData['items'][key].removaldate!=null) {
                                var remArr = jsonData['items'][key].removaldate.split(".");

                                if (parseInt(remArr[0]) > 0) {
                                    var d = remArr[0];
                                    var m = parseInt(remArr[1] - 1);
                                    var Y = remArr[2];
                                    rem = new Date(Y, m, d);
                                }
                            }

                            var reg = '';
                            if(jsonData['items'][key].regdate!=null) {
                                var regArr = jsonData['items'][key].regdate.split(".");

                                if (parseInt(regArr[0]) > 0) {
                                    var d = regArr[0];
                                    var m = parseInt(regArr[1] - 1);
                                    var Y = regArr[2];
                                    reg = new Date(Y, m, d);
                                }
                            }

                            store.add(new store.recordType(
                              {
                                  patient_id: jsonData['items'][key].patient_id,
                                  reg_id: jsonData['items'][key].reg_id,
                                  patientname: jsonData['items'][key].patientname,
                                  patientlastname: jsonData['items'][key].patientlastname,
                                  birthday:birth,
                                  patronymic: jsonData['items'][key].patronymic,
                                  country_id: jsonData['items'][key].country_id,
                                  country_name: jsonData['items'][key].country_name,
                                  ccountry_id: jsonData['items'][key].ccountry_id,
                                  ccountry_name: jsonData['items'][key].ccountry_name,
                                  city_id: jsonData['items'][key].city_id,
                                  city_name: jsonData['items'][key].city_name,
                                  personalid: jsonData['items'][key].personalid,
                                  history_id: jsonData['items'][key].history_id,
                                  gendercode: jsonData['items'][key].gendercode,
                                  gender: jsonData['items'][key].gender,
                                  phone1: jsonData['items'][key].phone1,
                                  phone2: jsonData['items'][key].phone2,
                                  email: jsonData['items'][key].email,
                                  address1: jsonData['items'][key].address1,
                                  work_phone: jsonData['items'][key].work_phone,
                                  work: jsonData['items'][key].work,
                                  transdate: trans,
                                  clinic_id: jsonData['items'][key].clinic_id,
                                  clinic: jsonData['items'][key].clinic,
                                  donor_type_id: jsonData['items'][key].donor_type_id,
                                  donor: jsonData['items'][key].donor,
                                  donor_info: jsonData['items'][key].donor_info,
                                  doctor_id: jsonData['items'][key].doctor_id,
                                  docname: jsonData['items'][key].docname,
                                  doclastname: jsonData['items'][key].doclastname,
                                  operator_id: jsonData['items'][key].operator_id,
                                  opname: jsonData['items'][key].opname,
                                  oplastname: jsonData['items'][key].oplastname,
                                  con_date: jsonData['items'][key].con_date,
                                  condition: jsonData['items'][key].condition,
                                  dialysis_date: dial,
                                  dialysis: jsonData['items'][key].dialysis,
                                  blood_type_id: jsonData['items'][key].blood_type_id,
                                  rhesus: jsonData['items'][key].rhesus,
                                  diagnosis_id: jsonData['items'][key].diagnosis_id,
                                  diagnosis: jsonData['items'][key].diagnosis,
                                  //medicine_id: jsonData['items'][key].medicine_id,
                                  medicine: jsonData['items'][key].medicine,
                                  dosage: jsonData['items'][key].dosage,
                                  info: jsonData['items'][key].info,
                                  category_id: jsonData['items'][key].category_id,
                                  category: jsonData['items'][key].category,
                                  regdate: reg,
                                  removaldate: rem,
                                  removal: jsonData['items'][key].removal,
                                  //pimage:  jsonData['items'][key].pimage
                                   }));

                        }

                    }
                });




            // example of custom renderer function
            function change(val){
                if(val > 0){
                    return '<span style="color:green;">' + val + '</span>';
                }else if(val < 0){
                    return '<span style="color:red;">' + val + '</span>';
                }
                return val;
            }

            // example of custom renderer function
            function pctChange(val){
                if(val > 0){
                    return '<span style="color:green;">' + val + '%</span>';
                }else if(val < 0){
                    return '<span style="color:red;">' + val + '%</span>';
                }
                return val;
            }





            /*
            var store=Ext.create('Ext.mod.store.Liv',{
                model: 'Ext.mod.model.Liv',
                //buffered: true,
                //trailingBufferZone: 20,
                //leadingBufferZone: 50,
                //purgePageCount: 0,
                //scrollToLoadBuffer: 0,

            });
            */



            var filter = new Ext.ux.StoreFilter({
                store: store,
                autoApply: true,
                border: false
            });
            var filterPanel = new Ext.Window({
                title: "ფილტრები",
                closable: true,
                closeAction: 'hide',
                constrain: true,
                shadow: false,
                layout: 'fit',
                items: filter,
                width: 630,
                height: 200,
                renderTo: document.body,
                tools: [{
                    id: 'unpin',
                    handler: function(e, tool, panel, tc) {
                        if (tool.hasClass('x-tool-pin')) {
                            tool.addClass('x-tool-unpin');
                            tool.removeClass('x-tool-pin');
                            panel.plugins.unlock();
                        } else {
                            tool.addClass('x-tool-pin');
                            tool.removeClass('x-tool-unpin');
                            panel.plugins.lock();
                        }
                    }
                }],
                plugins: new Ext.ux.ProximityFader({
                    threshold: 100
                }),
                hidden: true
            });
            filterPanel.tools.close.hide();



            // create the Grid
            grid = new Ext.grid.GridPanel({
                id: 'static-grid',
                store: store,
                columns: [
                    new Ext.grid.RowNumberer({width: 30}),
                    {id:'patient_id',header: "id", width: 5, sortable: true, dataIndex: 'patient_id', hidden: true},
                    {header: "გვარი", width: 100, sortable: true,  dataIndex: 'patientlastname'},
                    {header: "სახელი", width: 100, sortable: true, dataIndex: 'patientname'},
                    {header: "დაბ. თარიღი", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('d.m.Y'), dataIndex: 'birthday'},
                    {header: "მამის სახელი", width: 100, sortable: true,  dataIndex: 'patronymic',hidden: true},
                    {header: "ქვეყანა", width: 100, sortable: true,  dataIndex: 'country_name',hidden: true},
                    {header: "ქვეყანა (კლინიკა)", width: 100, sortable: true,  dataIndex: 'ccountry_name',hidden: false},
                    {header: "ქალაქი", width: 100, sortable: true,  dataIndex: 'city_name',hidden: true},
                    {header: "პირ. ნომერი", width: 100, sortable: true,  dataIndex: 'personalid',hidden: true},
                    {header: "ისტორიის ნომერი", width: 120, sortable: true,  dataIndex: 'history_id',hidden: false},
                    {header: "სქესი", width: 120, sortable: true,  dataIndex: 'gender',hidden: true},
                    {header: "სახლის ტელ.", width: 120, sortable: true,  dataIndex: 'phone1',hidden: true},
                    {header: "მობილური", width: 120, sortable: true,  dataIndex: 'phone2',hidden: true},
                    {header: "ელ-ფოსტა", width: 100, sortable: true,  dataIndex: 'email',hidden: true},
                    {header: "მისამართი", width: 120, sortable: true,  dataIndex: 'address1',hidden: true},
                    {header: "სამსახურის ტელ.", width: 120, sortable: true,  dataIndex: 'work_phone',hidden: true},
                    {header: "სამუშაო ადგილი", width: 120, sortable: true,  dataIndex: 'work',hidden: true},
                    {header: "გადან. თარიღი", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('d.m.Y'), dataIndex: 'transdate'},
                    {header: "კლინიკა", width: 140, sortable: true,  dataIndex: 'clinic',hidden: false},
                    {header: "დონორი", width: 80, sortable: true,  dataIndex: 'donor',hidden: false},
                    {header: "ინფ. დონორზე", width: 80, sortable: true,  dataIndex: 'donor_info',hidden: true},
                    {header: "სახელი (ექიმი)", width: 100, sortable: true, dataIndex: 'docname',hidden: true},
                    {header: "გვარი (ექიმი)", width: 100, sortable: true,  dataIndex: 'doclastname',hidden: true},
                    {header: "სახელი (ოპერატორი)", width: 100, sortable: true,  dataIndex: 'opname',hidden: true},
                    {header: "გვარი (ოპერატორი)", width: 100, sortable: true,  dataIndex: 'oplastname',hidden: true},
                    {header: "დიაგნოზი", width: 130, sortable: true,  dataIndex: 'diagnosis',hidden: true},
                    {header: "მედიკამენტები", width: 130, sortable: true,  dataIndex: 'medicine',hidden: false},
                    {header: "დოზა", width: 80, sortable: true,  dataIndex: 'dosage',hidden: false},
                    {header: "მდგომარეობა", width: 130, sortable: true,  dataIndex: 'condition',hidden: false},
                    {header: "დიალიზი", width: 130, sortable: true,  dataIndex: 'dialysis',hidden: true},
                    {header: "დიალ. თარიღი", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('d.m.Y'), dataIndex: 'dialysis_date', hidden:true},
                    {header: "ინფორმაცია", width: 130, sortable: true,  dataIndex: 'info',hidden: true},
                    {header: "სტატუსი", width: 130, sortable: true,  dataIndex: 'category',hidden: false},
                    {header: "არღ. აყვ. თარიღი", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('d.m.Y'), dataIndex: 'regdate', hidden:true},
                    {header: "არღ. მოხს. თარიღი", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('d.m.Y'), dataIndex: 'removaldate', hidden:true},
                    {header: "არღ. მოხს. მიზეზი", width: 130, sortable: true,  dataIndex: 'removal',hidden: true},

                ],
                viewConfig: {
                    emptyText: 'No matching data'
                },

                stripeRows: true,
                autoExpandColumn: 'patient_id',
                //title:'Array Grid',
                region: 'center',
                margins: '0 5 5 5',
                tbar: [{
                    text: '<b><div style="color:red">Filters...</div></b>',
                    handler: function(b, e) {
                        filterPanel.alignTo(grid.el, 't-t');
                        filterPanel.show();
                        filterPanel.el.slideIn('t');
                        filterPanel.tools.unpin.hide();
                        filterPanel.tools.close.show();
                        filterPanel.plugins.lock();
                    }
                }
                ,'->',
                    {
                        text   : 'Print',
                        iconCls: 'icon-print',
                        handler: function() {
                            //Ext.ux.Printer.stylesheetPath = '../../ext/ux/print.css';
                            Ext.ux.Printer.print(grid);

                        }
                    }


                ],
                listeners: {

                    render: function(g) {
                        g.el.on({
                            contextmenu: function(e) {
                                e.stopEvent();
                                filterPanel.setPagePosition(e.getXY());
                                filterPanel.show();
                                Ext.Window.prototype.doConstrain.call(filterPanel);
                            }
                        });
                    },
                    single: true
                }
            });


            grid.on('rowdblclick', function(grid, rowIndex, e) {
                //var gr = Ext.getCmp('static-grid');

                var model = grid.getSelectionModel().getSelected();


                var selectedId = store.getAt(rowIndex).id;

                var str = Ext.encode(model.data);

                /*
                for (key in model.data) {

                    alert(model.data[key]);

                }
                */


                window.open ("fromSearch.php?data="+ str, "_blank", "location=1,status=no,scrollbars=yes,titlebar=no,menubar=no, width=1200,height=600");
            });

            new Ext.Viewport({
                layout:'fit',
                items: grid
            });
        });
    </script>
</head>
<body></body>
</html>