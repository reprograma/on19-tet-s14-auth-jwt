const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        nameTask:{
            type: String,
            required: true
        },
        description:{
            type: String,
            minLenght: 0,
            maxlength: 1000,
            default: "No description"
        },
        completed:{
            type: Boolean,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
             type: Date, 
             default: Date.now 
        } 
    },{
        versionKey: false
    }) 

const task = mongoose.model("Task", taskSchema);

module.exports =  task