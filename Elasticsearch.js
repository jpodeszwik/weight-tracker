var allRecordsOrderedByTimestampQuery = '\
   {\
       "query": {\
           "match_all" : {}\
       },\
       "sort" : [\
           {\
               "@timestamp": {\
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
           "min_value" : { "min" : { "field" : "value" } },\
           "max_value" : { "max" : { "field" : "value" } },\
           "min_timestamp": {"min" : { "field" : "@timestamp" }},\
           "max_timestamp": {"max" : { "field" : "@timestamp" }}\
       },\
       "size": 0\
   }';

function Elasticsearch(esUrl) {
    this.esUrl = esUrl;

    this.listUsers = function (onSuccess) {
        $.get(this.esUrl + '/weight/_mappings', function (data) {
            var users = Object.keys(data).map(function (index) {
                return Object.keys(data[index]['mappings']);
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []).filter(function (type) {
                return type != '_default_'
            });

            onSuccess(users);
        });
    };

    this.recentUserData = function (user, onSuccess) {
        $.post(this.esUrl + '/weight/' + user + '/_search', allRecordsOrderedByTimestampQuery, function (data) {
            var userData = data['hits']['hits'].map(function (hit) {
                var source = hit['_source'];
                return {
                    date: source['@timestamp'],
                    weight: source['value']
                };
            });

            onSuccess(new WeightRecordList(userData));
        });
    };

    this.getUserBounds = function (user, onSuccess) {
        $.post(this.esUrl + '/weight/' + user + '/_search', boundsAggregation, function (data) {
            var aggregations = data['aggregations'];

            var bounds = {
                minWeight: aggregations['min_value']['value'],
                maxWeight: aggregations['max_value']['value'],
                minTime: aggregations['min_timestamp']['value_as_string'],
                maxTime: aggregations['max_timestamp']['value_as_string']
            };

            onSuccess(bounds);
        });
    }
}
