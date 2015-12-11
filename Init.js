$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');
    es.listUsers(function (users) {
        users.forEach(function (user) {
            $('.user-selector').append($('<option>', {value: user}).text(user))
        });
    });
});