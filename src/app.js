require('dotenv').config()
const express = require('express');
const cors = require("cors");
const index = require("./routes/index");
const task = require("./routes/taskRoute");
const db = require ("./database/dbConnect");


db.on("error", console.log.bind(console, 'Connection error.'))
db.once("open", () => {
    console.log('Succesfully connected.')
});


const app = express();

app.use(express.json());
app.use(cors());


app.use("/", index);
app.use("/task", task)

module.exports = app;
