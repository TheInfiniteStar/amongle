const yts = require('yt-search')

module.exports = {
    name: 'ytsearch',
    description: 'Searches the topic on youtube',
    async execute(message, args, cmd, client, Discord) {

        const query = args.join(" ")
        if(!query) return message.channel.send("You didn't say what you were gonna search!")
        const r = await yts(query)
        const videos = r.videos.slice( 0, 1 )

        videos.forEach( function ( v ) {
            message.channel.send(`${v.url}`)
})
    }
}