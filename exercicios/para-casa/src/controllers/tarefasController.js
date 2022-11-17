const tarefas = require ("../models/tarefasModel");
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const save = require('save');


const getAll = (req, res) => { 
  const authHeader = req.get(`authorization`); 
  const token = authHeader.split(' ')[1] ?? ("Não autorizado");
  console.log(`Meu header:`,token); 
   
  if(!token){ 
    return res.status(401) 
  } 
   
  jwt.verify(token,SECRET,function(error){ 
  if(error){ 
  return res.status(401).send('Não autorizado') 
    } 
    }) 
   
    console.log(req.url); 
    tarefas.find(function (err, tarefas) { 
    res.status(200).send(tarefas); 
    }); 
  };
 
const postTarefas = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  console.log(req.body);
  const tarefa = new tarefas(req.body);

  tarefa.save(function(err){
    if(err){
      return res.status(500)
    }
    res.status(201).send(tarefa.toJSON());
  });
};


const login = (req,res) => {
  tarefas.findOne({name:req.body.name}, function(error, tarefas) {
    if(!tarefas) {
       return res.status(404).send (`Não localizamos ${req.body.name} na lista de usuários.`);
    }

    const senhaValida = bcrypt.compareSync(req.body.password, tarefas.password);

    if(!senhaValida) {
      return res.status(403).send(`Esta senha está incorreta`)
    }
    const token = jwt.sign({name: req.body.name}, SECRET);
      return res.status(200).send(token)
  })
}

const excluiTarefa = async (req, res) => {
  try {
    const findTarefa = await tarefas.findById(req.params.id);
    if(findTarefa == null) {
      return res.status(404).json({ message:`Tarefa com ${id} não encontrada.`})
    };
    await findTarefa.remove();
      res.status(200).json({ message: `Tarefa com ${id} deletada com sucesso.`});
    }catch (error) {
    res.status(500).json({ message: error.message });
  };
};

module.exports = {
    getAll,
    postTarefas,
    login,
    excluiTarefa,
}