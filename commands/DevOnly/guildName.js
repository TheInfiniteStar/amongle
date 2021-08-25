const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'guildname',
    category: 'DevOnly',
    description: 'shows guild name using id',
    execute(message, args, cmd, client, Discord){

        if(!message.author.id != '377373654746529794') return;

        if(args[0]) return;
        let guild = client.guilds.cache.get(args[0])
        

        message.channel.send(
            new MessageEmbed()
            .setDescription(`Guild name is ${guild.name} and has a member count of ${guild.memberCount}`)
        )
        
    }
}