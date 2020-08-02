const {qDifficulties, qTypes} = require('../src/utils/seed'),
      validator = require('validator'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const qbasicSchema = new Schema({
    detailsId: { 
        type: Schema.Types.ObjectId, 
        ref: "QDetail",
    },
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
        joinDate: {
            type: Date,
            required: true
        }
    },
    title: { 
        type: String, 
        required: true 
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
    hasSolution: { 
        type: Boolean, 
        required: true
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
    lastUpdate: { 
        type: Date,
        default: Date.now 
    },
    lastCommentDescription: { 
        type: String, 
        default: undefined
    },
});

module.exports = mongoose.model("QBasic", qbasicSchema);