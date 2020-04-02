const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  taskInput: {
    type: String,
    required: true
  },
  workDescription: {
    type: String,
    require: true
  },
  totalWorkingHours: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Update = mongoose.model('Update', updateSchema);
module.exports = Update;
