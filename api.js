var express = require('express');

var {listUsers, recentUserData, userBounds} = require('./elastic')
var {getChartUrl} = require('./kibana')

var api = express();

api.get('/users', function (req, res) {
  listUsers().then(function (mappings) {
    res.send(mappings);
  }, function (err) {
    res.status(500).send(err);
  });
});

api.get('/users/:username/records', function(req, res) {
  recentUserData(req.params.username).then(function(data) {
    res.send(data);
  }, function(err) {
    res.status(500).send(err);
  });
});

api.get('/users/:username/chartUrl', function(req, res) {
  userBounds(req.params.username).then(function(bounds) {
    res.send({url: getChartUrl(req.params.username, bounds)});
  }, function(err) {
    res.status(500).send(err);
  });
});

module.exports = api;
