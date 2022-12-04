require("dotenv").config();
const express = require('express');
const cors = require("cors");
const index = require("./routes/index");
const tarefas = require("./routes/tarefasRoute");
const db = require("./database/dbConnect");

db.connect();

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", index);
app.use("/agenda", tarefas)

module.exports = app;
