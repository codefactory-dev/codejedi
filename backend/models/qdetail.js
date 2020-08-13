const Question = require('./question');
const Rating = require('../models/rating');
const Comment = require('../models/comment');
const mongoose = require('mongoose');


const qdetailSchema = new mongoose.Schema({
    basicsId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question",
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    solution: {
        type: String,
        default: undefined
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    ratingIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rating"
    }],
    commentIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }]
});

module.exports = mongoose.model("QDetail", qdetailSchema);