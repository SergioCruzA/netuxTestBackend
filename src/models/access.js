const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define user schema 
let accessSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now,
  },
  exitDate: {
    type: Date,
  },
  img: {
    type: String,
  }
}, 
  {
    timestamps: true,
  });

module.exports = mongoose.model('access', accessSchema);