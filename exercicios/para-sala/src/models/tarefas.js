const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({

    descricao: {
        type: String
    },
    dataInclusao: {
        type: String
    },
    concluido: {
        type: Boolean
    },
    nomeColaboradora: {
        type: String
    }

})

const tarefa = mongoose.model('tarefa', tarefaSchema);

module.exports = tarefa