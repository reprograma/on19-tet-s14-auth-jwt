const mongoose = require('mongoose')

const contributorSchema = new mongoose.Schema(
    {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        nameContributor:{
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
        email: {
            type: String,
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

const contributor = mongoose.model("Contributor", contributorSchema);

module.exports =  contributor