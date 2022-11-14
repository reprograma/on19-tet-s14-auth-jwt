const  mongoose = require ("mongoose");
const DATABASE_MONGO = process.env.DATABASE_MONGO;

mongoose.connect(DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;

module.exports = db;