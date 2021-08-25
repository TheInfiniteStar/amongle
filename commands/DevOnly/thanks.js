const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'thanks',
    category: 'DevOnly',
    description: 'thanks guys',
    execute(message, args, cmd, client, Discord){

        if(message.author.id != '377373654746529794') return;
        const channelName = []

        const thanksEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Thank you!")
        .setDescription("Today is July 10th 2021 (my time). It's been exactly 1 year since Asuna was made. I want to say thank you to all of you for helping me develop her and making her a better bot. I also want to thank you for adding her into your server! I appreciate each and every one of you from the bottom of my heart. Once again, thank you.\n\nFrom,\nDune")
        .setFooter("P.S. Sorry if this gets sent to more than 1 channel/times lol. Had to do this somehow.")

        for(i = 0; i < channelName.length; ++i){
            client.guilds.cache.forEach(g => {

           g.channels.cache.forEach(channel => {
                
                if(channel.name.includes(channelName[i])) {channel.send(thanksEmbed)}

               })  
            })
           
        }
        
    }
}