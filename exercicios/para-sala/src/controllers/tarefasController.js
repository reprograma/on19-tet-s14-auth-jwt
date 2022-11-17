const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
    const authHeader = req.get("Authorization");
    
    const token = authHeader?.split(" ")[1] ?? ("Não autorizado");
  
    console.log(`Meu header:`, token);
  
    if (!token) {
      return res.status(401)
    }
  
    jwt.verify(token, SECRET, function (Error) {
      if (Error) {
        return res.status(401).send("não autorizado")
      }
    })
  
    console.log(req.url);
    tarefas.find(function (err, tarefas) {
      res.status(200).send(tarefas)
    });
  };

  module.exports = { getAll
};
  