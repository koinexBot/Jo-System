const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You Don't Have A Permission !");
  let clearUsage = new Discord.RichEmbed()
  .setDescription(`**Command:** W!clear`)
  .setColor("RANDOM")
  .addField("Description:", `clear the chat`)
  .addField("Usage:", `W!clear [amount]`)
  .addField("Example:", `W!clear 10`)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setTimestamp();
  if(!args[0]) return message.channel.send(clearUsage);
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send("```تم حذف العدد المطلوب !```").then(msg => msg.delete(2000))
});

}

module.exports.help = {
  name: "clear"
}
