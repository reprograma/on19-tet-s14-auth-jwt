const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const getAll = (req, res) => {
  const authHeader = req.get(`authorization`) ?? ("Não autorizado");
  const token = authHeader.split(' ')[1];
  console.log(`Meu header:`, token);

  if(!token){
    return res.status(401)
  }

  jwt.verify(token,SECRET,function(Error){
    if(Error){
      return res.status(401).send("não autorizado")
    }
  })

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas)
  });
};

const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.nome, 10);
  req.body.nome = senhaComHash;

  const tarefa = new tarefas(req.body);

 tarefa.save(function (err) {
    if (err) {
      return res.status(500).send({ message: err.message })
    }
   res.status(201).send(tarefa.toJSON());
  });
};



module.exports = {
    getAll,
    postTarefa,
  
}