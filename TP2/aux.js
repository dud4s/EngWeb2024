exports.myDateTime = () => {
  var d = new Date().toISOString().substring(0, 16);
  return d;
};

exports.myName = () => {
  return "Dudis";
};

exports.turma = "EngWeb2024::TP3";
