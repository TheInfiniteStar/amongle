const { MessageAttachment } = require('discord.js')

var Scraper = require("images-scraper");

const google = new Scraper({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"],
    },
});

module.exports = {
    name: 'eat',
    category: 'Secret',
    description: 'Eat food, things and other wonderful stuff',
    async execute(message, args, cmd, client, Discord){
 
     if(message.content.includes('a bees')){

      message.channel.send(`<@${message.author.id}> has eaten a bees :pensive:`)
      const random = Math.floor(Math.random() * 200);

      const image_result = await google.scrape('capybara', 200);
      message.channel.send(image_result[random].url).catch(err => console.log(err));
      }
      if(message.content.includes('cheese')){
        
        message.channel.send(`<@${message.author.id}> has eaten a cheese`)
        const random = Math.floor(Math.random() * 200);

        const image_result = await google.scrape('cheese', 200);
        message.channel.send(image_result[random].url).catch(err => console.log(err));
   
      }

    }
}