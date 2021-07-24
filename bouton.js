 const Discord = require("discord.js");
 const { MessageButton, MessageActionRow } = require("discord-buttons");

 module.exports = {
     execute: (Client, message, args) => {
         const Bouton1 = new MessageButton()
         .setLabel("Désactiver")
         .setStyle("red")
         .setID("btn1")
         .setEmoji("⚠")

         const Bouton2 = new MessageButton()
         .setLabel("Activer")
         .setStyle("green")
         .setID("btn2")
         .setEmoji("✅")

         const Bouton = new MessageActionRow()
         .addComponents([Bouton1, Bouton2])

         message.channel.send("**Activer le mode Aide ?**",{
             components: Bouton
         })
     }
 }