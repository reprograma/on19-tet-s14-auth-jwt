const DATABASE_MONGO = process.env.DATABASE_MONGO;

const mongoose = require("mongoose");

mongoose.connect(DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

module.exports = db;