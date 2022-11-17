const mongoose = require('mongoose');

const atividadeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    
},{
    versionKey: false
})

const atividade = mongoose.model('atividade', atividadeSchema);

module.exports = atividade