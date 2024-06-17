const mongoose = require("mongoose");
var Projeto = require("../models/projeto");

module.exports.list = () => {
  return Projeto.find().sort({ designacao: 1 }).exec();
};

module.exports.listByUC = (idUc) => {
  return Projeto.find({ uc: idUc }).sort({ designacao: 1 }).exec();
};

module.exports.findById = (id) => {
  return Projeto.findOne({ _id: id }).exec();
};

module.exports.insert = (projeto) => {
  if (Projeto.find({ _id: projeto._id }).exec().length != 1) {
    var newProjeto = new Projeto(projeto);
    return newProjeto.save();
  }
};

module.exports.update = (id, projeto) => {
  return Projeto.findByIdAndUpdate(id, projeto, { new: true }).exec();
};

module.exports.remove = (id) => {
  Projeto.find({ _id: id }).deleteOne().exec();
};
