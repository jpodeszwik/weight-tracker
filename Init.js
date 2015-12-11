$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');

    function updateRecentData() {
        es.recentUserData($('.user-selector').val(), function (userData) {
            $('.recent-data').empty();
            userData.forEach(function (data) {
                $('.recent-data').append($('<tr><td>' + data.date + '</td><td>' + data.weight + '</td></tr>'))
            });
        });
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