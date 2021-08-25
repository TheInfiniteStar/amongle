const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require('../../models/prefix-schema')

module.exports = {
  name: "info",
  aliases : ['h'],
  category: 'Info',
  description: "Shows all available bot commands.",
  async execute(message, args, cmd, client, Discord) {

    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;
        prefix.findOne({ GuildID: message.guild.id }, async (err, data) =>{

          if(data){
            const prefix = data.Prefix;
    if (!args[0]) {


        const commands = readdirSync(`./commands/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../commands/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

       

      const embed = new MessageEmbed()
        .setTitle("📬 **Need help?**")
        .setDescription(
          `Use \`${prefix}info\` followed by a command name to get more additional information on a command. For example: \`${prefix}info yes\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "CATEGORY:",
          command.category
            ? command.category
            : "No category for this command."
        )
        .addField(
          "COOLDOWN:",
          command.cooldown
            ? `\`${command.cooldown}\` seconds`
            : "No cooldown for this command."
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  } else if (!data){
    const prefix = 'a.';

    if (!args[0]) {


      const commands = readdirSync(`./commands/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../commands/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

     
    const embed = new MessageEmbed()
      .setTitle("📬 **Need help?**")
      .setDescription(
        `Use \`${prefix}info\` followed by a command name to get more additional information on a command. For example: \`${prefix}info yes\`.`
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
    return message.channel.send(embed);
  } else {
    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

    if (!command) {
      const embed = new MessageEmbed()
        .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
        .setColor("FF0000");
      return message.channel.send(embed);
    }

    const embed = new MessageEmbed()
      .setTitle("Command Details:")
      .addField("PREFIX:", `\`${prefix}\``)
      .addField(
        "COMMAND:",
        command.name ? `\`${command.name}\`` : "No name for this command."
      )
      .addField(
        "ALIASES:",
        command.aliases
          ? `\`${command.aliases.join("` `")}\``
          : "No aliases for this command."
      )
      .addField(
        "CATEGORY:",
        command.category
          ? command.category
          : "No category for this command."
      )
      .addField(
        "COOLDOWN:",
        command.cooldown
          ? `\`${command.cooldown}\` seconds`
          : "No cooldown for this command."
      )
      .addField(
        "DESCRIPTION:",
        command.description
          ? command.description
          : "No description for this command."
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
    return message.channel.send(embed);
  }
  }
  })
  },
};