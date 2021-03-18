
const Discord = require('discord.js')
const config = require('../config.json')
module.exports = {
    name: "resina",
    execute: async (message, args, user) => {
        let userURL = await message.client.users.fetch("230850304432799744")
        const isNumber = !isNaN(parseInt(args[1]))
        if (!isNumber && args[0] === "set") {
            return
        }
        if (args[0] === "set") {
            user.resina = parseInt(args[1])
            if (user.resina > 160)
                user.resina = 160
        }
        const userHour = Math.floor(config.time * (config.maxResina - user.resina) / 60)
        const userMinutes = Math.floor((config.time * (config.maxResina - user.resina)) - userHour * 60)
        const embed = new Discord.MessageEmbed()
            .setColor('#3285a8')
            .setTitle('5 minutos de jogo')
            .addFields({
                name: 'Resina: ',
                value: `${user.resina}`,
                inline: true
            }, {
                name: 'Tempo até encher',
                value: `${userHour} horas e ${userMinutes} minutos `
            })
            .setImage('https://cdn.discordapp.com/attachments/821460461777059844/822140122219806770/resin.png')
            .setFooter(`Developer: Red#0400`, userURL.avatarURL())
        message.channel.send(embed)
    }
}