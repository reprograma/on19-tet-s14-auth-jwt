const tarefa = require("../model/tarefas");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tarefas = require("../model/tarefas");

//cria uma nova tarefa, com senha gerada aumaticamente
const AddTarefa = (req, res) =>{
    const senhaComhaHash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = senhaComhaHash

    const tarefas = new tarefa(req.body);
    tarefas.save(function(err){
        if(err){
            return res.status(500).json(tarefas)
        }
        res.status(201).send(tarefas.toJSON())
    })
console.log(tarefas)
};
//lista   tarefas geradas
const AllTarefa = (req, res) =>{
    const  AuthHeader = req.get("authorization")
    const token = AuthHeader.split(' ')[0]
    console.log(`Meu Header é : ${token}`)
    if (! token){
        return res.status(401).send("Ops ! erro no header");
    }
    const erro = jwt.verify(token, SECRET,function(error){
        if (error) return error 
    } )
    if (erro) return res.status(200).send("Que pena, você não foi autorizado")
    console.log(req.url);
    tarefas.find(function(err, tarefas){
        res.status(200).send(tarefas)
    });
};

// faz autenticação de dados
const acess = (req, res )=>{
    tarefa.findOne({nomeColaboradora : req.body.nomeColaboradora}, function(err, tarefa){
       if(! tarefa) {
        return res.status(404).send("Id não encontrado")
       };
       const validarSenha = bcrypt.compareSync(req.body.password, tarefa.password)
       if(!validarSenha){
        return res.status(403).send("Senha incorreta! Por favor tente novamente")
       }
       const token = jwt.sign({nomeColaboradora : req.body.nomeColaboradora}, SECRET);
       return res.status(200).send(token)
    })
}

module.exports = {
    AllTarefa,
    AddTarefa,
    acess
}
