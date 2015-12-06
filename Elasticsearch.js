function Elasticsearch(esUrl) {
    this.esUrl = esUrl;
    this.listWeightIndices = function (onSuccess) {
        $.get(this.esUrl + '/_mappings', function (data) {
            var indices = Object.keys(data).filter(function (index) {
                return 'weight' in data[index]['mappings'];
            });
            onSuccess(indices);
        });
    }
}
