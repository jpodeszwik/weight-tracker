$(function () {
  $.get('/api/weights', function (userData) {
    var parsed = userData.map(function (data) {
        return {date: new Date(data.date), value: data.value};
    })

    var weights = userData.map(function(data) {
      return data.value;
    });
    MG.data_graphic({
        title: "Weight over time",
        data: parsed,
        width: 1000,
        height: 400,
        target: '#chart',
        x_accessor: 'date',
        y_accessor: 'value',
        utc_time: true,
        min_y: Math.min.apply(Math, weights)-5,
        max_y: Math.max.apply(Math, weights)+5,
    });

    var weightRecordListModel = new WeightRecordList(userData);
    weightRecordListModel.unshift(new WeightRecord({}));
    var recentDataSelector = $('.recent-data');
    recentDataSelector.find('tbody').remove();
    var weightRecordListView = new WeightRecordListView({collection: weightRecordListModel});
    recentDataSelector.append(weightRecordListView.render().el);
  });

});
