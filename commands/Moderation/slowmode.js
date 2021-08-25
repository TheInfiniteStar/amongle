module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    category: 'Moderation',
    description: 'Sets slowmode of a channel',
    execute(message, args, cmd, client, Discord){

        if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("I don't have the permission to do that 😔");
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("Normies can't do this command");
        
        let time = args[0]  
       
        if(!time) return message.reply("Please provide a time in seconds")
        if(isNaN(time)) return message.reply("Please provide a valid number")
       
        message.channel.setRateLimitPerUser(time, 'No reason')
    
        message.channel.send(`Successfully set the slowmode on this channel to **${time}** seconds`)
    
    
    }
}