const MONGO_URL = process.env.MONGO_URL
const mongoose = require("mongoose");

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;

module.exports = db;