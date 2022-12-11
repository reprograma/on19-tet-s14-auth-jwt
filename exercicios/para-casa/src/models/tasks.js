const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    id : { type : Number},
    description: { type: String },
    inclusionDate: { type: String },
    complete: { type: Boolean },
    staffName: { type: String },
    password: {type: String}
},{
    versionKey: false
});

const tasks = mongoose.model('tasks', tasksSchema);

module.exports = tasks