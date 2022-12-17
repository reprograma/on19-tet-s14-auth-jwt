require('dotenv').config()
const express = require('express');
const cors = require("cors");
const index = require("./routes/index");
const atividades = require("./routes/attRouter");
const db = require ("./database/dbConnect");


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco de dados feita com sucesso')
});


const app = express();

app.use(express.json());
app.use(cors());


app.use("/", index);
app.use("/atividade", atividades)

module.exports = app;