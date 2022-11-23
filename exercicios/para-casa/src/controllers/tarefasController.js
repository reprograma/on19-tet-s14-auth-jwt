const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const getAll = (req, res) => {
  const authHeader = req.get(`authorization`);
  const token = authHeader?.split(' ')[1] ?? ("Não autorizado");
  console.log(`Meu header:`, token);

  if (!token) {
    return res.status(401).send(`Header error.`);
  }

  const err = jwt.verify(token, SECRET, function (error) {
    if (error) return error
  })

  if (err) return res.status(401).send("Não autorizado")

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};


const postTarefas = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.senha, 10); //salt é intensidade que atribui, nesse caso é 10
  req.body.senha = senhaComHash;
const {descricao, dataInclusao, concluido, nomeColaboradora} = req.body
  console.log(req.body);

  const tarefa = new tarefas({
    descricao,
    dataInclusao,
    concluido,
    nomeColaboradora,
    senha:senhaComHash,
  });
  

  tarefa.save(function (err) {
    if (err) {
      return res.status(500)
      }

     //res.status(500).send({ message: err.message });
     res.status(201).send(tarefa.toJSON());
  });
};

const login = async (req, res) => {
  try {
    tarefas.findOne({nomeColaboradora: req.body.nomeColaboradora}, function (error, tarefa) {
      if (!tarefa) {
        return res.status(404).send(`colaboradora ${req.body.nomeColaboradora} não encontrada`);
      }
      const senhaValida = bcrypt.compare(req.body.senha, tarefas.senha);
      if (!senhaValida) {
        return res.status(403).send("Senha inválida");
      }

      const token = jwt.sign({nomeColaboradora: req.body.nomeColaboradora}, SECRET);
return res.status(200).send(token);
    });
  } catch (error) {
      res.status(500).json({ message: error.message });
  };
};

module.exports = {
    getAll,
    postTarefas,
    login
}