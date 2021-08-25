const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'setclear',
    category: 'DevOnly',
    description: 'Clears the ticket set',
    execute(message, args, cmd, client, Discord){

        if(message.author.id != '377373654746529794') return;
        const clearButt = new MessageButton()
        .setStyle('red')
        .setID('clearSet')
        .setLabel('clear set')
        message.channel.send("mm yknow what to do", clearButt)
        
    }
}