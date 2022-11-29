require("dotenv").config();
const express = require('express');
const cors = require("cors");
const db = require ("./DB/dbConnect");
const tarefasRoutes = require("./routes/tarefasRoutes")


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('Conexão com DB feita com sucesso')
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/tarefas", tarefasRoutes)


module.exports = app;
