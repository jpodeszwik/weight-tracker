$(function () {
    var uri = new URI();

    var es = new Elasticsearch();
    var kibana = new Kibana();

    function loadData(username) {
        es.recentUserData(username, function (weightRecordListModel) {
            weightRecordListModel.unshift(new WeightRecord({username: username}));
            var recentDataSelector = $('.recent-data');
            recentDataSelector.find('tbody').remove();
            var weightRecordListView = new WeightRecordListView({collection: weightRecordListModel});
            recentDataSelector.append(weightRecordListView.render().el);
        });

        kibana.getIframeUrl(username, function (url) {
            $(".kibana-iframe").attr("src", url);
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
