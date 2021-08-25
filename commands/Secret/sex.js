module.exports = {
    name: 'sex',
    category: 'Secret',
    description: "noob sex command",
    execute(message, args, cmd, client, Discord){
        
        let replies = ["Go get a girlfriend lmao", "Touch these for once damn https://tenor.com/view/grass-gif-6112271"];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

    message.reply(replies[result])

    }
}