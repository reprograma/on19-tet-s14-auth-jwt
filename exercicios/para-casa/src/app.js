require('dotenv-safe').config();
const express = require('express');
const cors = require("cors");
const index = require("../index");
const tarefasRoute = require("./routes/tarefasRoute");
const db = require ("./database/mongooseConnect");

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
});


const app = express();

app.use(express.json());
app.use(cors());


app.use("/", index);
app.use("/tarefas", tarefasRoute)

module.exports = app;
