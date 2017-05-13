var mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGO}/weights`);

var WeightSchema = new mongoose.Schema({
  userID: String,
  date: Date,
  values: mongoose.Schema.Types.Mixed,
});
WeightSchema.index({userID: 1, date: -1}, {unique: true});

var Weight = mongoose.model('Weight', WeightSchema);

// migrate schema from old version
Weight.update({value: {$exists: true}}, { $rename: {'value': 'values.weight'}},
  {multi: true, strict: false}, function(err, res) {
  if (err) console.console.warn(err);
  console.log(res);
});

module.exports = Weight
