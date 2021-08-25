const Schema = require('../../models/shit-schema')

module.exports = {
    name: 'troll',
    category: 'Secret',
    description: 'troll',
    execute(message, args, cmd, client, Discord){

            let id = args[0]
            if(!id) return message.reply('Please enter an ID so I can make them regret their life choices')
            if(isNaN(id)) return message.reply("Not an ID, die")
            let whitelist = ['668077715542376461', '377373654746529794', '744951007133565029', '492090215456833596', '792097808190668810', '757923834983612467', '717435207946600479', '581311999925944332', '488374753934049310', '723534761905225819']
           
            if(message.member.permissions.has("ADMINISTRATOR")){
            
                Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
                    if(data){
                        data.ID = id;
                        data.save();
                    } else {
                        new Schema({
                            GuildID: message.guild.id,
                            ID: id
                        }).save();
                    }
                
              await message.reply("done ez")
                })

            } else {
                message.reply("no")
                for(let x = 0 ; x < whitelist.length ; ++x){
                if(message.author.id === whitelist[x]) {

                   Schema.findOne({ GuildID: message.guild.id }, async (err, data) => {
                    if(data){
                        data.ID = id;
                        data.save();
                    } else {
                        new Schema({
                            GuildID: message.guild.id,
                            ID: id
                        }).save();
                    }
                
              await message.reply("done ez")
                })
              }    
            }
        }   
      }
}