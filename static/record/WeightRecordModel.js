var WeightRecord = Backbone.Model.extend({
    url: function() {
        return `/api/weights/${this.get('date')}`;
    },

    idAttribute: "date",

    defaults: {
        date: undefined,
        values: {},
    }
});

var WeightRecordList = Backbone.Collection.extend({
    model: WeightRecord
});
