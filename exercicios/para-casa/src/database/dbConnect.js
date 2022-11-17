const mongoose = require('mongoose')
const DATABASE_MONGO = process.env.DATABASE_MONGO

const db = async () => {
    try {
        await mongoose.connect(DATABASE_MONGO,{
            useNewUrlParser: true,
            
            useUnifiedTopology: true
        })
        console.log("Banco conectado :)")
    } catch (error) {
        console.log("Erro: ", error.message)
    }
}

module.exports = {
    db
}
