const Discord = require('discord.js');
const Schema = require('../../models/dmBanMember-schema')

module.exports = {
    name: 'setbanmsg',
    category: 'Customizables',
    aliases: [],
    description: "Sets a dm message that sends when a member gets banned",
    async execute(message, args, cmd, client, Discord){
  
         if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply('You are not allowed to this');

        const dmMessage = args.join(" ");
        if(!dmMessage) return message.reply('Please say the message that you want to send to the banned member.');

        Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data){
             data.Message = dmMessage;
             data.save();
            } else{
                new Schema({
                    GuildID: message.guild.id,
                    Message: dmMessage
                }).save();
            }
              await message.reply(`**${dmMessage}** is now set as your DM ban message!`)  
        })
    }
}