const axios = require('axios');

require('./inline')

const chatSend = async (message, args, cmd, client, Discord) => {
    try {

         const content = args.join(" ");

         if(!content) return message.channel.send("To chat, do a.chat <message>");

        await axios.get(`http://api.brainshop.ai/get?bid=156953&key=IMaOPjHYDdogybdx&uid=${message.author.id}&msg=${content}`)
        .then(res => {
        let data = res.data;
       let reply = data.cnt
 console.log(reply)
         if (reply) {
             message.lineReply(reply, { allowedMentions: { repliedUser: true } });
         } else if(!reply) {
         message.lineReply("api did not respond at time [TIME OUT]", { allowedMentions: { repliedUser: false } });
 }
        })
  } catch (e) {
         console.log(e);
     }
 };
 
 module.exports = {
     chatSend
 };
 