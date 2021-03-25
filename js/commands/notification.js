const Command = require('../command.js')
const Discord = require('discord.js')
const SaveManager = require('../jsonUtil.js')
const saveManager = new SaveManager()
module.exports = class Notification extends Command {
    name = `notification`
    description = `Permite notificar um determinado canal`
    async execute(message, args){
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