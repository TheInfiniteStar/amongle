const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms');
const fs = require('fs');
const mongoose = require('mongoose');
const moment = require('moment');

client.brain = require('./Extras/chatSend')
require('discord-buttons')(client)
require('discord-reply')

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect('mongodb+srv://Dune:adamis07@asuna.uwntr.mongodb.net/Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(()=> {
    console.log('Connected to the database');
})
.catch((err) =>{
    console.log(err);
});





client.login('NzMxMDg0NTc5MjA0NjI4NTMw.Xwg5kg.xsd2A3v5DyKlgeMZXgtKwWnzUrk');

