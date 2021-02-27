const mongoose = require('mongoose');

/**
 *  This is a temporary model for testing image upload
 */
const imgSchema = new mongoose.Schema({
    data: String
});

module.exports = mongoose.model("Img", imgSchema);