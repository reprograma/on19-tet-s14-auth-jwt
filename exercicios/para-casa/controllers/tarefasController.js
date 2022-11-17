const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET // colocar a chave de acesso do mongo
//const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




const getAll = (req, res) => {
    const authHeader = req.get(`authorization`);
    const token = authHeader.split(' ')[1];
    console.log(`Meu header:`, token);
  
    if(!token){
      return res.status(401)
    }
  
    const err = jwt.verify(token,SECRET,function(error){
      if(error) return error 
    })
    
    if (err) return res.status(401).send("não autorizado")
  
    console.log(req.url);
    colaboradoras.find(function (err, colaboradoras) {
      res.status(200).send(colaboradoras);
    });
  };

  module.exports = {
    getAll,
    login,
  }