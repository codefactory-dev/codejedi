const mongoose = require('mongoose');


const qdifficultySchema = new mongoose.Schema({
    types: [String]
});

module.exports = mongoose.model("QDifficulty", qdifficultySchema);