const Discord = require('discord.js')

module.exports = {
    name: 'help',
    category: 'Info', 
    description: "Sends commands list",
    execute(message, args, cmd, client, Discord){
     
        const userEmbed = new Discord.MessageEmbed()
        .setTitle('Asuna Commands List')
        .setDescription('Asuna is still WIP. If you have suggestions or want to report a bug, use the feedback command. For more info on what a command does, do a.info')
        .addField('Information', 'userinfo, members, avatar, info, ping')
        .addField('Fun','bruh, yes, memes, dumb, chat, freerobux, tea, roll, image, ep, pickupline, ytsearch')
        .addField('Music', 'play, skip, disconnect, queue, loop, loopqueue, lyrics')
        .addField('Actions', 'kiss, sorry, kill, hug, shut')
        .addField('Moderation', 'obli, slap, clear, nuke, slowmode, ticket-setup')
        .addField('Customizables', 'setwelcome, setbanmsg, setprefix, command')
        .addField('Misc', 'youtube, feedback, invite')
        .setFooter('Made by Dune#1481')
        .setColor('#b965e2')
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.author.send(userEmbed).catch(err =>  console.log(err));
        message.channel.send('Check DM\'s')


    }
  }
