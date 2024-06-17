var mongoose = require("mongoose");

var entregaSchema = new mongoose.Schema(
  {
    _id: String,
    creationDate: Date,
    uc: String,
    idProjeto: String,
    designacaoProjeto: String,
    designacaoEquipa: String,
    idEquipa: String,
    ficheiro: String, // path da entrega do ficheiro
    obs: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("entrega", entregaSchema);
