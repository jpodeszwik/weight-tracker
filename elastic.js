var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH
});

function listUsers() {
  return client.indices.getMapping({
    index: 'weight'
  }).then(function(data) {
    return Object.keys(data).map(function (index) {
        return Object.keys(data[index]['mappings']);
    }).reduce(function (a, b) {
        return a.concat(b);
    }, []).filter(function (type) {
        return type != '_default_'
    });
  });
};

module.exports = {listUsers};
