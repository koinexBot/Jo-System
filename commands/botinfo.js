const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let boticon = bot.user.displayAvatarURL;
  let botembed2 = new Discord.RichEmbed()
  .setDescription("معلومات البوت")
  .setColor("RANDOM")
  .addField("اسم البوت: ", bot.user.username)
  .addField("صنع بواسطة: ", "iiKillerxSG")
  .addField("تاريخ الصنع : " , "10/8/2018")
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setTimestamp()
  .setThumbnail(boticon);
  return message.channel.send(botembed2);
}

module.exports.help = {
  name:"botinfo"
}
