require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("./database/dbConnect")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect()

app.use("/todo", taskRoutes)

module.exports = app;