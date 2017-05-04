var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weights');

var WeightSchema = new mongoose.Schema({
  userID: String,
  date: Date,
  value: Number
});

var Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight
