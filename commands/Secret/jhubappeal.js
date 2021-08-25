const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'jhubappeal',
    category: 'Secret',
    description: 'Do this if you want to appeal your ban from JHUB',
    async execute(message, args, cmd, client, Discord){

        const questions = [
            "Hi",
            "Answer my questions seriously or don't even think about getting an unban",
            "What is your Discord User ID?\n(e.g 377373654746529794)",
            "When were you banned?\nState the date of when I banned you",
            "Why were you banned?\nGive the reason that was implemented with your ban",
            "Will you do it again?",
            "How do I know you're not lying?",
        ];
        
        let collectCounter = 0;
        let endCounter = 0;
        const filter = (m) => m.author.id === message.author.id;
        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;
        const collector = channel.createMessageCollector(filter);

        collector.on("collect", () => {
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter++])
            } else {
                channel.send("Sus but ok. Bye");
                collector.stop("fulfilled"); 
            }
        });

        const appsChannel = client.channels.cache.get("857264350486200320");
        collector.on("end", (collected, reason) => {
            if (reason === "fulfilled"){
                let index = 1;
                const mappedResponses = collected
                .map((msg) => {
                    return `${index++}. ${questions[endCounter++]}\n-> ${msg.content}`;
                })
                .join("\n\n");

                appsChannel.send(
                new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .setTitle("New Application")
                .setDescription(mappedResponses)
                .setColor("RANDOM")
                .setTimestamp()
                )
            
            }
        })
    
  }
}
