const mongoose = require('mongoose');

/**
 *  This is a temporary model for testing rich-text editor
 */
const editorSchema = new mongoose.Schema({
    description: String
});

module.exports = mongoose.model("Editor", editorSchema);