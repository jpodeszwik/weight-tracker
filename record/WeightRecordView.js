var WeightRecordView = Marionette.ItemView.extend({
    tagName: 'tr',

    template: function (model) {
        return _.template('<td><%= date %></td><td><%= weight %></td>')({
            date: model.date,
            weight: model.weight
        });
    }
});
