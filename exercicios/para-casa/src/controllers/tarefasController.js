const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAll = (req, res) => {
  const authHeader = req.get(`Authorization`);
  const token = authHeader.split(' ')[1];
  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401).send(`Header error.`);
  }

  const err = jwt.verify(token, SECRET, function (error) {
    if (error) return error
  })

  if (err) return res.status(401).send(`Not authorized.`)

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};

const postTarefa = (req, res) => {
  const hashPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashPassword;

  console.log(req.body);

  let tarefa = new tarefas(req.body);
  tarefa.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    res.status(201).send(tarefa.toJSON());
  });
};

const login = (req,res) => {
    tarefas.findOne({ id: req.body.id }, function (error, tarefa) {
    if (!tarefas) {
      return res.status(404).send(`ID ${req.body.id} not found.`)
    }
    
    const validPassword = bcrypt.compareSync(req.body.password, tarefa.password)
    if (!validPassword) {
      return res.status(403).send(`Password is incorrect.`)
    }
  
    const token = jwt.sign({ id: req.body.id }, SECRET);
    return res.status(200).send(token);
  })
  }

module.exports = {
    getAll,
    postTarefa,
    login
}