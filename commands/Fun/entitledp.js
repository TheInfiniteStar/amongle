const reddit = require('reddit-fetch');

module.exports = {
    name: 'entitledparents',
    aliases: ['ep', 'em'],
    category: 'Fun',
    description: 'Sends a story about entitled parents from reddit',
    execute(message, args, cmd, client, Discord){

        reddit({

            subreddit: 'entitledparents',
            sort: 'hot',
            allowNSFW: false
        }).then(post => {
            
   const title = post.title
   const content = post.selftext
   const postURL = post.url

   const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setURL(postURL)
        .setDescription(content)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.displayAvatarURL())

        message.channel.send(embed).catch(err => console.log(err));
   
        })

    }
}