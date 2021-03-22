const Discord = require('discord.js')
const config = require('../config.json')
const SaveManager = require('../jsonUtil.js')
const saveManager = new SaveManager()

module.exports = {
    name: "notification",
    execute: async (message, args) => {
        const checkChannel = !(typeof message.mentions.channels.first() === `undefined`)
        if (args[0] === "set") {
            if (!checkChannel) {
                message.channel.send('Canal não existente')
                return
            } else {
                message.channel.send('Ok, notificarei no canal <#' + message.mentions.channels.first().id + '>.')
                saveManager.writeNotificationsChannel(message.mentions.channels.first().id)
            }
        }
    }
}