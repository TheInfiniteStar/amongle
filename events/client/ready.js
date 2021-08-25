module.exports = async (Discord, client) =>{

      console.log('Asuna is online!');
            const arrayOfStatus = [
                  "for a.help",
                  "SAO",
                  `over ${client.guilds.cache.size} servers!`
            ];

            let index = 0;
            setInterval(() => {
                  if(index === arrayOfStatus.length) index = 0;
                  const status = arrayOfStatus[index];
                  client.user.setActivity(status, { type: "WATCHING" }).catch(console.error)
                  index++;
            }, 5000)
            console.log("Status change has been activated!");
           
     }