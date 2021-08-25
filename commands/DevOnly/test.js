const button = require('discord-buttons')

module.exports = {
    name: 'test',
    aliases: [],
    cooldown: 10,
    category: 'DevOnly',
    description: 'wait how did u know about this',
   async execute(message, args, cmd, client, Discord){
         
       if(message.author.id != '377373654746529794') return;
       const questions = [
        `death`,
        `depressions`,
        'pain',
        'agony'
      ];

      let collectCounter = 0;
      let endCounter = 0;

      const appStart = await message.author.send({
        embed: {
          description:
            questions[collectCounter++],
          color: '#77ACF1',
        },
      });
      const channel = appStart.channel;

      const filter = (m) => m.author.id === message.author.id;

      const collector = channel.createMessageCollector(
        filter
      );

      collector.on('collect', (m) => {
        if (m.content.toLowerCase() == 'cancel') return collector.stop('CANCEL');
        if (collectCounter < questions.length) {
          channel.send({
            embed: {
              description:
                questions[collectCounter++],
              color: '#77ACF1',
            },
          });
        } else {
          channel.send({
            embed: {
              description:
                'Application has been sent!',
              color: '#77ACF1',
            },
          });
          collector.stop('fulfilled');
        }
      });

      const appsChannel = client.channels.cache.get(
        '731452498761613366'
      );
      collector.on('end', (collected, reason) => {
        if (reason === 'CANCEL') {
          return channel.send({embed: {
            description:
            "Application cancelled!",
            color: 'RED',
          },
        })
       }
      
        if (reason === 'fulfilled') {
          let index = 1;
          const mappedResponses = collected
            .map((msg) => {
              return `${index++}) ${
                questions[endCounter++]
              }\n -> ${msg.content}`;
            })
            .join('\n\n');

          const embed = new MessageEmbed()
            .setTitle(
              'Event Manager Application'
            )
            .setAuthor(message.author.tag)
            .setDescription(mappedResponses)
            .addField('Status', '**(Pending)**')
            .setColor('#77ACF1');

    appsChannel.send(embed);
        }
      });
    }
    }
