var express = require('express');
var dateFormat = require('dateformat');

var Weight = require('./mongo');

var api = express();

function recordToResult(record) {
  var parsedDate = dateFormat(record.date, "yyyy-mm-dd");
  return {date: parsedDate, value: record.value};
}

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
  Weight.find({userID: req.user.id}).exec(function (err, records) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(records.map(recordToResult));
    }
  });
});

api.get('/weights/:date', function(req, res) {
  Weight.find({userID: req.user.id, date: req.params.date}).exec(function (err, record) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(recordToResult(record));
    }
  });
});

api.put('/weights/:date', function(req, res) {
  Weight.findOneAndUpdate(
    {userID: req.user.id, date: req.params.date},
    {userID: req.user.id, date: req.params.date, value: req.body.value},
    {upsert:true},
    function(err, doc) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});

api.delete('/weights/:date', function(req, res) {
  Weight.remove({userID: req.user.id, date: req.params.date}).exec(function (err) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send('Success');
    }
  });
});

module.exports = api;
