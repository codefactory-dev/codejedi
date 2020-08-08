const {qDifficulties} = require('../src/utils/seed'),
      validator = require('validator'),
      mongoose = require('mongoose');


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
        required: true,
        validate(value) {
            if(!validator.isIn(value, qDifficulties)) {
                throw new Error('Invalid question difficulty level');
            }
        }
    },
    solved: { 
        type: Boolean, 
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0
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

