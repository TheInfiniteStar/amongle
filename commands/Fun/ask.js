const Discord = require("discord.js");

module.exports = {
    name: 'ask',
    aliases: ['roll'],
    category: 'Fun',
    description: "basically an 8ball",
   async execute(message, args, cmd, client, Discord){
       
  
    if(!args[0]) return message.reply("Whats the question noob");
    let replies = ["Yes", "No", "I dont know", "If you had a brain you would know", "Ofcourse bruh", "Maybe", "I don't think so","Oh no", "LMFAO NO", "oh yes"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.reply(ballembed);

    }

    

    

}

module.exports.help = {
    name: "8ball"
}


