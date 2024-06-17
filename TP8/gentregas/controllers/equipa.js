const mongoose = require("mongoose");
var Equipa = require("../models/equipa");

module.exports.list = () => {
  return Equipa.find().sort({ designacao: 1 }).exec();
};

module.exports.findById = (id) => {
  return Equipa.findOne({ _id: id }).exec();
};

module.exports.insert = (equipa) => {
  if (Equipa.find({ _id: equipa._id }).exec().length != 1) {
    var newEquipa = new Equipa(equipa);
    return newEquipa.save();
  }
};

module.exports.update = (id, equipa) => {
  return Equipa.findByIdAndUpdate(id, equipa, { new: true }).exec();
};

module.exports.remove = (id) => {
  Equipa.find({ _id: id }).deleteOne().exec();
};
