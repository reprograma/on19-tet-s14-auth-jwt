const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader?.split(" ")[1] ?? ("Não autorizado");
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

const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  let tarefa = new tarefas (req.body);
  tarefa.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    res.status(201).send(tarefa.toJSON());
  });
};

const login = (req, res) => {
  tarefas.findOne(
    { nomeColaboradora: req.body.nomeColaboradora },
    function (error, tarefa) {
      if (!tarefa) {
        return res
          .status(404)
          .send(`Não localizamos a colaboradoira ${req.body.nomeColaboradora}`);
      }

      const senhaValida = bcrypt.compareSync(
        req.body.password,
        tarefa.password
      );

      if (!senhaValida) {
        return res.status(403).send(`Esta senha está incorreta`);
      }

      const token = jwt.sign({ nomeColaboradora: req.body.nomeColaboradora}, SECRET);
        return res.status(200).send(token);
    }
  );
};

module.exports = {
  getAll,
  postTarefa,
  login
};
