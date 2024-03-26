const mongoose = require("mongoose");
const Period = require("../models/periodModel");

/* Returns a list of periods */
module.exports.list = () => {
  return Period.find().sort({ nome: 1 }).exec();
};

/* Returns a period by id */
module.exports.get = (id) => {
  return Period.findOne({ _id: id }).exec();
};

/* Insert a new period */
module.exports.insert = (period) => {
  var newPeriod = new Period(period);
  return newPeriod.save();
};

/* Remove a period by id */
module.exports.delete = (id) => {
  return Period.findByIdAndDelete(id);
};

/* Update a period by id */
module.exports.update = (id, period) => {
  return Period.findByIdAndUpdate(id, period, {
    new: true,
  }).exec();
};
