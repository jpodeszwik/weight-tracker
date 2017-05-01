var express = require('express');
var {listUsers, recentUserData, userBounds} = require('./elastic')

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

api.get('/users/:username/bounds', function(req, res) {
  userBounds(req.params.username).then(function(data) {
    res.send(data);
  }, function(err) {
    res.status(500).send(err);
  });
});

module.exports = api;
