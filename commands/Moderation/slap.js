const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slap',
    category: 'Moderation',
    description: "Slaps the user really hard until they get removed from the guild",
    execute(message, args, cmd, client, Discord){

      if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("What about you get a job or ask for permissions from the owner before doing this again");
      if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("I don't have the permission to do that 😔")
     let member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
     if(!args[0]) return message.reply('Please provide an ID or mention the person you wanna slap man')
     if(!member) return message.reply( new MessageEmbed()
     .setDescription(`❌ I couldn't find user ${args[0]}`)
     .setColor("RED")
     )

          let reason = args.slice(1).join(" ");
           if (!reason) reason = "No reason was given";

             member.send(`You were kicked from **${message.guild.name}** | ${reason}`).catch(err => console.log(err));

             const kickEmbed = new MessageEmbed()
             .setDescription(`✅ ***Successfully slapped*** <@${member.id}> | ${reason}`)
             .setColor("GREEN")

                member
                 .kick(reason)
                 .then(() => {
                 message.channel.send(kickEmbed)
                 })
                 .catch(err => {
                  message.reply(`OW! ${member} has metal cheeks`);
                   console.error(err);
                 });

  } 
      
}
