const QDetail = require('../models/qdetail');
const User = require('../models/user');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const qbasicSchema = new Schema({
    detailsId: { 
        type: Schema.Types.ObjectId, 
        ref: "QDetail",
        required: true 
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
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    hasSolution: { 
        type: Boolean, 
        required: true
    },
    avgRatings: { 
        type: Schema.Types.Decimal128, 
        default: 0
    },
    nbRatings: { 
        type: Number,
        default: 0 
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