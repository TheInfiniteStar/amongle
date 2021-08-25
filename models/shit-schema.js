const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    ID: String,
})

module.exports = mongoose.model('Noobs', Schema)