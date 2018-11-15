// Require user model
const userModel = require('../models/user');

// Interface for create user
const create = async(user) => {
  let newUser = {};
  try {
    // Create user in database
    newUser = await userModel.create({ ...user });
  } catch (e) {
    console.log(e);
    throw new Error('USER_DONT_CREATE');
  }
  return newUser.toObject();
};

// Interface for find an user by query
const readOne = (query, select) => userModel.findOne(query, select);

module.exports = {
  create,
  readOne,
}