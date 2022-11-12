const colaboradoras = require("../models/colaboradoras");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader.split("")[1];
  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, SECRET, function (Erro) {
    if (Erro) {
      return res.status(401).send("Não autorizado");
    }
  });

  console.log(req.url);
  colaboradoras.find(function (err, colaboradoras) {
    res.status(200);
  });
};

const postColaboradora = (req, res) => {
  console.log(req.body);

  let colaboradora = new colaboradoras(req.body);
  colaboradora.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    res.status(201).send(colaboradora.toJSON());
  });
};

module.exports = {
  getAll,
  postColaboradora,
};