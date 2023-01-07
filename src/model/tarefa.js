const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id : { type : Number},
    descriptiom: { type: String },
    inclusionDate: { type: String },
    done: { type: Boolean },
    name: { type: String },
    password: { type: String },
    
},{
    versionKey: false
})

const task = mongoose.model('task', taskSchema);

module.exports = task