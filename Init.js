$(function () {
    var es = new Elasticsearch('http://zbiki.ddns.net');
    es.listWeightIndices(function (indices) {
        indices.forEach(function (index) {
            $('.index-selector').append($('<option>', {value: index}).text(index))
        });
    });
});