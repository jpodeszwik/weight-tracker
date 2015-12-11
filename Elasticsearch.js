var usernameAggregation = '\
    {\
        "size": 0,\
        "aggregations" : {\
            "users" : {\
                "terms" : {\
                    "field" : "username",\
                    "size" : "1000"\
                }\
            }\
        }\
    }';

function recentUserDataQuery(username) {
    return '\
       {\
           "query": {\
               "term" : {\
                   "username" : "' + username + '"\
                }\
            },\
            "sort" : [\
                {\
                    "@timestamp": {\
                        "order" : "desc"\
                    }\
                }\
            ]\
        }';
}

function Elasticsearch(esUrl) {
    this.esUrl = esUrl;

    this.listUsers = function (onSuccess) {
        $.post(this.esUrl + '/weight/_search', usernameAggregation, function (data) {
            var users = data["aggregations"]["users"]["buckets"].map(function (bucket) {
                return bucket["key"];
            });

            onSuccess(users);
        });
    };

    this.recentUserData = function (user, onSuccess) {
        $.post(this.esUrl + '/weight/_search', recentUserDataQuery(user), function (data) {
            var userData = data['hits']['hits'].map(function (hit) {
                var source = hit['_source'];
                return {
                    'date': source['@timestamp'],
                    'weight': source['value']
                };
            });

            onSuccess(userData);
        });
    }
}
