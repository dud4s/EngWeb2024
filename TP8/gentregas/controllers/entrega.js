const mongoose = require("mongoose");
var Entrega = require("../models/entrega");

module.exports.list = () => {
  return Entrega.find().sort({ creationDate: 1 }).exec();
};

module.exports.listByUC = (idUc) => {
  return Entrega.find({ uc: idUc }).sort({ creationDate: 1 }).exec();
};
module.exports.listByProjeto = (idProjeto) => {
  return Entrega.find({ idProjeto: idProjeto })
    .sort({ creationDate: 1 })
    .exec();
};

module.exports.listByEquipa = (idEquipa) => {
  return Entrega.find({ idEquipa: idEquipa }).sort({ creationDate: 1 }).exec();
};

module.exports.findById = (id) => {
  return Entrega.findOne({ _id: id }).exec();
};

module.exports.insert = (entrega) => {
  if (Entrega.find({ _id: entrega._id }).exec().length != 1) {
    var newEntrega = new Entrega(entrega);
    return newEntrega.save();
  }
};

module.exports.update = (id, entrega) => {
  return Entrega.findByIdAndUpdate(id, entrega, { new: true }).exec();
};

module.exports.remove = (id) => {
  Entrega.find({ _id: id }).deleteOne().exec();
};
