var express = require('express');
var {listUsers} = require('./elastic')

var api = express();

api.get('/users', function (req, res) {
  listUsers().then(function (mappings) {
    res.send(mappings);
  }, function (err) {
    res.status(500).send(err);
  });
});

module.exports = api;
