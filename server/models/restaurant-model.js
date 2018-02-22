const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
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
  image: String,
  mone: String,
  mtwo: String,
  mthree: String
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;
