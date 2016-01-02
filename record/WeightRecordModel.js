var WeightRecord = Backbone.Model.extend({
    defaults: {
        date: undefined,
        weight: undefined
    }
});

var WeightRecordList = Backbone.Collection.extend({
    model: WeightRecord
});
