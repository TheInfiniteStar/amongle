const welcomeSchema = require("../../models/welcome-schema");
const Discord = require('discord.js');
const moment = require('moment');

module.exports = (Discord, client, member) => {

    welcomeSchema.findOne({ GuildID: member.guild.id }, async (err, data) =>{
        if(!data) return;

        const newMemberEmbed = new Discord.MessageEmbed()
    .setTitle(`Here is what I found about the kid`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField(`Username and tag:`, `${member.user.tag}` )
    .addField(`User ID:`, `${member.id}`)
    .addField('Account created:', moment(`${member.user.createdAt}`).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    .addField('Joined the server at:', moment(`${member.joinedAt}`).format("dddd, MMMM Do YYYY, h:mm:ss a"))
    .addField(`User status:`, `${member.presence.status}`)
    .setColor('5E61AB')

    const channel = member.guild.channels.cache.get(data.ChannelID);

  channel.send(newMemberEmbed).catch(err =>  console.log(err));

    })  
 }

