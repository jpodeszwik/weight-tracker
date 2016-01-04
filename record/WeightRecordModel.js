var WeightRecord = Backbone.Model.extend({
    defaults: {
        date: undefined,
        weight: undefined,
        user: undefined
    }
});

var WeightRecordList = Backbone.Collection.extend({
    model: WeightRecord
});
