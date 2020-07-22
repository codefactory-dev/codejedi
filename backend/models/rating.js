const User = require('../models/user'),
      QBasic = require('../models/qbasic'),
      mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "QBasic", 
        required: true 
    },
    value : { 
        type: Number, 
        required: true 
    },
    lastUpdate : { 
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model("Rating", ratingSchema);