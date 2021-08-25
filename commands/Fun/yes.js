module.exports = {
    name: 'yes',
    category: 'Fun',
    description: "yes",
    execute(message, args, cmd, client, Discord){
        message.channel.send('yes yes');
    }
}