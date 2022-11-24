const tarefas = require("../models/tarefas");
const SECRET = "";
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt"); 

const getAllTarefas = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader?.split(" ")[1] ?? "Não autorizado";
  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401);
  }

  const err = jwt.verify(token, SECRET, function (error) {
    if (error) return error;
  });

  if (err) return res.status(401).send("não autorizado");

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};

const postTarefas = (req, res) => {
  const tarefa = new tarefas(req.body);
//Nesta rota não foi usado bcrypt para criação de hash na senha
  tarefa.save(function (err) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    return res.status(201).send(tarefa.toJSON());
  });
};

const login = (req,res) => {
    tarefas.findOne({ id: req.body.id }, function(error, tarefa) {
      if(!tarefa) {
        return res.status(404).send(`Não localizamos o Id ${req.body.id}`);
      }
  //Como não criamos hash, não foi preciso usar o bcrypt para descriptografar a senha
      const senhaValida = (req.body.senha, tarefa.senha);
        
      if(!senhaValida) {
        return res.status(403).send(`Esta senha está incorreta`)
      }
  
      const token = jwt.sign({ id: req.body.id }, SECRET);
        return res.status(200).send(token)
    })
  }
  

module.exports = {
  getAllTarefas,
  postTarefas,
  login,
};
