const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        nomeTarefa: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            minLenght: 0,
            maxlength: 1000,
            default: "No description"
        },
        concluido: {
            type: Boolean,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        dataInclusao: {
            type: Date,
            default: Date.now
        }
    }, {
    versionKey: false
}) 

const tarefas = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefas



