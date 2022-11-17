require("dotenv").config();
const express = require('express');
const cors= require("cors");
const route = require("./routes/routesTarefas");
const Tarefas = require("./routes/routesTarefas")
const DataBase = require("./database/dataBaseConnect");


DataBase.on("error", console.log.bind(console, "Error de conexão"))
DataBase.once("open", ()=>{
    console.log("Conexão feita ao Banco de Dados com sucesso ! ")
})
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", route)
app.use("/tarefa", Tarefas);

module.exports = app