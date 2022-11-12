const mongoose = require ("mongoose");

mongoose.connect("mongodb://localhost:27017/reprograma", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;

module.exports = db;