<<<<<<< HEAD
const DATABASE_MONGO = process.env.DATABASE_MONGO
const mongoose = require ("mongoose");

mongoose.connect (DATABASE_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
=======
const mongoose = require('mongoose');

const password = 'UzMYVD7HVeKFgLLE';
>>>>>>> main

mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.1vuycki.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;