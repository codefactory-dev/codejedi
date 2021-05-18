const Comment = require('../models/comment'),
      Rating = require('../models/rating'),
      QTrack = require('../models/qtrack'),
      Question = require('./question'),
      mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      validator = require('validator'),
      bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    // joinDate: {
    //     type: Date,
    //     default: Date.now
    // },
    profileImage: {
        type: Buffer,
        default: undefined
    },
    profileVisibility: {
        type: Boolean,
        default: false,
    },
    validated: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    ratingIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Rating",
    }],
    commentIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
    }],
    questionIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question"
    }],
    qTrackIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "QTrack"
    }],
    submissionIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Submission",
        required: true,
        default: []
    }],
    qTrackSummary: {
        nbTracks: {
            type: Number,
            default: 0
        },
        nbTracksPerType: {
            type: Map,
            of: Number,
            required: true
        },
        avgDuration: {
            type: Number,
            default: 0
        },
        avgDurationPerType: {
            type: Map,
            of: Number,
            required: true
        },
        nbPDifficultyPerType: {
            type: Map,
            of: Number,
            required: true
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;


    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 
                           process.env.JWT_SECRET, 
                           { expiresIn: 60 * 60 * 24})  //expires in 24h

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.methods.generateValidationToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString(), validated: true }, 
                           process.env.JWT_SECRET,
                           { expiresIn: 60 * 60 * 24})  //expires in 24h
 
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

/** 
    Method to add a new qtrack and update related fields
    @param  {number} duration - newly added qtrack db document
    @param  {number} question - qtrack's question db document
    @return {User} updated user
*/
userSchema.methods.addQtrack = async function (qtrack, question) {
    const user = this;

    user.qTrackIds.push(qtrack._id);

    const prevAvgDuration = user.qTrackSummary.avgDuration || 0;
    const prevNbQtracks = user.qTrackSummary.nbTracks || 0;
    user.qTrackSummary.avgDuration = ((prevAvgDuration*prevNbQtracks) + qtrack.duration) / (prevNbQtracks+1);

    const prevNbPerType = user.qTrackSummary.nbTracksPerType.get(question.type) || 0;
    const prevAvgPerType = user.qTrackSummary.avgDurationPerType.get(question.type) || 0;
    const avgPerType = ((prevAvgPerType*prevNbPerType) + qtrack.duration) / (prevNbPerType+1);
    user.qTrackSummary.avgDurationPerType.set(question.type, avgPerType);
    
    
    const nbPerType = user.qTrackSummary.nbTracksPerType.get(question.type) || 0;
    const nbPDifficultyPerType = user.qTrackSummary.nbPDifficultyPerType.get(qtrack.perceivedDifficulty) || 0;
    user.qTrackSummary.nbTracks += 1;
    user.qTrackSummary.nbTracksPerType.set(question.type, nbPerType+1);
    user.qTrackSummary.nbPDifficultyPerType.set(qtrack.perceivedDifficulty, nbPDifficultyPerType+1);

    await user.save();

    return user;
}

/** 
    Method to update qtrack's related fields
    @param  {QTrack} prevtrack - prev qtrack db document
    @param  {QTrack} track     - newly added qtrack db document
    @param  {Question} question  - qtrack's question db document
    @return {User} updated user
*/
userSchema.methods.updateQtrack = async function (prevtrack, track, question) {
    const user = this;

    if (prevtrack.duration !== track.duration){
        const prevAvgDuration = user.qTrackSummary.avgDuration || 0;
        const prevNbQtracks = user.qTrackSummary.nbTracks || 0;
        user.qTrackSummary.avgDuration = ((prevAvgDuration*prevNbQtracks) + (track.duration - prevtrack.duration)) / (prevNbQtracks);
    
        const prevNbPerType = user.qTrackSummary.nbTracksPerType.get(question.type) || 0;
        const prevAvgPerType = user.qTrackSummary.avgDurationPerType.get(question.type) || 0;
        const avgPerType = ((prevAvgPerType*prevNbPerType) + (track.duration - prevtrack.duration)) / (prevNbPerType);
        user.qTrackSummary.avgDurationPerType.set(question.type, avgPerType);
    }
    
    if (prevtrack.perceivedDifficulty !== track.perceivedDifficulty) {
        let nbPDifficultyPerType = user.qTrackSummary.nbPDifficultyPerType.get(prevtrack.perceivedDifficulty) || 0;
        user.qTrackSummary.nbPDifficultyPerType.set(prevtrack.perceivedDifficulty, nbPDifficultyPerType-1);

        nbPDifficultyPerType = user.qTrackSummary.nbPDifficultyPerType.get(track.perceivedDifficulty) || 0;
        user.qTrackSummary.nbPDifficultyPerType.set(track.perceivedDifficulty, nbPDifficultyPerType+1);
    }

    await user.save();

    return user;
}


/** 
    Method to remove a qtrack and update related fields
    @param  {QTrack} qtrack - newly deleted qtrack db document
    @param  {Question} question - qtrack's question db document
    @return {User} updated user
*/
userSchema.methods.deleteQtrack = async function (qtrack, question) {
    const user = this;

    user.qTrackIds = user.qTrackIds.filter(qid => !qid.equals(qtrack._id));

    const prevAvgDuration = user.qTrackSummary.avgDuration || 0;
    const prevNbQtracks = user.qTrackSummary.nbTracks || 0;
    user.qTrackSummary.avgDuration = prevNbQtracks == 1 ? 0 : ((prevAvgDuration*prevNbQtracks) - qtrack.duration) / (prevNbQtracks-1);

    const prevNbPerType = user.qTrackSummary.nbTracksPerType.get(question.type) || 0;
    const prevAvgPerType = user.qTrackSummary.avgDurationPerType.get(question.type) || 0;
    const avgPerType = prevNbPerType == 1 ? 0 : ((prevAvgPerType*prevNbPerType) - qtrack.duration) / (prevNbPerType-1);
    user.qTrackSummary.avgDurationPerType.set(question.type, avgPerType);
    
    
    const nbPerType = user.qTrackSummary.nbTracksPerType.get(question.type) || 0;
    const nbPDifficultyPerType = user.qTrackSummary.nbPDifficultyPerType.get(qtrack.perceivedDifficulty) || 0;
    user.qTrackSummary.nbTracks -= 1;
    user.qTrackSummary.nbTracksPerType.set(question.type, nbPerType-1);
    user.qTrackSummary.nbPDifficultyPerType.set(qtrack.perceivedDifficulty, nbPDifficultyPerType-1);

    await user.save();

    return user;
}

const User = mongoose.model('User', userSchema)
module.exports = User