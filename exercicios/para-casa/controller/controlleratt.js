const atividadesS = require("../model/atividade");
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

  //falta finalizar essa parte (testar)
  const postAtividade = (req, res) => {
    const senhaHash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = senhaHash;
  
    const exercicio = new atividadesS(req.body);
    exercicio.save(function (error) {
      if (error) res.status(500).send({ message: error.message });
  
      res.status(201).send(exercicio.toJSON());
    });
  };
  
  
  module.exports = {
    getAll,
    postAtividade,
  };
  