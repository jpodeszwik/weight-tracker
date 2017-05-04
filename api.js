var express = require('express');

var {listUsers, recentUserData, userBounds} = require('./elastic')
var {getChartUrl} = require('./kibana')
var Weight = require('./mongo');

var api = express();

api.post('/weights', function(req, res) {
  var weight = new Weight({userID: req.user.id, date: req.body.date, value: req.body.value});
  weight.save(function(err) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(weight);
    }
  });
});

api.get('/weights', function(req, res) {
  Weight.find({}).exec(function (result, err) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
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
