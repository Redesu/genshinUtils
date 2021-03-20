const fs = require('fs')
const path = require('path')
const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client();
const User = require('./user.js')
const users = require('./users.json') || []
const SaveManager = require('./jsonUtil.js')
let commandsByName = {}
const saveManager = new SaveManager()
const interval = config.time * 60 * 1000

setInterval(_ => {
    for (const user of users) {
        if (user.resina < 160) {
            ++user.resina
        }
    }
    saveManager.writeOnJson()
}, interval)

client.on('ready', () => {
    console.log(`pai on as ${client.user.tag}!`);
    client.user.setActivity('!help', {
            type: 'PLAYING'
        })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);

    const commandFiles = fs
        .readdirSync(path.resolve(__dirname, 'commands'))
        .filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        commandsByName[command.name] = command
    }
});
client.login(config.token)

client.on('message', message => {


    const prefix = config.prefix
    if (!message.content.startsWith(prefix) || message.author.bot)
        return


    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (typeof commandsByName[command] === `undefined`)
        return

    let user = users.find(u => u.id === message.author.id)
    if (!user) {
        user = new User(message.author.id, message.author.username)
        users.push(user)
        console.log(users)
    }
    try {
        commandsByName[command].execute(message, args, user);
    } catch (error) {
        console.error(error)
        message.reply('deu ruim <:wut:821167759169159168>')
    }
});