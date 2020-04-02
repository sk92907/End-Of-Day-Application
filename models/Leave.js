const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  holidays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  date: {
    type: String,
    require: true
  }
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;
