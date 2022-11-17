const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI

mongoose.connect(uri);

const db = mongoose.connection;

module.exports = db;