module.exports = {
    name: 'ping',
    category: 'Info',
    description: "Shows how much time it takes you to hit the ping pong ball in miliseconds",
    execute(message, args, cmd, client, Discord){

        const serve = ["I'm gonna serve you hard", "I'll hit this ball so hard you gonna break your bat", "Get ready", "I'm a ping pong champion! think twice if you think you can beat me"]
        const servej = Math.floor((Math.random() * serve.length));
       
        message.channel.send(serve[servej]).then((sentMessage) => {
        
              var ping = sentMessage.createdTimestamp - message.createdTimestamp;
            
              var embed = new Discord.MessageEmbed()
              .setAuthor(`Oh hey, you actually hit the ball in ${ping} ms!`)
              .setColor("RANDOM")
             
                setTimeout(function() { sentMessage.edit(embed) }, 2000)
               
              
              })
      }
  }
