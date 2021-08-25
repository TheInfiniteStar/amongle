const banSchema = require('../../models/dmBanMember-schema')
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'obli',
  category: 'Moderation',
  description: "Sends user to oblivion and they will not come back",
  execute(message, args, cmd, client, Discord){

    banSchema.findOne({ GuildID: message.guild.id }, async (err, data) =>{
      if(!data) {

        if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("What about you get a job or ask for permissions from the owner before doing this again");
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("I don't have the permission to do that 😔")
       let member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
       if(!args[0]) return message.reply('Please provide an ID or mention the person that you wanna send to oblivion man')
       if(!member) return message.reply( new MessageEmbed()
       .setDescription(`❌ I couldn't find user ${args[0]}`)
       .setColor("RED")
       )
 
            let reason = args.slice(1).join(" ");
             if (!reason) reason = "No reason was given";
 
               member.send(`L noob get rekt. You were banned from **${message.guild.name}** | ${reason}`).catch(err => console.log(err));
 
               const kickEmbed = new MessageEmbed()
               .setDescription(`✅ ***Successfully sent*** <@${member.id}> ***to oblivion***| ${reason}`)
               .setColor("GREEN")
 
                  member
                   .ban({ 
                     reason: `${reason}`,
                  }) 
                   .then(() => {
                   message.channel.send(kickEmbed)
                   })
                   .catch(err => {
                    message.reply(`I was unable to send ${member} to oblivion`);
                     console.error(err);
                   });
 
  } else if (data){

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("What about you get a job or ask for permissions from the owner before doing this again");
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("I don't have the permission to do that 😔")
   let member = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0]);
   if(!args[0]) return message.reply('Please provide an ID or mention the person that you wanna send to oblivion man')
   if(!member) return message.reply( new MessageEmbed()
   .setDescription(`❌ I couldn't find user ${args[0]}`)
   .setColor("RED")
   )

        let reason = args.slice(1).join(" ");
         if (!reason) reason = "No reason was given";

           member.send(`L noob get rekt. You were banned from **${message.guild.name}** | ${reason}`).catch(err => console.log(err));
           member.send(data.Message)

           const kickEmbed = new MessageEmbed()
           .setDescription(`✅ ***Successfully sent*** <@${member.id}> ***to oblivion***| ${reason}`)
           .setColor("GREEN")

              member
               .ban({ 
                 reason: `${reason}`,
              }) 
               .then(() => {
               message.channel.send(kickEmbed)
               })
               .catch(err => {
                message.reply(`I was unable to send ${member} to oblivion`);
                 console.error(err);
               });
        }
    })
  }
}