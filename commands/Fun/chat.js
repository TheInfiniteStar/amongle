module.exports = {
    name: 'chat',
    aliases: ['talk'],
    category: 'Fun',
    description: 'Talk to me',
    async execute(message, args, cmd, client, Discord){
        
        client.brain.chatSend(message, args)
  
    }
}