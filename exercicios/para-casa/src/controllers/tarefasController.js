const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  const authHeader = req.get("authorization");
  const token = authHeader?.split(' ')[1] ?? ("Não autorizado");

  if (!token) {
    return res.status(401).json({ mensagem: "Erro no Header" });
  }

  const erro = jwt.verify(token, SECRET, (error) => {
    if (error) return error;
  })

  if (erro) return res.status(401).json({ mensagem: "Não autorizado" });

  const tarefa = await tarefas.find({ tarefas }, "-matricula");
  res.status(200).json(tarefa);
};


const postTarefas = async (req, res) => {
  try {
    const senhaComHash = bcrypt.hashSync(req.body.matricula, 10);

    const {
      descricao,
      dataInclusao,
      concluido,
      nomeColaboradora,
    } = req.body;

    if (req.body.matricula != null && req.body.matricula == "") {
      return res.status(400).json({ mensagem: "A matrícula é obrigatória" });
    } else {
      req.body.matricula = senhaComHash;

      const novaTarefa = new tarefas({
        descricao,
        dataInclusao,
        concluido,
        nomeColaboradora,
        matricula: senhaComHash,
      });

      const salvaTarefa = await novaTarefa.save();
      res.status(201).json({ mensagem: "Nova tarefa salva com sucesso", salvaTarefa });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { id, matricula } = req.body
    tarefas.findById(id, (error, tarefas) => {
      if (!tarefas) {
        return res.status(404).json({ mensagem: `Id ${id} não foi encontrado` });
      }
      const senhaValida = bcrypt.compareSync(matricula, tarefas.matricula);
      if (!senhaValida) {
        return res.status(403).json({ mensagem: "Senha inválida" });
      }

      const token = jwt.sign({ id: req.body.id }, SECRET);
      return res.status(200).json(token);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

module.exports = {
  getAll,
  postTarefas,
  login,
}