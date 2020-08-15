const {qDifficulties, qTypes} = require('../src/utils/seed'),
      validator = require('validator'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const questionSchema = new Schema({
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
    description: { 
        type: String, 
        required: true 
    },
    solution: {
        type: String,
        default: undefined
    },
    difficulty: { 
        type: String, 
        required: true,
        validate(value) {
            if(!validator.isIn(value, qDifficulties)) {
                throw new Error('Invalid question difficulty level');
            }
        }
    },
    type: { 
        type: String, 
        required: true,
        validate(value) {
            if(!validator.isIn(value, qTypes)) {
                throw new Error('Invalid question type');
            }
        }
    },
    avgRatings: { 
        type: Schema.Types.Decimal128, 
        default: 0,
        min: 0,
        max: 5
    },
    nbRatings: { 
        type: Number,
        default: 0,
        min: 0
    },
    ratingIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rating"
    }],
    commentIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Question", questionSchema);