const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalCalls: {
    type: Number,
    required: true
  },
  callsReceived: {
    type: Number,
    required: true
  },
  callsNotReceived: {
    type: Number,
    required: true
  },
  response: {
    type: String,
    require: true
  },
  date: String
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
