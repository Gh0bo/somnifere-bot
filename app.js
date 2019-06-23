const Discord = require("discord.js");

const client = new Discord.Client({
    disableEveryone: true
});
const prefix = "!";
const moment = require('moment')



client.on('ready', () => {
    console.log(`Connecté sur : ${client.user.tag}`)

    client.user.setAvatar('https://i.imgur.com/7ZILuWU.png')
})



/* Suggestion */

client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === "suggestion") { // Si la commande est !candid
        const say = args.join(' '); // Variable qui prend ce qui a après l'espace dans "!candid "
        let suggestionEmbed = new Discord.RichEmbed()
            .setDescription("<:suggestion:590584329495773376> Suggestion <:suggestion:590584329495773376>")
            .setColor("#081add") // Couleur de l'embed
            .addField("Faite par : ", `${message.author}`) // On prend le pseudo de celui qui a mp le bot
            .addField("Date : ", moment().locale("fr").format('lll')) // La date
            .addField("Contenu : ", say)
            .setThumbnail(message.author.avatarURL)

        message.client.channels.get('590582190362984473').send(suggestionEmbed) // On va dans le channel candidatures et on envoie l'embed
    }
})




/* SAY COMMAND */

client.on('message', message => {

    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();

    if (command === "say") {
        let say = args.join(' ');
        message.delete();

        message.channel.send(say)
    }


})


/* KICK MEMBERS */
client.on("message", async message => {

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `!kick`) {


        let kickChannel = message.guild.channels.find("name", "bot-logs");
        let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let kickReason = args.join(" ").slice(22);

        if (!kickUser) {
            message.channel.send("Utilisateur introuvable");
        } 
        
        else if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply("Vous devez avoir la permission {KICK_MEMBERS} pour utiliser cette commande.");

            return null;

        } else if (kickUser.hasPermission("KICK_MEMBERS")) {
            message.channel.send("Vous ne pouvez pas kick cette personne !");

            return null;
        }


        let kickEmbed = new Discord.RichEmbed()
            .setDescription(":no_entry_sign: Kick :no_entry_sign:")
            .setColor("#ff8d02")
            .addField("Utilisateur kick : ", `${kickUser}`)
            .addField("Kick par : ", `<@${message.author.id}>`)
            .addField("Date : ", moment().locale("fr").format('lll')) // La date
            .addField("Raison : ", kickReason)
            .setThumbnail(kickUser.user.displayAvatarURL)


        if (!kickChannel) {
            message.channel.send("Channel #bot-logs introuvable");
        } else {
            message.guild.member(kickUser).kick(kickReason);

            message.delete().catch(O_o => {});

            kickChannel.send(kickEmbed);
        }

        return;
    }

    /* BAN COMMAND */

    if (cmd === `!ban`) {

        let banchannel = message.guild.channels.find(`name`, "bot-logs");
        let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let banReason = args.join(" ").slice(22);

        if (!banUser) {
            message.channel.send("Utilisateur introuvable");
        }

        else if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("Vous devez avoir la permission {BAN_MEMBERS} pour utiliser cette commande.");

            return null;
        }

        else if (banUser.hasPermission("BAN_MEMBERS")) {
            message.channel.send("Vous ne pouvez pas bannir cette personne.");

            return null;
        }

        let banEmbed = new Discord.RichEmbed()
            .setDescription(":no_entry: Ban :no_entry:")
            .setColor("#ef0000")
            .addField("Utilisateur banni : ", `${banUser}`)
            .addField("Banni par : ", `<@${message.author.id}>`)
            .addField("Date : ", moment().locale("fr").format('lll')) // La date
            .addField("Raison : ", banReason)
            .setThumbnail(banUser.user.displayAvatarURL);


        if (!banchannel) return message.channel.send("Channel #bot-logs introuvable");

        message.guild.member(banUser).ban(banReason);

        message.delete().catch(O_o => {});
        banchannel.send(banEmbed);


        return;
    }


    /* Report command */

    if (cmd === `!report`) {


        let reportschannel = message.guild.channels.find(`name`, "bot-logs");
        let reportUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let reportreason = args.join(" ").slice(22);
        if (!reportUser) return message.channel.send("Utilisateur introuvable.");

        let reportEmbed = new Discord.RichEmbed()
            .setDescription(":warning: Report :warning:")
            .setColor("#35a8b7")
            .addField("Utilisateur report : ", `${reportUser}`)
            .addField("Report par : ", `${message.author}`)
            .addField("Date : ", moment().locale("fr").format('lll')) // La date
            .addField("Raison : ", reportreason);


        if (!reportschannel) {
            message.channel.send("Channel #reports introuvable.");
        }

        message.delete().catch(O_o => {});
        reportschannel.send(reportEmbed);

        return;
    }

})

client.login('');
