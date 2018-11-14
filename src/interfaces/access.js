// Require access model
const accessModel = require('../models/access');

const vehicleInterface = require('./vehicle');
const userInterface = require('./user');

// Interface for create access
const create = async({ user, vehicle }) => {
  let newAccess = {};
  try {
    newAccess = await accessModel.create({ user, vehicle });
  } catch (e) {
    console.log(e);
    throw new Error('ACCESS_DONT_CREATE');
  }
  return newAccess.toObject();
};

// Interface for update access
const update = async(query, queryUpdate) => {
  const updateStatus = await accessModel.updateOne(query, queryUpdate);
  console.log(updateStatus);
  if ((updateStatus.ok === 0) || (updateStatus.nModified === 0)) {
    throw new Error('ACCESS_NOT_EXIST');
  }
}

const validateUserVehicle = async(identify, plate) => {
  let user, vehicle;validateUserVehicle
  if (plate || (plate && identify)) {
    // Find by plate
    vehicle = await vehicleInterface.readOne({ plate });
    if (!vehicle) throw new Error('VEHICLE_NOT_EXISTS');
    user = await userInterface.readOne({ _id: vehicle.owner });
  } else {
    // Find by identify
    user = await userInterface.readOne({ identify });
    if (!user) throw new Error('USER_NOT_EXISTS');
    vehicle = await vehicleInterface.readOne({ owner: user.id });
    if (!vehicle) throw new Error('VEHICLE_NOT_EXISTS');
  }
  return { user, vehicle };
}

const createAccess = async({ identify, plate }) => {
  const { user, vehicle } = await validateUserVehicle(identify, plate);

  console.log('user: ', user);
  console.log('vehicle: ', vehicle);

  const accessCreated = await create({ user: user.id, vehicle: vehicle.id });
  // TODO enviar informacion del punto 2.2
  return accessCreated;
};

const updateOut = async({ identify, plate }) => {
  const { user, vehicle } = await validateUserVehicle(identify, plate);
  // Validate if have pico y placa

  await update({ vehicle: vehicle.id, user: user.id, exitDate: { $exists: false } }, { $set: { exitDate: new Date() } });
}

module.exports = {
  create,
  createAccess,
  update,
  updateOut,
}