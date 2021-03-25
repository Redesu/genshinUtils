const Command = require('../command.js')
const config = require('../../config.json')
const Discord = require('discord.js')
module.exports = class Profile extends Command{
    name = `profile` 
    description = `Mostra o perfil so usuario`
    async execute(message, args, user){
        const isNumber = !isNaN(parseInt(args[2]))
        let userURL = await message.client.users.fetch("230850304432799744")
        if (!isNumber && args[0] === "set") {
            const embedError = new Discord.MessageEmbed()
                .setTitle('**!profile**')
                .setColor('#32a838')
                .addFields({
                    name: '**Como usar?\n\n\n**',
                    value: '**Exemplos**\n!profile set rank 55\n !profile set uid 601326282',
                    inline: true
                },)
                .setFooter(`Developer: Red#0400`, userURL.avatarURL())
                message.channel.send(embedError)

            return
        }
        if (args[0] === "set") {
            if (args[1] === "uid") {
                user.uid = parseInt(args[2])
            }
        }
        let uidMsg = user.uid
        if (user.uid === 0) {
            uidMsg = `uid não configurada, configure-a com !profile set uid`
        }
        if (args[0] === "set") {
            if (args[1] === "rank") {
                user.adventureRank = Math.min(parseInt(args[2]), 60)

            }
        }
        const embed = new Discord.MessageEmbed()
            .setColor('#32a838')
            .setTitle('Profile')
            .addFields({
                name: 'Rank de aventura',
                value: `${user.adventureRank}`,
                inline: true
            }, {
                name: 'Sua uid',
                value: `${uidMsg}`
            })
            .setImage('https://cdn.discordapp.com/attachments/821460461777059844/822137799767490590/abb8d166d497a191faeb8d31a02b8098.png')
            .setFooter(`Developer: Red#0400`, userURL.avatarURL())
        message.channel.send(embed)
    }
}