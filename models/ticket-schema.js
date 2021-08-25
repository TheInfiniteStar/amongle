const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    GuildID: String,
    ticketMsg: String,
})

module.exports = mongoose.model('ticketMsgs', Schema)