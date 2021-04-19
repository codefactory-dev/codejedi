const {qDifficulties, qTypes} = require('../src/utils/seed'),
      validator = require('validator'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const submissionSchema = new Schema({
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question",
        required: true 
    },
    dateTime: { 
        type: Date, 
        required: true 
    },
    submissionCode: { 
        type: String, 
        required: true 
    },
    stdout: { 
        type: String, 
        default: undefined
    },
    stderr: { 
        type: String, 
        required: true 
    },
    error: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Submission", submissionSchema);