const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    id : { type : Number},
descricao: { type: String },
dataInclusao: { type: String },
concluido: { type: Boolean },
nome: { type: String },
senha:{ type: String }
    
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefa', tarefasSchema);

module.exports = tarefas

