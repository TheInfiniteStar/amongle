const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    Message: String,
})

module.exports = mongoose.model('dmBanMessages', Schema)