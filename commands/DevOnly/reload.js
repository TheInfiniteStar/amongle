const glob = require("glob")

module.exports = {
    name: 'reload',
    category: 'DevOnly',
    description: 'Reloads the command',
    async execute(message, args, cmd, client, Discord){
        if(message.author.id !== "377373654746529794") return;
        client.commands.sweep(() => true);
            glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
                if (err) return console.log(err);
                filePaths.forEach((file) => {
                    delete require.cache[require.resolve(file)];

                    const command = require(file);

                    if (command.name){
                        console.log(`Reloaded ${command.name} (cmd)`);
                        client.commands.set(command.name, command);
                    } 

                    if (command.aliases){
                        console.log(`Reloaded ${command.name} (cmd)`);
                        client.commands.set(command.aliases, command);
                    }
                })
            })
            message.channel.send(`Reloaded the command`)    
    }
}