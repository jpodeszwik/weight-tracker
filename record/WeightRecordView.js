var WeightRecordView = Backbone.View.extend({

    tagName: "tr",

    initialize: function () {
        _.bindAll(this, 'render');
    },

    render: function () {
        this.$el.html('<td>' + this.model.get('date') + '</td><td>' + this.model.get('weight') + '</td>');
        return this;
    }
});
