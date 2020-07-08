const mongoose = require('mongoose');


const qtypeSchema = new mongoose.Schema({
    types: [String]
});

module.exports = mongoose.model("QType", qtypeSchema);