const mongoose = require('mongoose');

const colaboresSchema = new mongoose.Schema({
    id: { type: Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    nomeColaboradora: { type: String },
}, 
{
    versionKey: false
})

const colabs  = mongoose.model('colaboradoras', colaboresSchema);

