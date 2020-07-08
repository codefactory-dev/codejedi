const QBasic = require('../models/qbasic');
const User = require('../models/user');
const mongoose = require('mongoose');


const qtrackSchema = new mongoose.Schema({
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "QBasic",
        required: true 
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    perceivedDifficulty: { 
        type: String, 
        required: true 
    },
    solved: { 
        type: Boolean, 
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    lastUpdate: { 
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model("QTrack", qtrackSchema);

