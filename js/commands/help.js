const Command = require('../command.js')
const Discord = require('discord.js')
const fs = require('fs')
const config = require('../../config.json')
module.exports = class Help extends Command {
    name = `help`
    async execute(message) {
        let userURL = await message.client.users.fetch("230850304432799744")

        const embed = new Discord.MessageEmbed()
            .setColor('#34eb8f')
            .setTitle('Commands')
            .setFooter(`Developer: Red#0400`, userURL.avatarURL())


        const commandsByName = this.getCommandsFromFiles()
        for (let name in commandsByName) {
            if (commandsByName.hasOwnProperty(name)) {
                const command = commandsByName[name]
                embed.addFields({
                    name: config.prefix + command.name,
                    value: command.description,
                    inline: false
                }, )
            }
        }

        message.channel.send(embed)
    }
    getCommandsFromFiles() {
        let commandsByName = {}
        const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`./${file}`)
            commandsByName[command.name] = command
        }
        return commandsByName
    }
}