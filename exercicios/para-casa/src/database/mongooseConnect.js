const mongoose = require('mongoose');

const url = process.env.DATABASE_URI
mongoose.connect(url);

const db = mongoose.connection;

module.exports = db;
