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

  if (err) return res.status(401).send(`Not authorized.`)

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

const login = (req,res) => {
  tarefas.findOne({ nomeColaboradora: req.body.nomeColaboradora }, function(error, tarefa) { //parametro q guarda email e senha
    if(!tarefa) {
  return res.status(404).send(`não localizamos o nome da colaboradora ${req.body.nomeColaboradora}`);
    }

  const senhaValida = bcrypt.compare(req.body.senha, tarefas.senha, function(err, match){
    if (err) return res.status(400);
                else if (match == false) {
                    return res.json({
                        success: false,
                        message: 'Wrong Password'
                    })
  }; //comapara a senha utlizada com a senha da pratf em formato de res  
  
  if(!senhaValida) {
    return res.status(403).send(`Esta senha está incorreta`);
  }

  const token = jwt.sign({ nomeColaboradora: req.body.nomeColaboradora }, SECRET);
    return res.status(200).send(token)
  })
 })}

module.exports = {
    getAll,
    postTarefas,
    login
}