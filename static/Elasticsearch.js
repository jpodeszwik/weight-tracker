var allRecordsOrderedByTimestampQuery = '\
   {\
       "query": {\
           "match_all" : {}\
       },\
       "sort" : [\
           {\
               "date": {\
                   "order" : "desc"\
               }\
           }\
       ]\
   }';

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
        $.post(this.esUrl + '/weight/' + user + '/_search', allRecordsOrderedByTimestampQuery, function (data) {
            var userData = data['hits']['hits'].map(function (hit) {
                return hit['_source'];
            });

            onSuccess(new WeightRecordList(userData));
        });
    };

    this.getUserBounds = function (user, onSuccess) {
        $.post(this.esUrl + '/weight/' + user + '/_search', boundsAggregation, function (data) {
            var aggregations = data['aggregations'];

            var bounds = {
                minWeight: aggregations['min_weight']['value'],
                maxWeight: aggregations['max_weight']['value'],
                minDate: aggregations['min_date']['value_as_string'],
                maxDate: aggregations['max_date']['value_as_string']
            };

            onSuccess(bounds);
        });
    }
}
