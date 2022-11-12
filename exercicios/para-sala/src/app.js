const express = require('express');
const cors = require("cors");

const mongoose = require("./database/dbConnect");
const index = require("./routes/index");
const colaboradoras = require("./routes/colaboradorasRoute");


const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect();

app.use("/", index);
app.use("/colaboradoras", colaboradoras)

module.exports = app;
