const tarefas = require("../model/tarefa");
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

  const err = jwt.verify(token,SECRET, function(error) {
    if(error) return error 
  })
  
  if (err) return res.status(401).send("não autorizado")

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas)
  });
};

const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  const itemTarefa   = new tarefas(req.body);
  itemTarefa.save(function (error) {
    if (error) res.status(500).send({ message: error.message });

    res.status(201).send(itemTarefa.toJSON());
  });
};

const login = (req,res) => {
  tarefas.findOne({ nome: req.body.nome }, function(error, tarefas) {
    if(!tarefas) {
      return res.status(404).send(`Não localizamos o nome ${req.body.nome}`);
    }

    const senha = bcrypt.compareSync(req.body.password, tarefas.password);

    if(!senha) {
      return res.status(403).send(`Esta senha está incorreta`)
    }

    const token = jwt.sign({ nome: req.body.nome }, SECRET);
      return res.status(200).send(token)
  })
}

module.exports = {
  getAll,
  postTarefa,
  login
};

