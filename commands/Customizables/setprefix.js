const Schema = require('../../models/prefix-schema')

module.exports = {
    name: 'setprefix',
    category: 'Customizables',
    description: 'sets the prefix for a server',
    async execute(message, args, cmd, client , Discord){

        if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply("Normies can't do this command")
       
        const prefix = args[0];
        
        if (!args[0]) return message.channel.send('You must provide a **new prefix**!');
    
        if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')
    
        Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data){
             data.Prefix = prefix;
             data.save();
            } else{
                new Schema({
                    GuildID: message.guild.id,
                    Prefix: prefix
                }).save();
            }
              await message.channel.send(`The new prefix is now \`${prefix}\``)  
        })
    
    }
 }