const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let reportUsage = new Discord.RichEmbed()
.setDescription(`**Command:** W!report`)
.setColor("RANDOM")
.addField("Description:", `report a member`)
.addField("Usage:", `W!ban [user] [reason]`)
.addField("Example:", `W!report @iiKillerxSG noob`)
.setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setFooter(bot.user.username , bot.user.avatarURL)
.setTimestamp();
if(!rUser) return message.channel.send(reportUsage);
let rreason = args.join(" ").slice(22);

let reportEmbed = new Discord.RichEmbed()
.setDescription("**Report Information**")
.setColor("RANDOM")
.addField("Reported User: ", `${rUser}`)
.addField("Reported By: ", `${message.author}`)
.addField("Reported In: ", message.channel)
.addField("Time: ", message.createdAt)
.addField("Reason: ", rreason)
.setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setFooter(bot.user.username , bot.user.avatarURL)
.setTimestamp();

let wmcreports = message.guild.channels.find(`name`, "joreports");


message.delete().catch(O_o=>{});
wmcreports.send(reportEmbed);
return message.channel.send(`${rUser} was succesfully reported :white_check_mark:.`)
}

module.exports.help = {
  name:"report"
}
