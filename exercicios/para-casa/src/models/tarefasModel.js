const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    id : { type : Number},
    name: { type: String},
    descricao: { type: String},
    dataInclusao: { type: String},
    concluido: { type: String},
    lotacao:{type: String},
    funcao:{type:String},
    password: { type: String},   
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefaSchema);

module.exports = tarefas;
