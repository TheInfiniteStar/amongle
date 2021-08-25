const Discord = require('discord.js')

module.exports = {
    name: 'feedback',
    category: 'Miscellaneous',
    description: 'Use this command if you want to give a suggestion or report a bug',
    execute (message, args, cmd, client, Discord){

        if(!args[0]) return message.reply("please add a reason to feedback!")
        const feedback = args.join(" ");
        message.reply(`Thanks for the feedback!👍👌`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) Feedback:`)
        .setDescription(`${feedback}`)
        .setThumbnail(message.author.displayAvatarURL())
        .addField("On the server:", `${message.guild.name}`)
        .addField("Server ID:", `${message.guild.id}`)
        .setColor("#4689ab")

        client.channels.cache.get("852239686340444210").send(embed)
    }
}