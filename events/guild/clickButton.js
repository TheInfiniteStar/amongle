const { MessageButton } = require('discord-buttons');
const hiSchema = require('../../models/ticket-schema')
const talkedRecently = new Set()

module.exports = async (Discord, client, button) =>{

    hiSchema.findOne({ GuildID: button.guild.id }, async (err, data) =>{

        const hiEmbed = new Discord.MessageEmbed()
        .addField(data.ticketMsg, "\n\nDo a.close or press the button to close the ticket")
        .setColor("RANDOM")
        .setTimestamp()
    
        const createTicketButton = new MessageButton()
        .setID("ticketCreate")
        .setStyle("blurple")
        .setLabel("📨");
    
        const closeTicketButton = new MessageButton()
        .setID("ticketClose")
        .setLabel("Close ticket")
        .setStyle("red");
    
       await button.clicker.fetch()
       button.reply.defer()
       const user = button.clicker.user

     if (button.id === 'ticketCreate') {
         if(talkedRecently.has(user.id)){
            button.reply.send('You must wait at least 10 minutes before making another ticket!', true)
         } else{
       button.guild.channels.create(`ticket-${user.id}`,  {
         permissionOverwrites: [
          {
           id: user.id,
           allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
           id: button.message.guild.roles.everyone,
           deny: ['VIEW_CHANNEL'],
          },
         ],
         type: 'text',
        }).then(async (channel) => {
            channel.send({embed: hiEmbed, button: closeTicketButton })
        })
        talkedRecently.add(user.id);
        setTimeout(() => {
            talkedRecently.delete(user.id);
          }, 60000);
    }
     } else if(button.id == 'ticketClose'){
         button.message.channel.delete()
     } else if(button.id == 'clearSet'){
         talkedRecently.clear()
         button.channel.send("Set cleared")
     }

    })
    
}