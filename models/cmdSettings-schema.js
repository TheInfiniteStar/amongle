const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
    Cmds: Array,
})

module.exports = mongoose.model('cmdSettings', Schema)