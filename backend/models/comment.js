const Question = require('./question');
const User = require('../models/user');
const mongoose = require('mongoose');

//COMMENT    PREFIX: /users/:uid/questions/:qid 


const commentSchema = new mongoose.Schema({
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question",
        required: true 
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    reply: {
        creatorId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            default: undefined
        },
        description: { 
            type: String,
            default: undefined
        },
        creationDate: {
            type: Date,
            default: undefined
        },
        lastUpdate: {
            type: Date,
            default: undefined
        },
    }
},{
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);