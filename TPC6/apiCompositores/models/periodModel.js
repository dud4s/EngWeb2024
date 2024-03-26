var mongoose = require("mongoose");

var periodSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nome: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Periodos", periodSchema);
