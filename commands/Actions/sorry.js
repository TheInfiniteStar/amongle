module.exports = {
    name: 'sorry',
    category: 'Action',
    description: "Do this if you are sorry",
    execute(message, args, cmd, client, Discord){
        message.channel.send('https://media.tenor.com/images/d8b3aca81672d767bae8f06338dc2cdd/tenor.gif');
    }
}