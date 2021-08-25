const trollSchema = require('../../models/shit-schema');
const settingsSchema = require('../../models/cmdSettings-schema')
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = require('../../models/prefix-schema')
  
    if (message.channel.type == 'dm') return;
    
    trollSchema.findOne({ GuildID: message.guild.id }, async (err, data) =>{
      if(!data) return;

  if(parseInt(message.author.id) === parseInt(data.ID)) {
    message.reply("shit yourself")
    }})

    prefix.findOne({ GuildID: message.guild.id }, async (err, data) =>{

    if(data) {
      const prefix = data.Prefix;

    
        if(!message.content.startsWith(prefix) || message.author.bot) return;

  
       const args = message.content.slice(prefix.length).split(/ +/);
       const cmd = args.shift().toLowerCase();
       const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

       if(!command) return;

       if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = Math.round((expiration_time - current_time) / 1000);

            return message.reply(`Hold on! The keys to type **${command.name}** are broken. Please give me **${time_left}** seconds to fix it.`);
        }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

       
       if(command) {
         const check = await settingsSchema.findOne({ GuildID: message.guild.id, ChannelID: message.channel.id })
         if(check){
           if(check.Cmds.includes(command.name)) return message.channel.send('That command has been disabled in this channel')
           command.execute(message, args, cmd, client, Discord);
         }else{
          command.execute(message, args, cmd, client, Discord);
         }
       }
    }  else if (!data) {
 
      const prefix = "a.";

      if(!message.content.startsWith(prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).split(/ +/);
      const cmd = args.shift().toLowerCase();
      const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

      if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = Math.round((expiration_time - current_time) / 1000);

            return message.reply(`Hold on! The keys to type **${command.name}** are broken. Please give me **${time_left}** seconds to fix it.`);
        }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

      if(command) {
        const check = await settingsSchema.findOne({ GuildID: message.guild.id, ChannelID: message.channel.id })
        if(check){
          if(check.Cmds.includes(command.name)) return message.channel.send('That command has been disabled in this channel')
          command.execute(message, args, cmd, client, Discord);
        }else{
         command.execute(message, args, cmd, client, Discord);
        }
      }
      
    }

  })
}