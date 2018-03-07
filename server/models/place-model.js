const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  restaurant: Boolean,
  coordinate: Array,
});

const Place = mongoose.model('place', placeSchema);

module.exports = Place;
