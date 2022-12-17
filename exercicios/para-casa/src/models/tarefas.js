const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    id : { type : String}, 
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String },
    senha: { type: String }
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas