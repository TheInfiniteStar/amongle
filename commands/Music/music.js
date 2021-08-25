const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { MessageEmbed } = require('discord.js');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop', 'p', 'q', 'dis', 'disconnect', 's', 'queue', 'loop', 'repeat', 'lq', 'loopqueue', 'lyrics'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    category: 'Music',
    description: 'Advanced music bot',
    async execute(message, args, cmd, client, Discord){


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send("You do realise that you're not in VC right?");
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You are not allowed to do this.');
        if (!permissions.has('SPEAK')) return message.channel.send('You are not allowed to do this');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (['play', 'p'].includes(cmd)){
            if (!args.length) return message.reply('Please provide me a song to play.');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                    loop: false,
                    loopqueue: false,
                    status: status = ("Loop: ❌ | Loop queue: ❌")
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }
        

        else if(['skip', 's'].includes(cmd)) skip_song(message, server_queue);
        else if(['stop', 'dis', 'disconnect'].includes(cmd)) stop_song(message, server_queue);
        else if(['queue', 'q'].includes(cmd)) queue_list(message, server_queue);
        else if(['repeat', 'loop'].includes(cmd)) loop(message, server_queue);
        else if(['lq', 'loopqueue'].includes(cmd)) loopqueue(message, server_queue);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        if(song_queue.loop){
            video_player(guild, song_queue.songs[0]);
        } else if(song_queue.loopqueue){
            song_queue.songs.push(song_queue.songs[0])
            song_queue.songs.shift();
        }else{
            song_queue.songs.shift();
        }
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)

}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send("You do realise you're not in VC right?");
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    try{
         server_queue.connection.dispatcher.end();
    } catch(err) {
        message.channel.send('Something broke while trying to skip.')
        console.log(err)
    }
   
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Join VC if you wanna stop the song.');
     if(!server_queue){
        return message.channel.send(`Bruh nothing is even playing`);
    }
   
    try{ 
        server_queue.songs = [];
        server_queue.connection.dispatcher.end();
    } catch(err) {
        message.channel.send('Something broke while trying to disconnect')
    }
  
}

const queue_list = (message, server_queue, song_queue) => {
    if (!message.member.voice.channel) return message.channel.send("You do realise you're not in VC right?");
    if(!server_queue) return message.channel.send("There are no songs in the queue 😔");
     let NP = server_queue.songs[0];
     let qMsg = `Now playing: **${NP.title}**\n \n **__Up next__** \n`
     
     for(var i = 1; i < server_queue.songs.length; i++){
         qMsg += `**${i}.** \`${server_queue.songs[i].title}\`\n \n`
     }
     const qEmbed = new MessageEmbed()
     .setTitle(`**Song queue for ${message.guild.name}**`)
     .setDescription(qMsg)
     .setColor("RANDOM")
     .setFooter(status)

     message.channel.send(qEmbed)

}   

const loop = (message, song_queue) => {
    if(!message.member.voice.channel) return message.channel.send("You are not in a VC. You know that right?");
    if(!song_queue) return message.channel.send("There are no songs in the queue 😔");
    song_queue.loop = !song_queue.loop;
    song_queue.loopqueue = false;
    if(song_queue.loop === true){
          message.channel.send("🔁 **Loop enabled**");
          status =  ("Loop: ✅ | Loop queue: ❌")
    } else {
     message.channel.send("🔁 **Loop has been disabled**");
     status = ("Loop: ❌ | Loop queue: ❌")
    } 
    
}

const loopqueue = (message, song_queue) => {
    if(!message.member.voice.channel) return message.channel.send("You are not in a VC. You know that right?");
    if(!song_queue) return message.channel.send("There are no songs in the queue 😔");
    song_queue.loopqueue = !song_queue.loopqueue;
    song_queue.loop = false;
    if(song_queue.loopqueue === true){
          message.channel.send("🔁 **Loop queue enabled**");
          status =  ("Loop: ❌ | Loop queue: ✅")
    } else {
     message.channel.send("🔁 **Loop queue has been disabled**");
     status = ("Loop: ❌ | Loop queue: ❌")
    }
    
}


// module.exports = {
//     name: 'play',
//     aliases: ['skip', 'stop', 'p', 'q', 'dis', 'disconnect', 's', 'queue', 'loop', 'repeat', 'loopq', 'loopqueue'], 
//     category: 'Music',
//     description: 'Advanced music bot',
//     async execute(message, args, cmd, client, Discord){
//         message.channel.send("Music commands are on maintenace, sorry for the inconvenience")
//  }
// }