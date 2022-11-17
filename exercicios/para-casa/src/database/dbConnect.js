const DATABASE_MONGO = process.env.DATABASE_MONGO
const mongoose = require ("mongoose");

mongoose.connect (DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connect(
  `mongodb+srv://djeisly:${Djeisly}@cluster0.imdlyva.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;
