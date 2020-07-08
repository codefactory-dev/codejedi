const QDetail = require('../models/qdetail');
const User = require('../models/user');
const mongoose = require('mongoose');


const qbasicSchema = new mongoose.Schema({
    detailsId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "QDetail",
        required: true 
    },
    creator: { 
        id: {
            type: mongoose.Schema.Types.ObjectId, 
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
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    hasSolution: { 
        type: Boolean, 
        required: true,
        default: false 
    },
    avgRatings: { 
        type: mongoose.Types.Decimal128, 
        required: true,
        default: 0.0
    },
    nbRatings: { 
        type: Number, 
        required: true,
        default: 0 
    },
    lastUpdate: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    lastCommentDescription: { 
        type: String, 
        required: true 
    },
});

module.exports = mongoose.model("QBasic", qbasicSchema);