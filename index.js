const fs = require('fs')
const path = require('path')
const Discord = require('discord.js');
const config = require('./config.json')
const client = new Discord.Client();
const User = require('./user.js')
const users = require('./users.json') || []
let commandsByName = {}
const interval = config.time * 60 * 1000

setInterval(_ => {
    for (const user of users) {

        if (user.resina < 160) ++user.resina
    }
   
}, interval)

client.on('ready', () => {
    console.log(`pai on as ${client.user.tag}!`);

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

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup && exitCode !== 0){ 
        const dataUsers = JSON.stringify(users)
        console.log(dataUsers)
        fs.writeFile('./users.json', dataUsers, 'utf8', (err) =>{
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
            process.exit();
           
        })
        
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit && !options.cleanup) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {cleanup:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));