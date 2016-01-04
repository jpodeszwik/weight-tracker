var WeightRecord = Backbone.Model.extend({
    url: function() {
        return this.urlRoot + 'weight/' + this.get('username') + '/' + this.get('date');
    },

    //TODO: move this outside
    urlRoot: 'http://zbiki.ddns.net/',

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
