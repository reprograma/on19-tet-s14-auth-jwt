const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema(
    {
        _id : { 
            type : mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        descricao: { type: String },
        dataInclusao: { type: String },
        concluido: { type: Boolean, required: true },
        nomeColaboradora: { type: String, required: true },
        senha: { type: String, required: true }
    },
    {timestamp : true},
)

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas