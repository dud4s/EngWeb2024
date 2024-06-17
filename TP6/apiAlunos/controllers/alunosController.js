var mongoose = require("mongoose");
var Aluno = require("../models/alunosModel");

module.exports.list = () => {
  return Aluno.find().sort({ nome: 1 }).exec();
};
