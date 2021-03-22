const users = require('./users.json') || []
const channels = require('./channels.json') || []
const fs = require('fs')
module.exports = class SaveManager {
    writeOnJson() {
        const dataUsers = JSON.stringify(users)
        fs.writeFile('./users.json', dataUsers, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(users);
            }
        })
    }
        writeNotificationsChannel(channel) {
        const dataChannel = JSON.stringify({channel:channel})
        fs.writeFile('./channels.json', dataChannel, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
        })
    }
}