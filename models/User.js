const mongoose = require('mongoose'),
  moment = require('moment');

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: moment().format('MMM Do YYYY')
  },
  empType: {
    type: String,
    require: true
  },
  image: String,
  imageId: String
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
