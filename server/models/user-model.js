const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  oauth_id: {
    type: String,
    unique: false,
    index: true
  },
  name: String,
  avatar: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
