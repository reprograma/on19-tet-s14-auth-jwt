require('dotenv').config();
const express = require('express');
const cors = require("cors");
const index = require("./routes/index");
const tarefas = require("./routes/tarefasRoute");
const mongoose = require("./database/dbConnect");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect();

app.use("/", index);
app.use("/tarefas", tarefas)

module.exports = app;