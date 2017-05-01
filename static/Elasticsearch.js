var boundsAggregation = '\
   {\
       "query": {\
           "match_all" : {}\
       },\
       "aggregations" : {\
           "min_weight" : { "min" : { "field" : "weight" } },\
           "max_weight" : { "max" : { "field" : "weight" } },\
           "min_date": {"min" : { "field" : "date" }},\
           "max_date": {"max" : { "field" : "date" }}\
       },\
       "size": 0\
   }';

function Elasticsearch(esUrl) {
    this.esUrl = esUrl;

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

    this.getUserBounds = function (user, onSuccess) {
        $.get(`/api/users/${user}/bounds`, function (bounds) {
            onSuccess(bounds);
        });
    }
}
