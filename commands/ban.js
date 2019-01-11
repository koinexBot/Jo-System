const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let kickUsage = new Discord.RichEmbed()
    .setDescription(`**Command:** W!ban`)
    .setColor("RANDOM")
    .addField("Description:", `ban a member`)
    .addField("Usage:", `W!ban [user] [reason]`)
    .addField("Example:", `W!ban @iiKillerxSG test`)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();
    if(!bUser) return message.channel.send(kickUsage);
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send(kickUsage);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
     if (!message.guild.member(bUser)
  .bannable) return message.reply("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban Information**")
    .setColor("RANDOM")
    .addField("Banned User: ", `${bUser}`)
    .addField("Banned By: ", `${message.author}`)
    .addField("Banned In: ", message.channel)
    .addField("Time: ", message.createdAt)
    .addField("Reason: ", bReason)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");


    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    message.delete().catch(O_o=>{});
    return message.channel.send(`${bUser} was succesfully banned for : **${bReason}** :white_check_mark:.`);

    let banned1 = new Discord.RichEmbed()
   .setDescription(`**You have been kicked**`)
   .setColor("RANDOM")
   .addField("Server:", `${message.guild.name}`)
   .addField("Banned By:", `${message.author}`)
   .addField("Banned In: ", message.channel)
   .addField("Reason : ", bReason)
   .setFooter(`${message.createdAt}`)
   .setAuthor(`${message.author.tag}`, message.author.avatarURL)
   .setFooter(bot.user.username , bot.user.avatarURL)
   .setTimestamp();
  bUser.send(banned1);

}

module.exports.help = {
  name:"ban"
}
