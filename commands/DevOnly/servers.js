const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'servers',
    category: 'DevOnly',
    description: 'Shows the list of servers that asuna is in',
    execute(message, args, cmd, client, Discord){
        if(message.author.id != '377373654746529794') return;     
        let servers = `Asuna is in ${client.guilds.cache.size} servers\n\n`
        let index = 1;      
            client.guilds.cache.forEach((guild) => {
                servers += `**${index++}**. \`${guild.name}\` | \`${guild.memberCount}\` members\n\n`;
               
            });
        
        message.author.send(
            new MessageEmbed()
            .setTitle(`How many servers Asuna is in:`)
            .setDescription(servers)
            .setTimestamp()
            .setColor("RANDOM")
        )   
    }
}