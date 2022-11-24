const mongoose = require('mongoose');

const password = 'Bigbig199322';

mongoose.connect(
  `mongodb+srv://admin:${Bigbig199322}@cluster0.1vuycki.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;