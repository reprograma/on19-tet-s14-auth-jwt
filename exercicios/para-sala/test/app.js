const express = require('express');
const cors = require("cors");
const index = require("../src/routes/index");
const colaboradoras = require("../src/routes/colaboradorasRoute");
const tarefas = require("../src/routes/tarefasRoute")
const db = require ("../src/database/dbConnect");

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", index);
app.use("/colaboradoras", colaboradoras)
app.use("/tarefas", tarefas)

module.exports = app;
