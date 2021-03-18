const Discord = require('discord.js')
module.exports = {
    name: "help",
    execute: async(message) => {
        let userURL = await message.client.users.fetch("230850304432799744")


        const embed = new Discord.MessageEmbed()
        .setColor('#34eb8f')
        .setTitle('Commands')
        .addFields({
            name: '!resina',
            value: `Permite visualizar sua resina atual, para configura-la use **!resina set numero**, não pode ser maior que 160.`,
            inline: true
        }, {
            name: '!profile',
            value: `Visualize sua UID e rank de aventura, sete-os com **!profile set rank** e **!profile set uid**`
        })
        .setFooter(`Developer: Red#0400`, userURL.avatarURL())
    message.channel.send(embed)


    }
}