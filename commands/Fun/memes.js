const Discord = require("discord.js")
 

module.exports = {
    name: 'memes',
    aliases: ['meme'],
    category: 'Fun',
    description: "Send EPIC MEMES from reddit",
    execute(message, args, cmd, client, Discord){
       
        const got = require('got');

        const embed = new Discord.MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
    
            embed.setTitle(`${memeTitle}`)
            embed.setURL(`${memeUrl}`)
            embed.setImage(memeImage)
            embed.setColor('RANDOM')

            message.channel.send(embed);
        })
    }
}