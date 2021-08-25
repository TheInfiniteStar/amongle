module.exports = {
    name: "kill",
    category: 'Action',
    description: "Kills a person or are u tryna kys?",
    execute(message, args, cmd, client, Discord){

        const  user = message.mentions.users.first();

        if(user){

        message.reply(`kills ${user}`);

        message.channel.send('https://i.giphy.com/media/SRMZBxoqhEgI8/giphy.webp');

        } else {
            message.reply('Are you suiciding or what')}
        }

    
}
