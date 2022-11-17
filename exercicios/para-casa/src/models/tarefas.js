const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    descricao: {
        type: String,
        required: true
    },
    dataInclusao: { type: Date },
    concluido: { type: Boolean },
    nomeColaboradora: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas