const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get("Authorization");
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
  tarefas.find(function (_err, tarefas) {
    res.status(200).send(tarefas);
  });
};


const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  console.log(req.body);
  const tarefa = new tarefas(req.body);


  tarefa.save(function (err) {
    console.log(err)
    if (err) {
      return res.status(500)
    }
   
      res.status(201).send(tarefa.toJSON());

  });
};

const login = (req,res) => {
  tarefas.findOne({ email: req.body.email }, function(_error, tarefas) {
    if(!tarefas) {
      return res.status(404).send(`Não localizamos o email ${req.body.email}`);
    }

    const senhaValida = bcrypt.compareSync(req.body.password, tarefas.password);

    if(!senhaValida) {
      return res.status(403).send(`Esta senha está incorreta`)
    }

    const token = jwt.sign({ email: req.body.email }, SECRET);
      return res.status(200).send(token)
  })
}

module.exports = {
    getAll,
    postTarefa,
    login
}