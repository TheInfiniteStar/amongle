const Schema = require('../../models/cmdSettings-schema')

module.exports = {
    name: 'command',
    category: 'Customizables',
    description: 'Configure the bots behaviour',
    execute(message, args, cmd, client, Discord){

        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply("Normies can't do that command");
        let bool = args[0];
        let c = args.slice(1).join(" ");
        if(!bool) {
            const cembed = new Discord.MessageEmbed()
            .setTitle("Command Usage:")
            .setColor('RANDOM')
            .setDescription("command enable/disable [command name]");
            message.channel.send(cembed)
        }
        if(message.content.includes('enable')) {
            if(!!client.commands.get(c) === false) return message.channel.send("That command doesn't exist! What you on about?");
            Schema.findOne({ GuildID: message.guild.id, ChannelID: message.channel.id }, async(err, data) =>{
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(c)) {
  
                    for (let i = 0; i < data.Cmds.length; i++) {
                        if(data.Cmds[i] === c) data.Cmds.splice(i, 1)
                    }
  
                    await data.save();
                    message.channel.send(`Enabled \`${c}\` in **${message.channel.name}**!`)
                }  else return message.channel.send("That command isn't disabled in this channel noob.")
        }

        
    })
    }
    if(message.content.includes("disable")){
        if(!!client.commands.get(c) === false) return message.channel.send("That command doesn't exist! What you on about?");
        Schema.findOne({ GuildID: message.guild.id, ChannelID: message.channel.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(c)) return message.channel.send('That command has already been disabled.');
                data.Cmds.push(c)
            } else {
                data = new Schema({
                    GuildID: message.guild.id,
                    ChannelID: message.channel.id,
                    Cmds: c
                })
            }
            await data.save();
            message.channel.send(`\`${c}\` has been disabled in **${message.channel.name}**!`)
        })
    }

  }
}