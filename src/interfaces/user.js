const _ = require('lodash');

// Require user model
const userModel = require('../models/user');

// Interface for create user
const create = async(user) => {
  let newUser = {};
  try {
    newUser = await userModel.create({ ...user });
  } catch (e) {
    console.log(e);
    throw new Error('USER_DONT_CREATE');
  }
  return newUser.toObject();
};

module.exports = {
  create,
}