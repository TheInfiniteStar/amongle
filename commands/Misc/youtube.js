module.exports = {
    name: 'youtube',
    aliasaes: ['yt'],
    category: 'Miscellaneous',
    description: "sends dune yt",
    execute(message, args, cmd, client, Discord){
        message.channel.send('https://www.youtube.com/channel/UCNXDu4rROvN8r25c2TMAoCw');
    }
}