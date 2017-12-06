const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGO}/weights`);

const WeightSchema = new mongoose.Schema({
  userID: String,
  date: Date,
  values: mongoose.Schema.Types.Mixed,
});

WeightSchema.index({userID: 1, date: -1}, {unique: true});

const Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight
