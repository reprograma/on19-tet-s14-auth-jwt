const mongoose = require('mongoose');

const tarefasSchema = new mongoose.Schema({
    _id : { 
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    descricao: { type: String },
    dataInclusao: { 
        type: Date,
        default: new Date
         },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String },
    password: { type: String }
    
},{
    versionKey: false
})

const tarefasModel = mongoose.model('tarefa', tarefasSchema);

module.exports = tarefasModel