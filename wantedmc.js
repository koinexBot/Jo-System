const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setGame(`koinexBot || !help`,'https://www.twitch.tv/JO-System');

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "chat") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if(cmd === `${prefix}warn`){
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
     let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     let warnUsage = new Discord.RichEmbed()
     .setDescription(`**Command:** !warn`)
     .setColor("RANDOM")
     .addField("Description:", `warn a member`)
     .addField("Usage:", `!warn [user] [reason]`)
     .addField("Example:", `!warn @iiKillerxSG swear`)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();
     if(!wUser) return message.channel.send(warnUsage);
     let wReason = args.join(" ").slice(22);
     if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I can't warn this user.");

     let warnEmbed = new Discord.RichEmbed()
     .setDescription("**Warn Information**")
     .setColor("RANDOM")
     .addField("Warned User: ", `${wUser}`)
     .addField("Warned By: ", `${message.author}`)
     .addField("Warned In: ", message.channel)
     .addField("Time: ", message.createdAt)
     .addField("Reason: ", wReason)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();


     let warnchannel = message.guild.channels.find(`name`, "incidents");
     warnchannel.send(warnEmbed)

     let warncommandEmbed = new Discord.RichEmbed()
     .setDescription(`**You have been Warned**`)
     .setColor("RANDOM")
     .addField("Server:", `${message.guild.name}`)
     .addField("Warned By:", `${message.author}`)
     .addField("Warned In: ", message.channel)
     .addField("Reason : ", wReason)
     .setFooter(`${message.createdAt}`)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();

     wUser.send(warncommandEmbed);

     message.delete().catch(O_o=>{});
       message.channel.send(`${wUser} was succesfully warned for : **${wReason}** :white_check_mark:.`)

     return;

   }
  if(cmd === `${prefix}help`){
    let help = new Discord.RichEmbed()
    .setDescription(`***اوامر البوت***`)
    .setColor("RANDOM")
    .addField("!help -" , "كي تشوف اوامر البوت" )
    .addField("!warn -" , "لكي تعطي احد تحذير" )
    .addField("!report -" , "لكي تشتكي على احد" )
    .addField("!mute -" , "لكي تعطي احد ميوت" )
    .addField("!unmute -" , "لكي تشيل من احد ميوت" )
    .addField("!ban -" , "لكي تشيل بان من احد" )
    .addField("!bc -" , "لكي ترسل رسالة لكل الناس" )
    .addField("!suggestion -" , "لكي تقترح شيء نسويه" )
    .addField("!capitals -" , "لعبة حلوى اسرع واحد يكتب الكلمة" )
    .addField("!cat -" , "شطحة مو لازم تسويها الا لو تبي" )
    .addField("!catinfo -" , "شطحة مو لازم تسويها الا لو تبي" )
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setFooter(bot.user.username , bot.user.avatarURL)
    .setTimestamp();
    return message.channel.send(help);

}
  if(cmd === `${prefix}unmute`){
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can't do that.");
     let unmute2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

     let unmuteUsage = new Discord.RichEmbed()
     .setDescription(`**Command:** W!unmute`)
     .setColor("RANDOM")
     .addField("Description:", `unmute a member`)
     .addField("Usage:", `!unmute [user]`)
     .addField("Example:", `!unmute @iiKillerxSG`)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();
     if(!unmute2) return message.channel.send(unmuteUsage);

     let muterole2 = message.guild.roles.find(`name`, "muted");
     unmute2.removeRole(muterole2.id);
     if(!unmute2.roles.has(muterole2.id)) return message.channel.send("This user is not muted.");

     let unmuteembed = new Discord.RichEmbed()
     .setDescription(`**You have been Unmuted**`)
     .setColor("RANDOM")
     .addField("Server:", `${message.guild.name}`)
     .addField("UnMuted By:", `${message.author}`)
     .addField("UnMuted In: ", message.channel)
     .setFooter(`${message.createdAt}`)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();

     unmute2.send(unmuteembed);
     message.channel.send(`${unmute2} was succesfully unmuted :white_check_mark:.`);
     message.delete();
   }

   if(cmd === `${prefix}bc`){
   if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have A Permission")
let args = message.content.split(" ").slice(1);
var argresult = args.join(' ');
let bcUsage = new Discord.RichEmbed()
.setDescription(`**Command:** !bc`)
.setColor("RANDOM")
.addField("Description:", `bc a message`)
.addField("Usage:", `!bc [message]`)
.addField("Example:", `!bc test`)
.setAuthor(`${message.author.tag}`, message.author.avatarURL)
.setFooter(bot.user.username , bot.user.avatarURL)
.setTimestamp();
if(!argresult) return message.channel.send(bcUsage);

 message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
   let bcicon = message.guild.iconURL;
   let bcEmbed = new Discord.RichEmbed()
   .addField("**New BoardCast !**" , "<*>")
   .addField("من سيرفر: ", message.guild.name)
   .addField("إلى:", m)
   .setColor("RANDOM")
   .setThumbnail(bcicon)
   .addField("المرسل:", `${message.author}`)
   .addField("الرسالة:", argresult)
   .setAuthor(`${message.author.tag}`, message.author.avatarURL)
   .setFooter(bot.user.username , bot.user.avatarURL)
   .setTimestamp();
m.send(bcEmbed);
});
message.channel.send("تم إرسال البورد كاست بنجاح :white_check_mark:.").then(msg => msg.delete(2000));
message.delete();
};

if (cmd === `${prefix}capitals`){
  const type = require('./commands/capitals.json');
  const item = type[Math.floor(Math.random() * type.length)];
  const filter = response => {
      return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
  };
  let secondsembed = new Discord.RichEmbed()
  .setDescription("انت تملك 10 ثواني تكتب الكلمة")
  .addField("الكلمة هي: " , `${item.type}`)
  .setColor("RANDOM")
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setFooter(bot.user.username , bot.user.avatarURL)
  .setTimestamp();

  message.channel.send('**استعد**').then(msg => {

  msg.channel.send(secondsembed).then(() => {
          message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] })
          .then((collected) => {
      message.channel.send(`${collected.first().author} :white_check_mark: **كفووو , انت سريع في الكتابة**`);
            })
            .catch(collected => {
              message.channel.send(`:x: **انت بطيء في الكتابة**`);
            })
      })
    })
  }

     if(cmd === `${prefix}catinfo`){
     number = 7;
     var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;
     switch(random) {
         case 1: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** A cat's whiskers are thought to be a kind of radar, which helps a cat gauge the space it intends to walk through.`); break;
         case 2: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** On average, a cat will sleep for 16 hours a day.`); break;
         case 3: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** Jaguars are the only big cats that don't roar.`); break;
         case 4: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** The group of words associated with cat (catt, cath, chat, katze) stem from the Latin catus, meaning domestic cat, as opposed to feles, or wild cat.`); break;
         case 5: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** When a cat drinks, its tongue - which has tiny barbs on it - scoops the liquid up backwards.`); break;
         case 6: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** The strongest climber among the big cats, a leopard can carry prey twice its weight up a tree.`); break;
         case 7: message.channel.send(`:cat:  | ${message.author.username}, **did you know?** Cats can be taught to walk on a leash, but a lot of time and patience is required to teach them. The younger the cat is, the easier it will be for them to learn.`); break;

      }

   }

   if(cmd === `${prefix}suggestion`){
     let suggestions = args.join(" ");
     let sUsage = new Discord.RichEmbed()
     .setDescription(`**Command:** !suggestion`)
     .setColor("RANDOM")
     .addField("Description:", ` suggestion a idea`)
     .addField("Usage:", `!suggestion [idea]`)
     .addField("Example:", `!suggestion test`)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();
     if(!suggestions) return message.channel.send(sUsage);
     let suggestionembed = new Discord.RichEmbed()
     .setDescription("**معلومات الإقتراح:**")
     .setColor("RANDOM")
     .addField("اسم المقترح: ", `${message.author}`)
     .addField("الإقتراح: ", suggestions)
     .setAuthor(`${message.author.tag}`, message.author.avatarURL)
     .setFooter(bot.user.username , bot.user.avatarURL)
     .setTimestamp();
     let suggestionschannel = message.guild.channels.find('name', "josuggestions");
     suggestionschannel.send(suggestionembed);
     message.channel.send("**تم عرض إقتراحك بنجاح** :white_check_mark:.").then(msg => msg.delete(2000));
     message.delete();
     }

     if(cmd === `${prefix}cat`){
         number = 5;
         var random = Math.floor(Math.random() * (number - 1 + 1)) + 1;
         switch(random) {
           case 1: message.channel.send("Here's your cat ! :cat:", {files: ["./image/1.jpg"]}); break;
           case 2: message.channel.send("Here's your cat ! :cat:", {files: ["./image/2.jpg"]}); break;
           case 3: message.channel.send("Here's your cat ! :cat:", {files: ["./image/3.jpg"]}); break;
           case 4: message.channel.send("Here's your cat ! :cat:", {files: ["./image/4.jpg"]}); break;
           case 5: message.channel.send("Here's your cat ! :cat:", {files: ["./image/5.jpg"]}); break;

       }
     }
     if(cmd === `${prefix}say`){
     if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("*لا تملك الصلاحيات المطلوبه**");

     message.channel.send(args.join("  "))
         message.delete();
}
});
  
bot.login(process.env.BOT_TOKEN);

