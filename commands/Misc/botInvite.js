module.exports = {
    name: 'invite',
    aliases: ['inv'],
    category: 'Miscellaneous',
    description: "Sends the bot invite in user DM's",
    execute(message, args, cmd, client, Discord){

        client.users.fetch(`${message.author.id}`).then(dm => {
            dm.send("Here's my invite link: https://discord.com/oauth2/authorize?client_id=731084579204628530&scope=bot&permissions=2146958847")
        })
    }
}