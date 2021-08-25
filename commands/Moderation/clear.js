module.exports = {
    name: 'clear',
    aliases: ['purge', 'cl', 'cls'],
    category: 'Moderation',
    description: "Clear Messages", 
    async execute(message, args, cmd, client, Discord) {

      if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply("I don't have the permission to do that 😔")

      if(message.member.permissions.has('MANAGE_MESSAGES')){

        if(!args[0]) return message.reply("How many messages you wanna delete noob");
        if(isNaN(args[0])) return message.reply("Fake number go brr");

        if(args[0] > 100) return message.reply("You cannot delete more than 100 messages");
        if(args[0] < 1) return message.reply("At least 1 noob")

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    } else 
    message.reply("You are not allowed to do that")
  }
}
