
const tarefas = require("../model/tarefasModel");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// valida o token e mostra a lista
const getAll = (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader?.split(" ")[1] ?? ("Não autorizado");
  console.log(`Meu header:`, token);

  if(!token){
    return res.status(401)
  }
  const err = jwt.verify(token,SECRET,function(error){
    if(error) return error 
  })
  if (err) return res.status(401).send("não autorizado")

  tarefas.find(function (err, tarefa) {
    res.status(200).send(tarefa);
  });
};


const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10); 
  req.body.password = senhaComHash;

  const tarefa = new tarefas(req.body);

  tarefa.save(function (err) {
    if (err) {
      return res.status(500)
    }
    res.status(201).send(tarefa.toJSON());
  });
};
// gera token para autenticação
const login = (req,res) => {
  tarefas.findOne({ email: req.body.email }, function(error, tarefa) {
    if(!tarefa) {
      return res.status(404).send(`Não localizamos o email ${req.body.email}`);
    }

    const senhaValida = bcrypt.compareSync(req.body.password, tarefa.password);

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