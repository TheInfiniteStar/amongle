const discordTTS = require('discord-tts');

module.exports = {
    name: 'say',
    category: 'Miscellaneous',
    description: 'Joins a voice channel and speaks the given text.',
    async execute(message, args, cmd, client, Discord){

        let text = args.join(' ');
        if(!text) return message.channel.send('What are you tryna say?')
        const VC = message.member.voice.channel;
        if(!VC) return message.channel.send("You must join a voice channel to do this noob");
        await VC.join();

       try{
        const broadcast = client.voice.createBroadcast();
        const channelId = message.member.voice.channelID;
        const channel = client.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream(`${text}`));
            const dispatcher = connection.play(broadcast);
        })} catch(err){
            console.log(err)
        }

     setTimeout(function() { VC.leave() }, 300 * 1000)
    }
}