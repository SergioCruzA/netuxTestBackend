const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define user schema 
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  identify: {
    type: String,
    required: true,
    unique: true, 
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  jobTitle: {
    type: String,
  }
}, 
  {
    timestamps: true,
  });

module.exports = mongoose.model('user', userSchema);