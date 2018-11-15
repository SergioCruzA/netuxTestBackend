const _ = require('lodash');

// Require vehicle model
const vehicleModel = require('../models/vehicle');

// Interface for create vehicle
const create = async(vehicle, owner) => {
  let vehicleToCreate;
  // Select fields by kind
  switch (vehicle.kind) {
    case 'CAR':
      vehicleToCreate = _.pick(vehicle, ['model', 'doors', 'plate', 'kind']);
      break;
    case 'MOTORCYCLE':
      vehicleToCreate = _.pick(vehicle, ['cilind', 'times', 'plate', 'kind']);
      break;
    case 'BIKE':
      vehicleToCreate = _.pick(vehicle, ['typeBike', 'kind']);
      break;
  }

  let newVehicle = {};
  try {
    newVehicle = await vehicleModel.create({...vehicleToCreate, owner })
  } catch (e) {
    console.log(e);
    throw new Error('VEHICLE_DONT_CREATE');
  }
  return newVehicle.toObject();
};

// Interface for find a vehicle by query
const readOne = (query, select) => vehicleModel.findOne(query, select);

module.exports = {
  create,
  readOne
}