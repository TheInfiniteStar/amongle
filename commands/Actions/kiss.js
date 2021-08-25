module.exports = {
    name: 'kiss',
    category: 'Action',
    description: "K-Kiss? :flushed:",
    execute(message, args, cmd, client, Discord){

        const  user = message.mentions.users.first();

        if(user){

        message.reply(`kisses ${user}`);

        message.channel.send('https://media.tenor.com/images/092020e35ca24545a3b16bd29849e211/tenor.gif');

        } else {
            message.reply("Um, who are you kissing?**awkward silence**")
        }

    }
}
