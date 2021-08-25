const { MessageButton } = require('discord-buttons');
const Schema = require('../../models/ticket-schema');

module.exports = {
    name: 'ticket-setup',
    aliases: ['close'],
    category: 'Miscellaneous',
    description: 'Makes a ticket embed',
    async execute(message, args, cmd, client, Discord) {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("Normies can't do this command")

        if (cmd == 'close') {
            if (!message.channel.name.includes('ticket-')) return message.channel.send('You cannot use that here!');
            try {
                message.channel.delete();
            } catch (err) {
                console.log(err)
            }
        }





        if (cmd == 'ticket-setup') {
            let title;
            let desc;
            let ticketMsg = [];

            const filter = msg => msg.author.id == message.author.id;
            let options = {
                max: 1
            };

            message.channel.send("What will the ticket title be?\nSay cancel to cancel")
            let col = await message.channel.awaitMessages(filter, options)
            if (col.first().content == 'cancel') return message.channel.send("Cancelled");
            title = col.first().content

            message.channel.send('What will the description be?\nSay cancel to cancel')
            let col2 = await message.channel.awaitMessages(filter, options)
            if (col2.first().content == 'cancel') return message.channel.send("Cancelled");
            desc = col2.first().content

            message.channel.send('What is the message that the user will see when they make a ticket?\nSay cancel to cancel')
            let col3 = await message.channel.awaitMessages(filter, options)
            if (col3.first().content == 'cancel') return message.channel.send("Cancelled");
            ticketMsg = col3.first().content

            Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
                if (data) {
                    data.ticketMsg = ticketMsg;
                    data.save();
                } else {
                    new Schema({
                        GuildID: message.guild.id,
                        ticketMsg: ticketMsg
                    }).save();
                }
            })

            // const hiEmbed = new Discord.MessageEmbed()
            // .addField(ticketMsg, "\n\nDo a.close or press the button to close the ticket")
            // .setColor("RANDOM")
            // .setTimestamp()

            // module.exports.hiEmbed = hiEmbed;

            const setupEmbed = new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription(desc)
                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                .setColor('00f8ff')

            const createTicketButton = new MessageButton()
                .setID("ticketCreate")
                .setStyle("blurple")
                .setLabel("📨");

            const closeTicketButton = new MessageButton()
                .setID("ticketClose")
                .setLabel("Close ticket")
                .setStyle("red");
            message.channel.send({ embed: setupEmbed, button: createTicketButton })
        }

    }
}
