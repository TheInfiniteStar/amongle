const Discord = require('discord.js');

module.exports = {
    name: 'testjoin',
    aliases: ['tj'],
    category: 'DevOnly',
    description: 'Emits an event same as someone joining',
    execute (message, args, cmd, client, Discord){
        if (message.author.id != '377373654746529794') return;
        client.emit('guildMemberAdd', message.member);
    }

}