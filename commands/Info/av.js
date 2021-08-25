const Discord = require("discord.js");

module.exports = {
    name: 'av',
    aliases: ['avatar'],
    category: 'Info',
    description: "Sends users or your avatar",
    execute(message, args, cmd, client, Discord){
        const user = message.mentions.users.first() || message.author;

         const newEmbed = new Discord.MessageEmbed()
         .setColor('3C819F')
        .setAuthor(user.tag)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 256}));

         message.channel.send(newEmbed);


    }


}
