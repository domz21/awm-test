const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attractionSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  rating: String,
  open: String,
  close: String,
  closed: String,
  address: String,
  coordinate: Array,
  contact: String,
  desc: String,
  image: String
});

const Attraction = mongoose.model('attraction', attractionSchema);

module.exports = Attraction;
