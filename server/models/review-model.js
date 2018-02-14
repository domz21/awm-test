const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  content: String,
  created: Date
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;
