var express = require('express');
var dateFormat = require('dateformat');

var Weight = require('../mongo');

var api = express();

api.use((req, res, next) => {
  if(!req.isAuthenticated()) {
    res.status(401).send('unauthorized');
    return;
  }
  
  next();
});

function recordToResult(record) {
  var parsedDate = dateFormat(record.date, "yyyy-mm-dd");
  return {date: parsedDate, values: record.values};
}

api.post('/weights', function(req, res) {
  var weight = new Weight({userID: req.user.id, date: req.body.date, values: req.body.values});
  weight.save(function(err) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(weight);
    }
  });
});

api.get('/weights', function(req, res) {
  Weight.find({userID: req.user.id}).sort({date: -1}).exec(function (err, records) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(records.map(recordToResult));
    }
  });
});

api.get('/weights/:date', function(req, res) {
  Weight.find({userID: req.user.id, date: req.params.date}).exec(function (err, records) {
    if(err) {
      res.status(500).send(err);
    } else {
      if (0 === records.length) {
        res.status(404).send({message: 'not found'});
      } else {
        res.send(recordToResult(records[0]));
      }
    }
  });
});

api.put('/weights/:date', function(req, res) {
  Weight.findOneAndUpdate(
    {userID: req.user.id, date: req.params.date},
    {userID: req.user.id, date: req.params.date, values: req.body.values},
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
