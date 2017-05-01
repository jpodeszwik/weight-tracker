
function Elasticsearch() {
    this.listUsers = function (onSuccess) {
        $.get('/api/users', function (users) {
            onSuccess(users);
        });
    };

    this.recentUserData = function (user, onSuccess) {
        $.get(`/api/users/${user}/records`, function (userData) {
            onSuccess(new WeightRecordList(userData));
        });
    };
}
