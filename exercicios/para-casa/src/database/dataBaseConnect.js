const mongoose = require("mongoose");
const MONGO_DATABASE = process.env.MONGO_DATABASE

mongoose.connect(MONGO_DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const dataBase = mongoose.connection ;

module.exports = dataBase ;