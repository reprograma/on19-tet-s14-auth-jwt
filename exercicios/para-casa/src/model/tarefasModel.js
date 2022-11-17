const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    
    id : {type :String},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nome: { type: String },
    email: {type: String },
    password: { type: String}

},{
    versionKey: false
})

const Model = mongoose.model('tarefa', tarefasSchema);

module.exports = Model