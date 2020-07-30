const Comment = require('../models/comment');
const Rating = require('../models/rating');
const QTrack = require('../models/qtrack');
const QBasic = require('../models/qbasic');
const mongoose = require('mongoose');


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
        required: true
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
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
        required: true
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
        ref: "QBasic"
    }],
    qTrackIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "QTrack"
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
    }
});

module.exports = mongoose.model("User", userSchema);