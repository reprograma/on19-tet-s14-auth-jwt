const mongoose = require('mongoose');

const colaboradorasSchema = new mongoose.Schema({
    id : { type : Number},
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String },
    password: { type: String }
    
},{
    versionKey: false
})

const colaboradoras = mongoose.model('colaboradoras', colaboradorasSchema);

module.exports = colaboradoras