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
        required: true,
        validate(value) {
            if (value < 0 || value > 5) {
                throw new Error('Value should be in range 0 to 5.');
            }
        }
    },
    lastUpdate : { 
        type: Date,
        default: Date.now 
    },
});

module.exports = mongoose.model("Rating", ratingSchema);