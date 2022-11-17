const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET
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
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};


const postTarefas = (req, res) => {
  const descricaoComHash = bcrypt.hashSync(req.body.descricao, 10);
  req.body.descricao = descricaoComHash;

  console.log(req.body);
  const tarefa = new tarefas(req.body);

  tarefa.save(function (err) {
    if (err) {
      return res.status(500)
    }
    res.status(201).send(tarefa.toJSON());
  });
};

const login = (req, res) => {
  tarefas.findOne({ nomeColaboradora: req.body.nomeColaboradora }, function(error, tarefas) {
    if(!tarefas) {
      return res.status(404).send(`Não localizamos a Colaboradora${req.body.nomeColaboradora}`);
    }

    const descricaoValida = bcrypt.compareSync(req.body.descricao, tarefas.descricao);

    if(!descricaoValida) {
      return res.status(403).send(`Esta Descricao está incorreta`)
    }

    const token = jwt.sign({ descricao: req.body.descricao }, SECRET);
      return res.status(200).send(token)
  })
}



module.exports = {
    getAll,
    postTarefas,
    login,
}