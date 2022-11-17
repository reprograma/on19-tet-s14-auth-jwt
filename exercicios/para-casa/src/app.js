require("dotenv").config();
const express = require("express");
const cors = require("cors");
const tasks = require("./routes/tasksRoute");
const db = require("./database/dbConnect");
const { default: mongoose } = require("mongoose");

db.on("error", console.log.bind(console, 'Connection error'));
db.once("open", () => {
    console.log('Database connected successfully');
});

const app = express();

app.use("/tasks", tasks);

module.exports = app;