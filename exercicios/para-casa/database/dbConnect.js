const mongoose = require('mongoose');

const password = 'UzMYVD7HVeKFgLLE';

mongoose.connect(
  `mongodb+srv://AnnaBarbosa:Apll3012@cluster0.9bp02nj.mongodb.net/reprograma` 
);

const db = mongoose.connection;

module.exports = db;