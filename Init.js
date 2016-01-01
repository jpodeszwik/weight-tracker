$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');
    var kibana = new Kibana('http://zbiki.ddns.net/kibana4');

    function updateRecentData() {
        var username = $('.user-selector').val();
        es.recentUserData(username, function (userData) {
            $('.recent-data').empty();
            userData.forEach(function (data) {
                $('.recent-data').append($('<tr><td>' + data.date + '</td><td>' + data.weight + '</td></tr>'))
            });
        });

        $(".kibana-iframe").attr("src", kibana.getIframeUrl(username));
    }

    es.listUsers(function (users) {
        users.forEach(function (user) {
            $('.user-selector').append($('<option>', {value: user}).text(user))
        });
        updateRecentData();
    });

    $('.user-selector').change(function() {
        updateRecentData();
    });
});