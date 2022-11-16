const DATABASE_URI = process.env.DATABASE_URI;
const mongoose = require ("mongoose");

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


module.exports = db;