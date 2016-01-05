var WeightRecord = Backbone.Model.extend({
    url: function() {
        return this.urlRoot + '/weight/' + this.get('username') + '/' + this.get('date');
    },

    idAttribute: "date",

    defaults: {
        date: undefined,
        weight: undefined,
        username: undefined
    }
});

var WeightRecordList = Backbone.Collection.extend({
    model: WeightRecord
});
