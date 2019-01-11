const Discord = require("discord.js");



module.exports.run = async (bot, message, args) => {
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
let t8demUsage = new Discord.RichEmbed()
.setDescription(`**Command:** W!تقديم`)
.setColor("RANDOM")
.addField("Description:", `لكي تقدم للكلان`)
.addField("Usage:", `W!تقديم [user] [Replay رد على الإسلئلة]`)
.addField("Example:", `W!تقديم @iiKillerxSG يب عندي اصلية اسمي في ماين كرافت iiKillerxSG `)
.setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setFooter(bot.user.username , bot.user.avatarURL)
.setTimestamp();
if(!rUser) return message.channel.send(t8demUsage);
let info = args.join(" ").slice(22);
let t8demEmbed = new Discord.RichEmbed()
.setDescription("معلومات التقديم:")
.setColor("RANDOM")
.addField("اسم المقدم: ", `${rUser}`)
.addField("معلمواته: ", info)
let wmct8dem = message.guild.channels.find(`name`, "jot8dem");


message.delete().catch(O_o=>{});
wmct8dem.send(t8demEmbed);
return  message.channel.send(":white_check_mark: تم إرسال تقديمك");
}

module.exports.help = {
  name:"تقديم"
}
