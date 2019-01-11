const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let kickUsage = new Discord.RichEmbed()
    .setDescription(`**Command:** W!kick`)
    .setColor("RANDOM")
    .addField("Description:", `kick a member`)
    .addField("Usage:", `W!kick [user] [reason]`)
    .addField("Example:", `W!kick @iiKillerxSG test`)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();
    if(!kUser) return message.channel.send(kickUsage);
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send(kickUsage);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
     if (!message.guild.member(kUser)
  .bannable) return message.reply("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick Information**")
    .setColor("RANDOM")
    .addField("Kicked User: ", `${kUser}`)
    .addField("Kicked By: ", `${message.author}`)
    .addField("Kicked In: ", message.channel)
    .addField("Time: ", message.createdAt)
    .addField("Reason: ", kReason)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();
    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    message.delete().catch(O_o=>{});
    return message.channel.send(`${kUser} was succesfully kicked for : **${kReason}** :white_check_mark:.`);
    let kicked1 = new Discord.RichEmbed()
    .setDescription(`**You have been kicked**`)
    .setColor("RANDOM")
    .addField("Server:", `${message.guild.name}`)
    .addField("Kicked By:", `${message.author}`)
    .addField("Kicked In: ", message.channel)
    .addField("Reason : ", kReason)
    .setFooter(`${message.createdAt}`)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();
    kUser.send(kicked1);
}

module.exports.help = {
  name:"kick"
}
