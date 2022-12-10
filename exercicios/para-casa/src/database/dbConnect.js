//const DATABASE_MONGO = process.env.DATABASE_MONGO;
const mongoose = require ('mongoose');

mongoose.connect("mongodb+srv://AlineHoffmann:1234@cluster0.5hbucqg.mongodb.net/reprograma", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection;

module.exports = db;