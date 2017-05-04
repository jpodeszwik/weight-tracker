$(function () {
  $.get('/api/weights', function (userData) {
    var parsed = userData.map(function (data) {
        return {date: new Date(data.date), value: data.value};
    })
    MG.data_graphic({
        title: "Downloads",
        description: "This graphic shows a time-series of downloads.",
        data: parsed,
        width: 600,
        height: 400,
        target: '#chart',
        x_accessor: 'date',
        y_accessor: 'value',
    });

    var weightRecordListModel = new WeightRecordList(parsed);
    weightRecordListModel.unshift(new WeightRecord({}));
    var recentDataSelector = $('.recent-data');
    recentDataSelector.find('tbody').remove();
    var weightRecordListView = new WeightRecordListView({collection: weightRecordListModel});
    recentDataSelector.append(weightRecordListView.render().el);
  });

});
