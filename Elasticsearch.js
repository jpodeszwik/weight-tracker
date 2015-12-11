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

function Elasticsearch(esUrl) {
    this.esUrl = esUrl;

    this.listUsers = function (onSuccess) {
        $.post(this.esUrl + '/weight/_search', usernameAggregation, function (data) {
            var users = data["aggregations"]["users"]["buckets"].map(function (bucket) {
                return bucket["key"];
            });

            onSuccess(users);
        });
    }
}
