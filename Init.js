$(function () {
    var uri = new URI();

    var elasticsearchUrl = uri.protocol() + '://zbiki.ddns.net';

    Backbone.Model.prototype.urlRoot = elasticsearchUrl;
    var es = new Elasticsearch(elasticsearchUrl);
    var kibana = new Kibana(uri.protocol() + '://zbiki.ddns.net/kibana4');

    function loadData(username) {
        es.recentUserData(username, function (weightRecordListModel) {
            weightRecordListModel.unshift(new WeightRecord({username: username}));
            var recentDataSelector = $('.recent-data');
            recentDataSelector.find('tbody').remove();
            var weightRecordListView = new WeightRecordListView({collection: weightRecordListModel});
            recentDataSelector.append(weightRecordListView.render().el);
        });

        es.getUserBounds(username, function (bounds) {
            $(".kibana-iframe").attr("src", kibana.getIframeUrl(username, bounds));
        });
    }

    es.listUsers(function (users) {
        var uriParams = uri.search(true);
        if (!('username' in uriParams)) {
            window.location.replace(uri.search({username: users[0]}));
        }

        var userSelector = $('.user-selector');
        users.forEach(function (user) {
            userSelector.append($('<option>', {value: user}).text(user))
        });

        var username = uriParams['username'];
        userSelector.val(username);

        userSelector.change(function () {
            window.location.replace(uri.search({username: userSelector.val()}));
        });
        loadData(username);
    });
});
