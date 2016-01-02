$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');
    var kibana = new Kibana('http://zbiki.ddns.net/kibana4');

    function updateRecentData() {
        var username = $('.user-selector').val();
        es.recentUserData(username, function (weightRecordListModel) {
            $('.recent-data').find('tbody').remove();
            var weightRecordListView = new WeightRecordListView({collection: weightRecordListModel});
            $('.recent-data').append(weightRecordListView.render().el);
        });

        $(".kibana-iframe").attr("src", kibana.getIframeUrl(username));
    }

    es.listUsers(function (users) {
        users.forEach(function (user) {
            $('.user-selector').append($('<option>', {value: user}).text(user))
        });
        updateRecentData();
    });

    $('.user-selector').change(function () {
        updateRecentData();
    });
});
