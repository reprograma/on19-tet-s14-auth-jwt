const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    id : { type : Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
},{
    versionKey: false
})

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas