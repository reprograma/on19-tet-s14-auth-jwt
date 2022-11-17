const tarefas = require('../models/tarefas')
const SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAll = (req, res) => {
    const authHeader = req.get('authorization')
    const token = authHeader?.split(' ')[1] ?? ('Not authorized')
    console.log('My header:', token)

    if (!token) {
        return res.status(401).send('Header error')
    }

    const err = jwt.verify(token, SECRET, function (error) {
        if (error)
            return error
    })

    if (err)
        return res.status(401).send('Not authorized')

    console.log(req.url)
    tarefas.find(function (err, tarefas) {
        res.status(200).send(tarefas)
    })
}

const postTarefa = (req, res) => {
    const senhaComHash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = senhaComHash

    const newTarefa = new tarefas(req.body)

    newTarefa.save(function (err) {
        if (err)
            res.status(500).send({ message: err.message })

        res.status(201).send(newTarefa.toJSON())
    })
}

const login = (req, res) => {
    tarefas.findOne({ nomeTarefa: req.body.nomeTarefa }, function (error, tarefas) {
        if (!tarefas) {
            return res.status(404).send(`Tarefa ${req.body.nomeTarefa} not found!`)
        }

        const senha = bcrypt.compareSync(req.body.password, tarefas.password)

        if (!senha) {
            return res.status(403).send('Incorrect password')
        }

        const token = jwt.sign({ nomeTarefa: req.body.nomeTarefa }, SECRET)
        return res.status(200).send(token)
    })
}



module.exports = {
    getAll,
    postTarefa,
    login
}