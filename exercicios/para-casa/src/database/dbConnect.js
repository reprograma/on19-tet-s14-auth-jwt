const DATABASE_MONGO = process.env.DATABASE_MONGO

const mongoose = require('mongoose');


mongoose.connect(DATABASE_MONGO,
    { useNewUrlParser: true, useUnifiedTopology: true, })
console.log('Database connect')



const db = mongoose.connection;

module.exports = db;