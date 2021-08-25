const Discord = require('discord.js');
const Schema = require('../../models/welcome-schema')

module.exports = {
    name: 'setwelcome',
    aliases: ['setwc'],
    category: 'Customizables',
    description: "sets a channel where asuna will send userinfo upon joining",
    async execute(message, args, cmd, client, Discord){
           
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply('You are not allowed to this');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please specify a channel you would like me to send their info at.');

        Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data){
             data.ChannelID = channel.id;
             data.save();
            } else{
                new Schema({
                    GuildID: message.guild.id,
                    ChannelID: channel.id
                }).save();
            }
              await message.reply(`${channel} is now set as autoinfo channel!`)  
        })
    }
}