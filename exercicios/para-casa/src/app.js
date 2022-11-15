require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("./database/dbConnect")
const contributorRoutes = require("./routes/contributorRoutes")

const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect()

app.use("/reprograma", contributorRoutes)

module.exports = app;