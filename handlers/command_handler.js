const fs = require('fs');

module.exports = (client, Discord) =>{
    fs.readdirSync('./commands/').forEach(dir => {
    const command_files = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

    for(const file of command_files){

        const command = require(`../commands/${dir}/${file}`);

       if(command.name){
           client.commands.set(command.name, command);
       }      
       else {
            continue;
        }
    }
  })
}