const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define statistic schema 
let statisticSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  /* vehicle: {
    type: String,
    required: true,
  }, */
  day: {
    type: Number,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
  },
}, 
  {
    timestamps: true,
  });

module.exports = mongoose.model('statistic', statisticSchema);