const mongoose = require ("mongoose");
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;

module.exports = db;