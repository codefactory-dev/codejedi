const mongoose = require('mongoose');

/**
 *  This is a temporary model for testing code storage
 */
const codeSchema = new mongoose.Schema({
    mode: String,
    text: String
});

module.exports = mongoose.model("Code", codeSchema);