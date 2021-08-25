module.exports = {
    name: 'shut',
    category: 'Action',
    description: "Asks the person to stfu or you can stfu",
    execute(message, args, cmd, client, Discord){

        const  user = message.mentions.users.first();
        
        if(user){

        message.channel.send(`Shut the fuck up ${user}`);
               
        } else {
            message.reply("Why don't you shut up?")}
    
    }
}