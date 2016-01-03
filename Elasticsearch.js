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
    }
}
