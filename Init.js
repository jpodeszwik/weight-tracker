$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');
    es.listUsers(function (users) {
        users.forEach(function (user) {
            $('.user-selector').append($('<option>', {value: user}).text(user))
        });

        es.recentUserData($('.user-selector').val(), function (userData) {
            userData.forEach(function (data) {
                $('.recent-data').append($('<tr><td>' + data.date + '</td><td>' + data.weight + '</td></tr>'))
            });
        });
    });
});