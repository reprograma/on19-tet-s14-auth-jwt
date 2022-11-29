const tarefas = require("../models/tarefas")
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const getAll = async (req, res) => { //precisa autenticar pra ver tudo
    const authHeader = req.get(`Authorization`);
    const token = authHeader.split(" ")[1];
    console.log (`Header: ${token}`);
    if (!token) return res.status(401).send("Erro no header");
    const blocked = jwt.verify(token, SECRET, function(error){
        if (error) return error
    });
    if (blocked) return res.status(401).send("Invalid token");
    console.log(req.url);
    const tarefasAll = await tarefas.find();
    res.status(200).send(tarefasAll)
}

const postTarefa = async (req,res) => { // add nova tarefa
    try {
        const { 
            descricao,
            dataInclusao,
            concluido,
            nomeColaboradora,
            senha
        } = req.body
        const senhaHashed = bcrypt.hashSync(senha, 10);
        const newTarefa = new tarefas ({
            descricao,
            dataInclusao,
            concluido,
            nomeColaboradora,
            senha: senhaHashed
        });
        const savedTarefa = await newTarefa.save();
        res.status(201).json({ msg: "Tarefa criada com sucesso:" }, savedTarefa)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const login = async (req,res) => { // loga numa tarefa - é só uma rota de verificação
    try {
        const { nomeColaboradora, senha } = req.body
        const findTarefa = await tarefas.findOne({ nomeColaboradora: nomeColaboradora });
        if (! findTarefa) return res.status(404).send("Colaboradora not found");
        const senhaValida = bcrypt.compareSync(senha, findTarefa.senha);
        if (! senhaValida) return res.status(401).send("Senha ou Colaboradora errada")
        const token = jwt.sign({ nomeColaboradora: nomeColaboradora }, SECRET); // <- COMO FUNFA ISSO AQUI
        return res.status(200).send(token);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    getAll,
    postTarefa,
    login
}