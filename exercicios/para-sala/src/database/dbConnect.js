const mongoose = require('mongoose')
const DATABASE_MONGO = process.env.DATABASE_MONGO

const db = async () => {
    try {
        await mongoose.connect(DATABASE_MONGO,{
            useNewUrlParser: true,
            
            useUnifiedTopology: true
        })
        console.log("Banco conectado :)")
    } catch (error) {
        console.log("Erro: ", error.message)
    }
}

module.exports = {
    db
}




/*const DATABASE_MONGO = process.env.DATABASE_MONGO
const mongoose = require ("mongoose");

mongoose.connect (DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.1vuycki.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;*/








/*const mongoose = require('mongoose');

const password = 'UzMYVD7HVeKFgLLE';

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.1vuycki.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;*/