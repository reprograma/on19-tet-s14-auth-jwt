
const  mongoose = require ("mongoose");
const DATABASE_MONGO = process.env.DATABASE_MONGO;

mongoose.connect(DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



//const password = 'UzMYVD7HVeKFgLLE';


//mongoose.connect(
  //`mongodb+srv://admin:${password}@cluster0.1vuycki.mongodb.net/reprograma` 
//);

const db = mongoose.connection;

module.exports = db;