const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: { type: String, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 60 * 60 * 24 } //expires in 24h
});

module.exports = mongoose.model('Token',tokenSchema)