var mongoose = require("mongoose");

const compositorSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nome: { type: String, required: true },
    bio: { type: String, required: true },
    dataNasc: { type: String, required: true },
    dataObito: { type: String, required: false },
    periodo: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("Compositores", compositorSchema);
