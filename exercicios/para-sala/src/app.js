require("dotenv").config();
const express = require('express');
const cors = require("cors");
const colaboradoras = require("./routes/colaboradorasRoute");
const db = require ("./database/dbConnect");
const { default: mongoose } = require("mongoose");


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com o banco feita com sucesso')
});


const app = express();

app.use(express.json());
app.use(cors());

app.use("/colaboradoras", colaboradoras)

module.exports = app;
