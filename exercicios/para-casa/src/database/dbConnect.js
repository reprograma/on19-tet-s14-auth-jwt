require('dotenv').config()
const MONGO_DB = process.env.MONGO_DB
const mongoose = require("mongoose");
const connect = async () => {
  try {
    mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Banco de dados conectado com sucesso");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };