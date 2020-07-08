const User = require('../models/user');
const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    value : { 
        type: Number, 
        required: true 
    },
    lastUpdate : { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Rating", ratingSchema);