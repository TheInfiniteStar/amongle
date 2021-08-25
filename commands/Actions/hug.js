module.exports = {
    name: 'hug',
    category: 'Action',
    description: "Let me hug you yeah",
    execute(message, args, cmd, client, Discord){

        const  user = message.mentions.users.first();
        
        if(user){

        message.reply(`hugs ${user}`);
        
        message.channel.send('https://media1.tenor.com/images/5e04724718a190c63823fb2af637be55/tenor.gif?itemid=12669911');
        
        } else {
            message.reply('Why are you hugging yourself?')}
    
    }
}
