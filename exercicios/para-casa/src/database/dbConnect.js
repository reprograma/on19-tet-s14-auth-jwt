const mongoose = require('mongoose');

const password = '212121po';

mongoose.connect(
  `mongodb+srv://GreiceGiacomelli:${password}@cluster0.qnn0qph.mongodb.net/?retryWrites=true&w=majority/reprograma` 
);

const db = mongoose.connection;

module.exports = db;