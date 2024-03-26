const mongoose = require("mongoose");
const Compositor = require("../models/compositorModel");

/* Returns a list of composers */
module.exports.list = () => {
  return Compositor.find().sort({ nome: 1 }).exec();
};

/* Returns a composer by id */
module.exports.get = (id) => {
  return Compositor.findOne({ _id: id }).exec();
};

/* Insert a new composer */
module.exports.insert = (compositor) => {
  var newCompositor = new Compositor(compositor);
  return newCompositor.save();
};

/* Remove a composer by id */
module.exports.delete = (id) => {
  return Compositor.findByIdAndDelete(id);
};

/* Update a composer by id */
module.exports.update = (id, compositor) => {
  return Compositor.findByIdAndUpdate(id, compositor, { new: true }).exec();
};
