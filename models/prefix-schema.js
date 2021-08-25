const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    Prefix: String,
})

module.exports = mongoose.model('prefixes', Schema)