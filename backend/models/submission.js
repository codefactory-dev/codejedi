const {qDifficulties, qTypes} = require('../src/utils/seed'),
      validator = require('validator'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const submissionSchema = new Schema({
    creator: { 
        id: {
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }
    },
    title: { 
        type: String, 
        required: true 
    },
    timeElapsed: { 
        type: Number, 
        default: undefined
    },
    testcasesPassed: { 
        type: String, 
        required: true 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Submission", submissionSchema);