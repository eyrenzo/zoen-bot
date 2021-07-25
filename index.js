const Discord = require("discord.js");
const { isBuffer } = require("util");
const Client = new Discord.Client;
require('discord-buttons')(Client);
const disbut = require("discord-buttons");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const { execute } = require("./bouton");

Client.login(process.env.KEY);

const logChannelId = "866627310639120385"

const prefix = "z/";

Client.on("ready", () => {
    console.log("Presque prêt 👀");

    Client.user.setActivity("Zoen V.1.5")

    Client.guilds.cache.find(guild => guild.id === "865586758942064641").channels.cache.find(channel => channel.id === "865930329005228062").messages.fetch("868106384514904084").then(message => {
        console.log("message ajouté à la mémoire : " + message.content);
    }).catch(error => {
        console.log("impossible d'ajouter le message en mémoire : " + error);
    });

    Client.guilds.cache.find(guild => guild.id === "865586758942064641").channels.cache.find(channel => channel.id === "865930329005228062").messages.fetch("868106384514904084").then(message => {
        //Mini Joueur
        message.react("868105020443328552");
        //Cloche
        message.react("868105020590133269");
    });

    console.log("prêt :)")
    var botonembedlog = new Discord.MessageEmbed()
          .setTitle("Bot en ligne !")
          .setDescription("Il a sûrement été reboot ou arrêté.")
          .setTimestamp()
          .setColor("#6aff69")
          .setThumbnail("https://cdn.discordapp.com/attachments/845953699943809058/868464131165028352/photo_de_profil_Zoen_bot.png")
          Client.guilds.cache.find(guild => guild.id === "865586758942064641").channels.cache.find(channel => channel.id === "866627310639120385").send(botonembedlog)


});

Client.on("messageReactionAdd", (reaction, user) => {
    console.log("réaction ajoutée par " + user.username + " \n Nom de l'émoji : " + reaction.emoji.name);
    if(reaction.message.id === "868106384514904084"){
        if(reaction.emoji.id === "868105020443328552"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("865935265049739284")
            if(user.bot) return;
            console.log("Mini joueur");   
        }
    }

    if(reaction.message.id === "868106384514904084"){
        if(reaction.emoji.id === "868105020590133269"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("865928576292487230")
            if(user.bot) return;
            console.log("Cloche");   
        }
    }
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;
    console.log("réaction retirée");
//mini jeu
    if(reaction.message.id === "868106384514904084"){
        if(reaction.emoji.id === "868105020443328552"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.remove("865935265049739284")
        }
    }
//cloche
    if(reaction.message.id === "868106384514904084"){
        if(reaction.emoji.id === "868105020590133269"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.remove("865928576292487230")
        }
    }
});

Client.on("guildMemberAdd", member => {
    console.log("Nouveau membre.");
    var embedjoinguild = new Discord.MessageEmbed()
    .setColor("#64ff00")
    .setTitle("Membre arrivé")
    .setDescription(member)
    .setThumbnail(member.user.avatarURL)
    .setTimestamp()
    member.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(embedjoinguild);
    member.guild.channels.cache.find(channel => channel.id === "866970855498055710").send("<@" + member.id + "> à rejoint le serveur ! Souhaitons lui la bienvenue ! ✨");
    member.roles.add("865923506025791508");
    member.roles.add("865589487194210355");
    member.roles.add("866988533260877824");
    var welcomemess = new Discord.MessageEmbed()
    .setTitle("Bienvenue sur Zoen !")
    .setDescription("Avant toute chose, merci de lire le [règlement](https://discord.com/channels/865586758942064641/865942492901015563/867716078578040862)")
    .setColor("#ffa62f")
    .setThumbnail("https://cdn.discordapp.com/attachments/845953699943809058/868464131165028352/photo_de_profil_Zoen_bot.png")
    .addField("Une question ? Une suggestion ? Un problème ? ", "Si vous quoique ce soit, rendez vous dans <#866723532585828412> et nous serons ravis de vous aider. (Tout ticket inutile sera bien évidemment sanctionné.)", false)
    .addField("ㅤ", "Passez une agréable journée sur Zoen et à bientôt !")
    member.send(welcomemess);
});

Client.on("guildMemberRemove", member => {
    console.log("Membre parti.");
    var embedleaveguild = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("Membre parti")
    .setDescription(member)
    .setTimestamp()
    .setThumbnail(member.avatarURL)
    member.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(embedleaveguild)
});

Client.on("clickButton", async (button) => {
    if(button.id === "btn1") {
        //const membre = button.clicker.user

        await button.reply.defer()

        button.clicker.member.roles.remove("865927842608185404")
    }

    if(button.id === "btn2") {

        await button.reply.defer(

        button.clicker.member.roles.add("865927842608185404")
        )
    }
});

Client.on("messageDelete", function(messagesuppr) {
    if(messagesuppr.channel.type == "text") {
        if(messagesuppr.author.bot)return;
        //post in the guild's log channel
        var embeddeletelog = new Discord.MessageEmbed()
            .setTitle("🗑 Message Supprimé")
            .addField("De :", messagesuppr.author.username, true)
            .addField("Message :", messagesuppr.cleanContent, true)
            .addField("Salon :", messagesuppr.channel.name, true)
            .setThumbnail(messagesuppr.author.avatarURL)
            .setColor("#ff6969");
            messagesuppr.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(embeddeletelog)
    }
});

Client.on("messageUpdate", (oldMessage, newMessage) => {
    var embedmodiflog = new Discord.MessageEmbed()
    .setTitle("Message modifié")
    .setColor("#ffb769")
    .addField("De :", newMessage.author.username, true)
    .addField("Original :", oldMessage, true)
    .addField("Nouveau :", newMessage, true)
    .addField("Salon :", oldMessage.channel.name, true)
    .setTimestamp()
    newMessage.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(embedmodiflog)
});

Client.on("message", messagemp => {
    if(messagemp.channel.type !== "dm")return;
    if(messagemp.author.bot)return;
    console.log(messagemp.content);
    var recumpembed = new Discord.MessageEmbed()
    .setTitle("Message reçu en message privé !")
    .addField("Pseudo :", "<@" + messagemp.author.id + ">", true)
    .addField("Message : ", messagemp.content, true)
    .setTimestamp()
    Client.guilds.cache.find(guild => guild.id === "865586758942064641").channels.cache.find(channel => channel.id === "866627310639120385").send(recumpembed)
});

Client.on("message", message => {
    if(message.author.bot)return;
    if(message.channel.type == "dm")return;
    let args  = message.content.split(" ");

    if(message.content == prefix + "invite"){
        message.delete();
        message.reply("voici le ien d'invitation pour le serveur Zoen : https://discord.gg/6PBc9wtGQy \nPartage le à qui tu veux ! 🎉").then(msg => {
            setTimeout(() => msg.delete(), 30000)
          })
          .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
          var inviteembedlog = new Discord.MessageEmbed()
          .setTitle("Commande")
          .setDescription("<@" + message.author.id + "> à utilisé **z/invite** dans " + message.channel.name + ".")
          .setTimestamp()
        message.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(inviteembedlog)
    };

    //if(message.content == prefix + "role"){
    //    message.channel.send("Cliquez sur <:5218blurplerocket:868105020443328552> pour avoir accès au salons de minis jeux ! \nCliquez sur <:blurplebell:868105020590133269> recevoir les notifications d'actualités sur le serveur !");
    //}

    if(message.content == prefix + "id"){
        message.delete();
        message.author.send("Votre identifiant Discord est : " + message.author.id);
        var idembedlog = new Discord.MessageEmbed()
          .setTitle("Commande")
          .setDescription("<@" + message.author.id + "> à utilisé **z/id** dans " + message.channel.name + ".")
          .setTimestamp()
        message.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(idembedlog)
    }

    if(message.content == prefix + "prefix"){
        message.reply("Le préfixe actuel pour le bot Zoen est : **" + prefix + "**").then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
          var prefixembedlog = new Discord.MessageEmbed()
          .setTitle("Commande")
          .setDescription("<@" + message.author.id + "> à utilisé **z/prefix** dans " + message.channel.name + ".")
          .setTimestamp()
        message.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(prefixembedlog)
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        if(message.content.startsWith(prefix + "actif")){
            message.delete();
            let mention = message.mentions.members.first();
    
            if(mention == undefined){
                message.channel.send("Aucun utilisateur trouvé").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
               .catch();
            }
            else {
                mention.roles.add("865635854256439297");
                message.channel.send("Le rôle actif à bien été attribué à " + mention).then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })
                var embedactif = new Discord.MessageEmbed()
                .setTitle("🎉 Félicitations ! Vous venez d'acquérir le rôle Membre Actif !")
                .setDescription("Grâce à votre activité sur Zoen, le rôle Membre Actif vous a été donné ! Si vous avez la moindre question, rendez vous [ici](https://discord.com/channels/865586758942064641/865935500338135060/867717981995794453)")
                .setThumbnail("https://cdn.discordapp.com/attachments/845953699943809058/868464131165028352/photo_de_profil_Zoen_bot.png")
                .setColor("#5081ff")
                .setFooter("Passez une bonne journée sur Zoen ")
                var actifembedlog = new Discord.MessageEmbed()
                      .setTitle("Commande")
                      .setDescription("<@" + message.author.id + "> à utilisé **z/actif** sur <@" + mention.user.id + ">", "ㅤ")
                mention.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(actifembedlog)
                mention.send(embedactif);
            }
        }
    }

    if(message.member.hasPermission("BAN_MEMBERS")){
        if(message.content.startsWith(prefix + "ban")){
            message.delete();
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send("L'utilisateur " + mention.displayName + " a été banni avec succès par <@" + message.author.id + ">.").then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                      })
                      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                      var banembedlog = new Discord.MessageEmbed()
                      .setTitle("Commande")
                      .setDescription("<@" + message.author.id + "> à utilisé **z/ban** sur <@" + mention.user.id + ">")
                    mention.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(banembedlog)
                }
                else {
                    message.channel.send("Impossible de bannir le membre. \n*Cela arrive souvent si le membre est un administrateur ou possède un rôle au dessus du rôle <@&865675281129275462>.* Veuillez réessayer.").then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                      })
                      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                }
            }
        }
    }

    if(message.member.hasPermission("KICK_MEMBERS")){
        if(message.content.startsWith(prefix + "kick")){
            message.delete();
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send("L'utilisateur " + mention.displayName + " a été kick avec succès. ").then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                      })
                      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                      var kickembedlog = new Discord.MessageEmbed()
                      .setTitle("Commande")
                      .setDescription("<@" + message.author.id + "> à utilisé **z/kick** sur <@" + mention.user.id + ">")
                    mention.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(kickembedlog)

                }
                else {
                    message.channel.send("Impossible de kick le membre. \n*Cela arrive souvent si le membre est un administrateur ou possède un rôle au dessus du rôle <@&865675281129275462>.* Veuillez réessayer.").then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                      })
                      .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                }
            }
        }
    }

    if(message.member.hasPermission("MUTE_MEMBERS")){
        if(message.content.startsWith(prefix + "mute")){
            message.delete();
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
            }
            else {
                mention.roles.add("865674046438899764");
                message.channel.send("L'utilisateur " + mention.displayName + " a été mute avec succès.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                  var muteembedlog = new Discord.MessageEmbed()
                  .setTitle("Commande")
                  .setDescription("<@" + message.author.id + "> à utilisé **z/mute** sur <@" + mention.user.id + ">")
                mention.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(muteembedlog)
            }

        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();
            message.delete();

            if(mention == undefined){
                message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
            }
            else {
                mention.roles.remove("865674046438899764");
                message.channel.send("L'utilisateur " + mention.displayName + " à été démute avec succès.").then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                  })
                  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
                  var unmuteembedlog = new Discord.MessageEmbed()
                  .setTitle("Commande")
                  .setDescription("<@" + message.author.id + "> à utilisé **z/unmute** sur <@" + mention.user.id + ">")
                mention.guild.channels.cache.find(channel => channel.id === "866627310639120385").send(unmuteembedlog)


            }
        }
    }

    //if(message.content == prefix + "oui"){
    //    message.channel.send("https://cdn.discordapp.com/attachments/868108903869726750/868109126729859112/Sans_titre-5.png");
    //}

    //if(message.content == prefix + "rgl"){
    //    var embedregles = new Discord.MessageEmbed()
    //    .setColor("#ffa62f")
    //    .setImage("https://cdn.discordapp.com/attachments/845953699943809058/866719569920917524/reglement_text_discord_embed.png")
    //    var embedregles2 = new Discord.MessageEmbed()
    //    .setColor("#ffa62f")
    //    .setTitle("Avant toute chose, merci d'avoir l'âge minimum requis dans votre pays pour être inscrit sur le serveur.")
    //    .setDescription("**`1.`** Toute incitation à la haine ou toute autre forme de haine est interdite au sein du serveur et entre membres de celui-ci. \n \n**`2.`** Spammer, écrire en CAPSLOCK, le flood, les caractères spéciaux et tout écrits dérangeant sont interdits. \n \n**`3.`** Respectez les catégories de chaque salons et lisez les sujets de celui-ci ! Cela pourrait éviter à un guide de vous reprendre souvent, notez aussi qu'un modérateur pourrait vous sanctionner si vous êtes repris souvent. \n \n**`4.`** **Zoen** est un serveur totalement *Français 🇫🇷*. merci de parler cette langue ! \n \n**`5.`** Les pubs, promotions et tout type de pub est interdit sur le serveur **__ET__** en messages privés. \n \n**`6.`** Respectez l'équipe de modération et les membres de ce serveur ! Soyez simplement polis et courtois. \n \n**`7.`** Les contenus NSFW, NSFL et tout contenus non inappropriés seront supprimés par l'équipe de modération et accompagnés d'un mute ou d'un ban en fonction de la gravité du contenu. \n \n**`8.`** Veillez à bien avoir un pseudo *pingable*, (c'est à dire qu'on puisse vous mentionner) n'ayez non plus un pseudo insultant, violent, ou haineux. \n \n**`9.`** Merci aussi à ne pas usurper l'identité de **n'importe qui** venant du serveur ou non. \n \n**`10.`** Si vous avez un problème, ouvrez un [ticket](https://discord.com/channels/865586758942064641/866723532585828412/866728069879431188). Merci de ne pas intervenir dans une affaire qui ne vous concerne pas.")
    //    .addField("ㅤ", "*Tout manquement à cette règle sera sanctionné en fonction de la gravité de l'erreur \nAussi, tout contournement de sanction sera sanctionné par un ban définitif ainsi qu'un signalement à Discord.*", false)
    //    .addField("ㅤ", "[CGU/TOS de Discord](https://discord.com/terms)", false)
    //    var embedreglesverif = new Discord.MessageEmbed()
    //    .setColor("#6eff5b")
    //    .setTitle("⚡ Merci d'avoir accepté le règlement !")
    //    .setDescription("Si vous avez la moindre question, le moindre point non compris, je vous invite à ouvrir un ticket ou à vous adresser à un modérateur.")
    //    message.channel.send(embedregles);
    //    message.channel.send(embedregles2);
    //    message.channel.send(embedreglesverif);
    //}

});

// if(message.content == prefix + "embedactivity"){
//    message.delete();
//    let embed1 = new Discord.MessageEmbed()
//    .setColor("#18a03a")
//    .addField("Qu'est-ce que le mode Aide ?", "Le mode Aide vous permettra d'être ping lorqu'un nouveau ticket est ouvert.", false)
//    message.channel.send(embed1)
//    require = ('./bouton.js');execute(Client, message, args)
//
//}

//membre actif : 866988533260877824
//role invisible : 865923506025791508

// var embed = new Discord.MessageEmbed()
//        .setColor("#ffffff")
//        .setTitle("titre")
//        .setAuthor("Enzo", "https://imgur.com", "https://youtube.com")
//        .setThumbnail("https://imgur.com")
//        .addField("Titre du field", "contenu du field", false)
//        .addField("field aligné", "contenu du field aligné", true)
//        // Field Vide
//        .addField("\u2000B", "\u200B",false)
//        .setImage("https://imgur.com")
//        .setTimestamp()
//        .setFooter("footer", "https://youtube.com")
//        
//
//    message.channel.send(embed);