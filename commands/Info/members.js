const Discord = require("discord.js");

module.exports = {
    name: 'members',
    aliases: ['membercount'],
    category: 'Info',
    description: "Shows amount of members",
     execute(message, args, cmd, client, Discord){

        const guild = message.guild.id

        const memberCount = message.guild.memberCount;
       
        const embed = new Discord.MessageEmbed()
        .setTitle('Total Members:')
        .addField(`${memberCount.toLocaleString()}`, "That's a sus amount")
        .setColor('RANDOM');

        message.channel.send(embed)
        
        

    }
}