const mongoose = require('mongoose');

const User = mongoose.model('User',{
    
    _id: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }

    
})

module.exports = User