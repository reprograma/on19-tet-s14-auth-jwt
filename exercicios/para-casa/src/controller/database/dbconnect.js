const mongoose = require('mongoose');

const password = "";

mongoose.connect(
  `mongodb+srv://KarolineAmaral:${karoline9954}@cluster0.c9kcfiu.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;
