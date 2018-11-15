const _ = require('lodash');

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
    newStatistic = await statisticModel.create({ user, ...dates });
  } catch (e) {
    console.log(e);
    throw new Error('STATISTIC_DONT_CREATE');
  }
  return newStatistic.toObject();
};

const readOne = (query, select) => statisticModel.findOne(query, select);

const createStatistic = async(user) => {
  const date = new Date();
  const dates = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
  const statistic = await readOne({ ...dates, user});
  if(!statistic) await create(user);
}

const count = async(query) => statisticModel.countDocuments(query);

module.exports = {
  create,
  createStatistic,
  count,
  readOne,
}