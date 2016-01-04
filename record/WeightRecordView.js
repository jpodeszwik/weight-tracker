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

    updateRecord: function() {
        this.model.set('weight', this.ui.weightInput.val());
        this.model.save();
    },

    deleteRecord: function() {
        this.model.destroy();
    },

    template: function (model) {
        return _.template('<td><%= date %></td><td><input type="text" class="form-control weight-input" value=<%= weight %>></input></td><td><button type="button" class="btn btn-success update-record"><span class="glyphicon glyphicon-save"></span>Update record</button></td><td><button type="button" class="btn btn-danger delete-record"><span class="glyphicon glyphicon-remove"></span>Remove record</button></td>')({
            date: model.date,
            weight: model.weight
        });
    }
});

var WeightRecordListView = Marionette.CollectionView.extend({
    tagName: 'tbody',
    childView: WeightRecordView
});
