const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    id : { type : Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nome: { type: String },
    password: { type: String },

},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefaSchema);

module.exports = tarefas