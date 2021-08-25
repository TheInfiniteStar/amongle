module.exports = {
    name: 'nuke',
    category: 'Moderation',
    cooldown: 0,
    description: 'Deletes all messages by recreating the channel',
    async execute(message, args, cmd, client, Discord){
        if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("I don't have the permission to do that 😔")
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send('Normies can\'t do that');
        const nukeimg = new Discord.MessageAttachment(`./Extras/attachments/nuke.png`)
        const aftermath = new Discord.MessageAttachment(`./Extras/attachments/sadnuke.png`)
        const oldParent = message.channel.parent;
        const oldPosition = message.channel.position;
        message.channel.send('Nuke drop in')
        let index = 5;
       
        const countdown =  setInterval(async() => {
            message.channel.send(`${index--}`)
            if(index <= 0) {
                clearInterval(countdown)
                 message.channel.send(nukeimg)
           .then(message.channel.clone().then((ch) => {

            ch.setParent(oldParent);
            ch.setPosition(oldPosition, true);
       
          ch.send(aftermath)
            ch.send("**Channel has been nuked**")
        }))
                   } ;
        }, 1000)

        setTimeout(function() {message.channel.delete()}, 9000)



       
    }
}