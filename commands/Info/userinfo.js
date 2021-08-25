let moment = require('moment');
let { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'userinfo',
    aliases: ['stalk', 'whois'],
    category: 'Info',
    description: "Gets user info",
    execute(message, args, cmd, client, Discord){


        let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let mentionedUser = message.mentions.users.first() || client.users.cache.get(args[0]);
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        
        if(!args[0])  {mentionedUser = message.author; mentionedMember = message.member; user = message.author}
        if(!mentionedMember) return message.channel.send(new MessageEmbed()
             .setDescription('I couldn\'t find that member') .setColor("RED"))

        const userEmbed = new Discord.MessageEmbed()
        .setTitle(`Here is what I found about the kid`)
        .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
        .addField('Username and tag:', `${user.tag}`)
        .addField('User ID:', `${mentionedUser.id}`)
        .addField('Account created:', moment(`${mentionedUser.createdAt}`).format("dddd, MMMM Do YYYY, h:mm:ss a"))
        .addField('Joined the server at:', moment(`${mentionedMember.joinedAt}`).format("dddd, MMMM Do YYYY, h:mm:ss a"))
        .addField('User status:', `${mentionedUser.presence.status}`)
        .setColor('5E61AB')

        message.channel.send(userEmbed).catch(err =>  console.log(err));


       
    }


}
