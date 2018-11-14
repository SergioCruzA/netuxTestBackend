const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define vehicle schema 
let vehicleSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
    enum: ['CAR', 'MOTORCYCLE', 'BIKE']
  },
  model: {
    type: String
  },
  doors: {
    type: Number,
  },
  cilind: {
    type: Number,
  },
  times: {
    type: Number,
    enum: [2,4],
  },
  plate: {
    type: String,
  },
  typeBike: {
    type: String,
  }
}, 
  {
    timestamps: true,
  });

module.exports = mongoose.model('vehicle', vehicleSchema);