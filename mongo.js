var mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGO}/weights`);

var WeightSchema = new mongoose.Schema({
  userID: String,
  date: Date,
  value: Number
});
WeightSchema.index({userID: 1, date: -1}, {unique: true});

var Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight
