const tarefas = require("../model/atividade");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
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
    atividade.find(function (err, atividade) {
      res.status(200).send(atividade);
    });
  };

  //falta finalizar essa parte