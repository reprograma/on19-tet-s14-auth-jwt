const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const connect = async () => {
    try {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database is connected.`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connect
}