var Scraper = require("images-scraper");

const google = new Scraper({
    puppeteer: {
        headless: true,
        args: ["--no-sandbox"],
    },
});

module.exports = {
    name: 'image',
    category: 'Fun',
    cooldown: 60,
    description: 'Searches google for the image of the given word',
    async execute(message, args, cmd, client, Discord){

        const image_query = args.join(" ");
        if(!image_query) return message.channel.send("Please enter an image name");
        const random = Math.floor(Math.random() * 10);

        const image_result = await google.scrape(image_query, 10);
        message.channel.send(image_result[random].url).catch(err => console.log(err));

    }
}