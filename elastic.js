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

function recentUserData(username) {
  return client.search({
    index: 'weight',
    type: username,
    body: {
      query: {
        match_all: {}
      },
      sort: [
        {
          date: {
            order: 'desc'
          }
        }
      ]
    }
  }).then(function (data) {
    return data.hits.hits.map(function (hit) {
        return hit['_source'];
    });
  });
}

function userBounds(username) {
  return client.search({
    index: 'weight',
    type: username,
    body: {
      query: {
        match_all: {}
      },
      aggregations: {
        min_weight: { min: { field: 'weight'}},
        max_weight: { max: { field: 'weight'}},
        min_date: { min: { field: 'date'}},
        max_date: { max: { field: 'date'}}
      },
      size: 0
    }
  }).then(function (data) {
    return {
        minWeight: data.aggregations.min_weight.value,
        maxWeight: data.aggregations.max_weight.value,
        minDate: data.aggregations.min_date.value_as_string,
        maxDate: data.aggregations.max_date.value_as_string
    };
  });
}

module.exports = {listUsers, recentUserData, userBounds};
