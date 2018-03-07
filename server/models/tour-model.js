const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  // user: {
  //   type: Schema.ObjectId,
  //   ref: 'User'
  // },
  content: String,
  created: Date
});

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;
