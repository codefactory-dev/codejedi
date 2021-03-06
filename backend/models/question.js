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
        default: true
    },
    languageType: {
        type: String,
        required: true
    },
    returnType: {
        type: String,
        required: true
    },
    solutionName: {
        type: String,
        required: true
    },
    testcases: {
        type: Array,
        default: []
    },
    parameters: {
        type: Array,
        default: []
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
    }],
    submissionIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Submission",
        required: true,
        default: []
    }],
}, {
    timestamps: true
});

// -------------------------------------------------------------------
// METHODS
// -------------------------------------------------------------------

/** 
    Function to add a new rating
    
    @param  {Rating} newRating - newly added rating 

*/
questionSchema.methods.addRating = async function (rating) {
    const question = this;
    
    const prevAvgRating = question.avgRatings || 0;
    const prevNbRating = question.nbRatings || 0;
    question.avgRatings = ((prevAvgRating*prevNbRating) + rating.value) / (prevNbRating+1);

    question.nbRatings++;
    question.ratingIds.push(rating._id);
    await question.save();
}

/** 
    Function to calculate the average rating given a newly updated rating

    @param  {number} prevValue - previous rating's value 
    @param  {number} newValue - newly added rating's value 

*/
questionSchema.methods.updateAvgRating = async function (prevValue, newValue) {
    const question = this;

    const prevAvgRating = question.avgRatings;
    question.avgRatings = ((prevAvgRating * question.nbRatings) + (newValue - prevValue)) / question.nbRatings;

    await question.save();
}

module.exports = mongoose.model("Question", questionSchema);