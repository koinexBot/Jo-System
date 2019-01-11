const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let muteUsage = new Discord.RichEmbed()
  .setDescription(`**Command:** W!mute`)
  .setColor("RANDOM")
  .addField("Description:", `mute a member`)
  .addField("Usage:", `W!mute [user] [time] [reason]`)
  .addField("Example:", `W!mute @iiKillerxSG 1d swear`)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setTimestamp();
  if(!tomute) return message.channel.send(muteUsage);
  if(!tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have A Permission");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("You Can't mute this operator !");
  let muterole = message.guild.roles.find(`name`, "muted");
  let mReason = args[2]
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`${tomute} was succesfully muted for : **${mReason}** :white_check_mark:.`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));
  let MuteEmbed = new Discord.RichEmbed()
  .setDescription("**Mute Information**")
  .setColor("RANDOM")
  .addField("Muted User: ", `${bUser}`)
  .addField("Muted By: ", `${message.author}`)
  .addField("Muted In: ", message.channel)
  .addField("Time: ", message.createdAt)
  .addField("Reason: ", mReason)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setTimestamp();


  let wmcmutelogchannel = message.guild.channels.find(`name`, "wmcincidents");
    wmcmutelogchannel.send(MuteEmbed);

    let mute = new Discord.RichEmbed()
    .setDescription(`**You have been muted**`)
    .setColor("RANDOM")
    .addField("Server:", `${message.guild.name}`)
    .addField("Muted By:", `${message.author}`)
    .addField("Muted In: ", message.channel)
    .addField("Reason : ", mReason)
    .setFooter(`${message.createdAt}`)
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();

    tomute.send(mute);
}

module.exports.help = {
  name: "mute"
}
