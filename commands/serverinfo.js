const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bcicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("معلومات السيرفر:")
  .setColor("RANDOM")
  .addField("اسم السيرفر: ", message.guild.name)
  .addField("صنع بواسطة: ", "JO Clan")
  .addField("تاريخ الصنع : " , message.guild.createdAt)
  .addField("ناريخ دخولك : " , message.member.joinedAt)
  .addField("عدد الزوار: " , message.guild.memberCount)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setThumbnail(bcicon)
  .setTimestamp();
  return message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
