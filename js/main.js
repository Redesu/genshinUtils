const fs = require('fs')
const config = require('../config.json')
const Client = require('./client.js')
const User = require('./user.js')
const Interval = require('./interval.js')

module.exports = class Main {
    constructor() {
        this.users = require('../users.json') || []
        this.client = new Client()
        this.config = config
        this.commands = this.getCommandsFromFiles()
        this.interval = new Interval()
    }

    run() {
        this.client.login(this.config.token)
        console.log(`Logging in...`);

        this.client.addEventListener(`ready`, _ => {
            console.log(`Logged as ${this.client._client.user.tag}!`)
            this.client._client.user.setActivity('?help', {
                type: 'PLAYING'
            }).then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        })

        this.client.addEventListener(`message`, message => {
            this.commandHandler(message)
        })

        this.interval.interval(this.users, this.client)
    }

    getCommandsFromFiles() {
        const commands = []
        console.log(process.cwd()) 
        const commandFiles = fs.readdirSync(`js/commands`)
        for (const file of commandFiles) {
            const Command = require(`./commands/${file}`)
            commands.push(new Command())
        }
        return commands
    }


    commandHandler(message) {
        const prefix = this.config.prefix

        if (!message.content.startsWith(prefix) || message.author.bot)
            return

        const args = message.content.slice(prefix.length).trim().split(/ +/),
            commandName = args.shift().toLowerCase()

        const command = this.commands.find(cmd => cmd.name === commandName) ||
            this.commands.find(cmd => cmd.aliases.includes(commandName))

        if (typeof command === `undefined`)
            return

        let user = this.users.find(u => u.id === message.author.id)
        if (!user) {
            user = new User(message.author.id, message.author.username)
            this.users.push(user)
        }

        try {
            command.execute(message, args, user)
        } catch (error) {
            console.error(error)
            message.reply('there was an error trying to execute that command!')
        }
    }
}


