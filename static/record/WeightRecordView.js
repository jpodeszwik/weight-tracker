function showSuccess(message) {
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: 'Success',
        message: ''
    });
}

function showError(message) {
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DANGER,
        title: 'Error',
        message: message
    });
}

var modelSaveOptions = {
    dataType: 'text',
    success: function (model, response) {
        showSuccess(JSON.stringify(response))
    },
    error: function (model, response) {
        showError(JSON.stringify(response))
    }
}

var WeightRecordView = Marionette.ItemView.extend({
    tagName: 'tr',

    ui: {
        updateButton: '.update-record',
        deleteButton: '.delete-record',
        weightInput: '.weight-input'
    },

    events: {
        'click @ui.updateButton': 'updateRecord',
        'click @ui.deleteButton': 'deleteRecord'
    },

    updateRecord: function () {
        this.model.set('value', this.ui.weightInput.val());
        this.model.save(null, modelSaveOptions);
    },

    deleteRecord: function () {
        this.model.destroy(modelSaveOptions);
    },

    template: function (model) {
        return _.template('<td><%= date %></td><td><input type="text" class="form-control weight-input" value=<%= weight %>></input></td><td><button type="button" class="btn btn-success update-record"><span class="glyphicon glyphicon-save"></span>Update record</button></td><td><button type="button" class="btn btn-danger delete-record"><span class="glyphicon glyphicon-remove"></span>Remove record</button></td>')({
            date: model.date,
            weight: model.value
        });
    }
});

var EmptyWeightRecordView = Marionette.ItemView.extend({
    tagName: 'tr',

    ui: {
        addButton: '.add-record',
        weightInput: '.weight-input',
        dateInput: '.date-input'
    },

    events: {
        'click @ui.addButton': 'addRecord'
    },

    addRecord: function () {
        this.model.set('value', this.ui.weightInput.val());
        this.model.set('date', this.ui.dateInput.val());
        this.model.save(null, modelSaveOptions);
    },

    template: function (model) {
        return _.template('<td><input type="text" class="form-control date-input"/></td><td><input type="text" class="form-control weight-input"/></td><td><button type="button" class="btn btn-success add-record"><span class="glyphicon glyphicon-plus"></span>Add record</button></td>')({
            date: model.date,
            weight: model.value
        });
    },

    onRender: function () {
        this.ui.dateInput.datetimepicker({
            format: 'YYYY-MM-DD',
            defaultDate: moment()
        });
    }
});

var WeightRecordListView = Marionette.CollectionView.extend({
    tagName: 'tbody',
    getChildView: function (item) {
        if (item.get('date') === undefined) {
            return EmptyWeightRecordView;
        }
        else {
            return WeightRecordView;
        }
    }
});
