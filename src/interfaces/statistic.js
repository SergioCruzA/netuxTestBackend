// Require statistic model
const statisticModel = require('../models/statistic');

// Interface for create statistic
const create = async(user) => {
  const date = new Date();
  const dates = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
  let newStatistic;
  try {
    // Create new statistic for an user 
    newStatistic = await statisticModel.create({ user, ...dates });
  } catch (e) {
    console.log(e);
    throw new Error('STATISTIC_DONT_CREATE');
  }
  return newStatistic.toObject();
};

const readOne = (query, select) => statisticModel.findOne(query, select);

// Interface for create statistic
const createStatistic = async(user) => {
  const date = new Date();
  const dates = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
  // Validate if already exists
  const statistic = await readOne({ ...dates, user});
  // Create statistic in database
  if(!statistic) await create(user);
}

// Interface for count documents by query
const count = async(query) => statisticModel.countDocuments(query);

module.exports = {
  create,
  createStatistic,
  count,
  readOne,
}