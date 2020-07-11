const mongoose = require('mongoose');

/**
 *  This is a temporary model for testing image upload
 */
const imgSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
    size: Number
});

module.exports = mongoose.model("Img", imgSchema);